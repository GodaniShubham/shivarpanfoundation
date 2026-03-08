import { Button } from "@/components/ui/button";
import { getMagazineById } from "@/data/magazines";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import bookLoaderAnimation from "@/assets/animations/Book.json";
import * as pdfjsLib from "pdfjs-dist";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate, useParams } from "react-router-dom";

if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

type BookPage = {
  id: string;
  type: "cover" | "content";
  image?: string;
  label?: string;
  number?: number;
};

type ViewerSizing = {
  pageWidth: number;
  pageHeight: number;
  scale: number;
  safePadding: number;
};

type FlipPageProps = HTMLAttributes<HTMLDivElement> & {
  page: BookPage;
};

const PAGE_RATIO = 0.707; // width / height ratio
const SHOW_COVER_SPREAD = true;

const getViewerSizing = (
  viewportWidth: number,
  viewportHeight: number,
): ViewerSizing => {
  const safePadding = viewportWidth < 768 ? 20 : 30;
  const toolbarHeight = viewportWidth < 640 ? 72 : 84;
  const availableWidth = Math.max(viewportWidth - safePadding * 2, 280);
  const availableHeight = Math.max(viewportHeight - toolbarHeight - safePadding * 2, 320);

  const spreadWidth =
    viewportWidth >= 1200 ? 900 : viewportWidth >= 768 ? 700 : viewportWidth * 0.9;

  const pageWidth = Math.max(170, Math.floor(spreadWidth / 2));
  const pageHeight = Math.max(250, Math.floor(pageWidth / PAGE_RATIO));
  const scale = Math.min(
    availableWidth / (pageWidth * 2),
    availableHeight / pageHeight,
    1,
  );

  return {
    pageWidth,
    pageHeight,
    scale: Number(scale.toFixed(3)),
    safePadding,
  };
};

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(({ page, ...props }, ref) => {
  const isCover = page.type === "cover";

  return (
    <div
      ref={ref}
      {...props}
      className="relative h-full w-full select-none overflow-hidden bg-white"
    >
      <img
        src={page.image}
        alt={page.label ?? "Magazine page"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {isCover ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent">
          <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/40 p-3 text-white backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/80">Cover Page</p>
            <p className="mt-1 text-sm font-semibold leading-snug">{page.label}</p>
          </div>
        </div>
      ) : null}
      {!isCover && page.number ? (
        <span className="pointer-events-none absolute bottom-3 right-4 text-xs font-medium text-slate-500">
          {page.number}
        </span>
      ) : null}
    </div>
  );
});

FlipPage.displayName = "FlipPage";

const MagazineViewer = () => {
  const { magazineId } = useParams();
  const navigate = useNavigate();
  const readerShellRef = useRef<HTMLDivElement>(null);
  const flipBookRef = useRef<any>(null);
  const currentPageIndexRef = useRef(0);

  const id = Number(magazineId);
  const magazine = useMemo(() => getMagazineById(id), [id]);

  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isCoverAnimating, setIsCoverAnimating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerSizing, setViewerSizing] = useState<ViewerSizing>(() =>
    getViewerSizing(window.innerWidth, window.innerHeight),
  );

  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("magazine-reader-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("magazine-reader-open");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewerSizing(getViewerSizing(window.innerWidth, window.innerHeight));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  useEffect(() => {
    if (!magazine) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument(magazine.pdfUrl);

    setImages([]);
    setError(null);
    setIsLoading(true);
    setLoadProgress(0);
    setCurrentPageIndex(0);
    setIsCoverAnimating(false);

    loadingTask.onProgress = ({ loaded, total }) => {
      if (!cancelled && total) {
        setLoadProgress(Math.round((loaded / total) * 100));
      }
    };

    const renderPdf = async () => {
      try {
        const pdf = await loadingTask.promise;
        const renderedPages: string[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) {
            return;
          }

          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: false });

          if (!context) {
            continue;
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvas, canvasContext: context, viewport }).promise;
          renderedPages.push(canvas.toDataURL("image/jpeg", 0.9));
        }

        if (!cancelled) {
          setImages(renderedPages);
          setLoadProgress(100);
        }
      } catch (pdfError) {
        if (!cancelled) {
          console.error(pdfError);
          setError("Magazine load nahi ho paaya. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void renderPdf();

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [magazine]);

  const pages = useMemo<BookPage[]>(() => {
    if (!magazine || images.length === 0) {
      return [];
    }

    return [
      {
        id: `cover-${magazine.id}`,
        type: "cover",
        image: magazine.coverImage,
        label: magazine.title,
      },
      ...images.map((image, index) => ({
        id: `content-${index + 1}`,
        type: "content" as const,
        image,
        number: index + 2,
        label: `Page ${index + 2}`,
      })),
    ];
  }, [images, magazine]);

  const pageElements = useMemo(
    () => pages.map((page) => <FlipPage key={page.id} page={page} />),
    [pages],
  );

  const canInteract = !isLoading && !error && pages.length > 0;
  const pageDisplay = `${Math.min(currentPageIndex + 1, pages.length || 1)} / ${pages.length}`;
  const viewerScale = Number((viewerSizing.scale * zoom).toFixed(3));
  const isCoverSpread = SHOW_COVER_SPREAD && canInteract && (currentPageIndex === 0 || isCoverAnimating);
  const visibleSpreadWidth = Number(
    ((isCoverSpread ? viewerSizing.pageWidth : viewerSizing.pageWidth * 2) * viewerScale).toFixed(2),
  );
  const visibleSpreadHeight = Number((viewerSizing.pageHeight * viewerScale).toFixed(2));
  const coverShift = Number((viewerSizing.pageWidth * viewerScale).toFixed(2));

  const handlePrev = () => {
    if (canInteract) {
      flipBookRef.current?.pageFlip()?.flipPrev();
    }
  };

  const handleNext = () => {
    if (canInteract) {
      flipBookRef.current?.pageFlip()?.flipNext();
    }
  };

  const toggleFullscreen = async () => {
    if (!readerShellRef.current) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await readerShellRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (fullscreenError) {
      console.error(fullscreenError);
    }
  };

  if (!magazine) {
    return (
      <div className="viewer-wrapper bg-[#070a08] text-white">
        <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
            Magazine not found
          </h1>
          <Button
            type="button"
            onClick={() => navigate("/e-magazine-articles")}
            className="bg-[#f59e0b] text-[#10381f] hover:bg-[#f8b33a]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={readerShellRef} className="viewer-wrapper bg-[#070a08] text-white">
      <div className="flex h-full w-full flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-white/10 bg-black/35 px-3 backdrop-blur sm:h-[84px] sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/e-magazine-articles")}
              className="border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                {magazine.title}
              </p>
              <p className="hidden text-xs text-white/70 sm:block">Published {magazine.publishDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-white/90">
              {pageDisplay}
            </span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setZoom((prev) => Math.max(0.85, Number((prev - 0.1).toFixed(2))))}
              disabled={zoom <= 0.85}
              className="h-9 w-9 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setZoom((prev) => Math.min(1.35, Number((prev + 0.1).toFixed(2))))}
              disabled={zoom >= 1.35}
              className="h-9 w-9 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setZoom(1)}
              className="hidden h-9 w-9 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:inline-flex"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="h-9 w-9 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        <div className="magazine-reader-stage relative flex-1 overflow-hidden">
          <div className="flipbook-wrapper relative z-10 h-full w-full" style={{ padding: `${viewerSizing.safePadding}px` }}>
            {isLoading ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-8 py-7 text-center backdrop-blur">
                <div className="h-24 w-24">
                  <Lottie
                    animationData={bookLoaderAnimation}
                    loop
                    autoplay
                    className="h-full w-full"
                  />
                </div>
                <p className="text-sm font-medium text-white/85">
                  Loading pages... {loadProgress}%
                </p>
              </div>
            ) : null}

            {!isLoading && error ? (
              <div className="rounded-2xl border border-red-400/40 bg-red-500/15 px-6 py-5 text-center text-sm text-red-100">
                {error}
              </div>
            ) : null}

            {!isLoading && !error && pages.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-visible"
              >
                {!isCoverSpread ? (
                  <span className="book-spine-shadow pointer-events-none absolute inset-y-1 left-1/2 z-20 -translate-x-1/2" />
                ) : null}
                <div
                  className="relative"
                  style={{
                    width: `${visibleSpreadWidth}px`,
                    height: `${visibleSpreadHeight}px`,
                    overflow: isCoverSpread ? "hidden" : "visible",
                  }}
                >
                  <div
                    className="magazine-reader"
                    style={{
                      width: `${viewerSizing.pageWidth * 2}px`,
                      height: `${viewerSizing.pageHeight}px`,
                      marginLeft: isCoverSpread ? `-${coverShift}px` : "0px",
                      transform: `scale(${viewerScale})`,
                      transformOrigin: "top left",
                      transition: "transform 180ms ease-out, margin-left 220ms ease-out",
                    }}
                  >
                    <HTMLFlipBook
                      ref={flipBookRef}
                      width={viewerSizing.pageWidth}
                      height={viewerSizing.pageHeight}
                      minWidth={viewerSizing.pageWidth}
                      maxWidth={viewerSizing.pageWidth}
                      minHeight={viewerSizing.pageHeight}
                      maxHeight={viewerSizing.pageHeight}
                      size="stretch"
                      usePortrait={false}
                      drawShadow={true}
                      showCover={SHOW_COVER_SPREAD}
                      startPage={0}
                      showPageCorners={true}
                      disableFlipByClick={true}
                      maxShadowOpacity={0.48}
                      flippingTime={900}
                      mobileScrollSupport={false}
                      swipeDistance={30}
                      clickEventForward={true}
                      useMouseEvents={true}
                      autoSize={false}
                      startZIndex={11}
                      style={{}}
                      className="shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
                      onFlip={(event) => {
                        const nextIndex = Number(event.data);
                        currentPageIndexRef.current = nextIndex;
                        setCurrentPageIndex(nextIndex);
                        if (nextIndex !== 0) {
                          setIsCoverAnimating(false);
                        }
                      }}
                      onChangeState={(event) => {
                        const state = String(event.data);
                        const activeIndex =
                          flipBookRef.current?.pageFlip()?.getCurrentPageIndex?.() ??
                          currentPageIndexRef.current;

                        if (
                          state === "user_fold" ||
                          state === "fold_corner" ||
                          state === "flipping"
                        ) {
                          setIsCoverAnimating(
                            activeIndex === 0 && currentPageIndexRef.current === 0,
                          );
                        }
                        if (state === "read") {
                          setIsCoverAnimating(false);
                        }
                      }}
                    >
                      {pageElements}
                    </HTMLFlipBook>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-4 md:flex">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handlePrev}
              disabled={!canInteract}
              className="pointer-events-auto h-11 w-11 rounded-full border border-white/20 bg-black/45 text-white hover:bg-black/65 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleNext}
              disabled={!canInteract}
              className="pointer-events-auto h-11 w-11 rounded-full border border-white/20 bg-black/45 text-white hover:bg-black/65 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-2 backdrop-blur md:hidden">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handlePrev}
              disabled={!canInteract}
              className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleNext}
              disabled={!canInteract}
              className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineViewer;
