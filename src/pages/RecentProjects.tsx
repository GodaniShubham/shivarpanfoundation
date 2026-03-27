import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import RecentProjectsContent from "@/components/recent-projects/RecentProjectsContent";
import RecentProjectsIntro from "@/components/recent-projects/RecentProjectsIntro";
import { recentProjects } from "@/data/recentProjects";

gsap.registerPlugin(Flip);

const introRowCount = 5;
const introColCount = 7;

const RecentProjects = () => {
  const [projectImages, setProjectImages] = useState<any[]>([]);
  const [projectImageMap, setProjectImageMap] = useState<Record<string, string>>({});
  
  const [introOpen, setIntroOpen] = useState(false);
  const [isIntroTransitioning, setIsIntroTransitioning] = useState(false);
  const [isTitleMerging, setIsTitleMerging] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((res) => {
        console.log("PROJECT IMAGES:", res.data);

        const imageMap: Record<string, string> = {};
        const formatted = res.data
          .map((item: any) => {
            const rawUrl = item?.featured_image?.url;
            if (!rawUrl) return null;
            const image = rawUrl.startsWith("http")
              ? rawUrl
              : `http://127.0.0.1:8000${rawUrl}`;
            if (item?.slug) {
              imageMap[item.slug] = image;
            } else if (item?.title) {
              imageMap[item.title.trim().toLowerCase()] = image;
            }
            return { image };
          })
          .filter(Boolean) as { image: string }[];

        setProjectImages(formatted);
        setProjectImageMap(imageMap);
      })
      .catch((err) => console.error(err));
  }, []);

  const introSectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const fullviewRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const introTitleRef = useRef<HTMLDivElement | null>(null);
  const contentTitleRef = useRef<HTMLHeadingElement | null>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const middleItemInnerRef = useRef<HTMLDivElement | null>(null);
  const middleItemImageRef = useRef<HTMLDivElement | null>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const introRows = useMemo(
    () =>
      Array.from({ length: introRowCount }, (_, rowIndex) =>
        Array.from(
          { length: introColCount },
          (_, colIndex) =>
           projectImages.length > 0
  ? projectImages[
      (rowIndex * introColCount + colIndex) % projectImages.length
    ].image
  : ""
        ),
      ),
    [projectImages],
  );

  const totalBudget = useMemo(
    () => recentProjects.reduce((sum, project) => sum + project.budget, 0),
    [],
  );
  const totalSpent = useMemo(
    () => recentProjects.reduce((sum, project) => sum + project.spent, 0),
    [],
  );
  const totalBeneficiaries = useMemo(
    () => recentProjects.reduce((sum, project) => sum + project.beneficiaries, 0),
    [],
  );
  const totalVolunteers = useMemo(
    () => recentProjects.reduce((sum, project) => sum + project.volunteers, 0),
    [],
  );
  const totalPartners = useMemo(
    () => recentProjects.reduce((sum, project) => sum + project.partners, 0),
    [],
  );
  const activeProjects = useMemo(
    () => recentProjects.filter((project) => project.status === "Active").length,
    [],
  );
  const completedProjects = recentProjects.length - activeProjects;
  const utilization = Math.round((totalSpent / totalBudget) * 100);

  useLayoutEffect(() => {
    document.body.classList.toggle("recent-intro-lock", !introOpen);
    return () => {
      document.body.classList.remove("recent-intro-lock");
    };
  }, [introOpen]);

  useLayoutEffect(() => () => {
    introTimelineRef.current?.kill();
  }, []);

  useLayoutEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) {
      return;
    }

    const middleRow = rows[Math.floor(rows.length / 2)];
    const middleRowItems = middleRow
      ? Array.from(middleRow.querySelectorAll<HTMLElement>(".recent-intro-row__item"))
      : [];
    const middleItem = middleRowItems[Math.floor(middleRowItems.length / 2)] ?? null;
    const middleInner =
      middleItem?.querySelector<HTMLDivElement>(".recent-intro-row__item-inner") ??
      null;
    const middleImage =
      middleInner?.querySelector<HTMLDivElement>(".recent-intro-row__item-img") ??
      null;

    middleItemInnerRef.current = middleInner;
    middleItemImageRef.current = middleImage;
    middleImage?.classList.add("recent-intro-row__item-img--large");

    const winsize = { width: window.innerWidth, height: window.innerHeight };
    const mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
    const minAmt = 0.05;
    const maxAmt = 0.1;
    const baseAmt = 0.1;
    const middleRowIndex = Math.floor(rows.length / 2);
    const renderedStyles = rows.map((_, index) => {
      const distanceFromMiddle = Math.abs(index - middleRowIndex);
      const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
      const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);

      return {
        amt,
        scaleAmt,
        translateX: { previous: 0, current: 0 },
        contrast: { previous: 100, current: 100 },
        brightness: { previous: 100, current: 100 },
      };
    });

    const lerp = (start: number, end: number, amount: number) =>
      start + (end - start) * amount;

    const updateMousePosition = (clientX: number, clientY: number) => {
      mousepos.x = clientX;
      mousepos.y = clientY;
    };

    const render = () => {
      const mappedTranslateX =
        ((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width / 100;
      const normalized = Math.abs((mousepos.x / winsize.width) * 2 - 1);
      const contrastTarget = 100 - normalized * normalized * (100 - 330);
      const brightnessTarget = 100 - normalized * normalized * (100 - 15);

      rows.forEach((row, index) => {
        const style = renderedStyles[index];
        style.translateX.current = mappedTranslateX;
        style.contrast.current = contrastTarget;
        style.brightness.current = brightnessTarget;

        style.translateX.previous = lerp(style.translateX.previous, style.translateX.current, style.amt);
        style.contrast.previous = lerp(style.contrast.previous, style.contrast.current, style.scaleAmt);
        style.brightness.previous = lerp(style.brightness.previous, style.brightness.current, style.amt);

        gsap.set(row, {
          x: style.translateX.previous,
          filter: `contrast(${style.contrast.previous}%) brightness(${style.brightness.previous}%)`,
        });
      });

      rafId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleResize = () => {
      winsize.width = window.innerWidth;
      winsize.height = window.innerHeight;
    };

    let rafId = 0;

    if (!introOpen && !isIntroTransitioning) {
      rafId = window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introOpen, isIntroTransitioning]);

  const enterFullview = () => {
    if (introOpen || isIntroTransitioning) {
      return;
    }

    const middleInner = middleItemInnerRef.current;
    const middleImage = middleItemImageRef.current;
    const fullview = fullviewRef.current;
    const grid = gridRef.current;
    const content = contentRef.current;
    const introTitle = introTitleRef.current;
    const contentTitle = contentTitleRef.current;
    const introSection = introSectionRef.current;

    if (!middleInner || !middleImage || !fullview || !grid || !content || !introTitle || !contentTitle || !introSection) {
      setIntroOpen(true);
      return;
    }

    setIsIntroTransitioning(true);
    setIsTitleMerging(true);

    const flipState = Flip.getState(middleInner);
    fullview.appendChild(middleInner);

    introTimelineRef.current?.kill();

    gsap.set(fullview, { autoAlpha: 1 });
    gsap.set(content, { y: 110, autoAlpha: 0, filter: "blur(14px)" });
    gsap.set(contentTitle, { y: 64, opacity: 0, scale: 0.95, transformOrigin: "50% 100%" });
    gsap.set(introSection, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(grid, { opacity: 1, scale: 1, filter: "blur(0px)" });
    gsap.set(introTitle, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" });
    gsap.set(middleImage, { scale: 1, filter: "brightness(100%)", y: 0 });

    introTimelineRef.current = gsap
      .timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          gsap.set(content, { clearProps: "transform,opacity,visibility,filter" });
          gsap.set(contentTitle, { clearProps: "transform,opacity" });
          gsap.set(introSection, { clearProps: "clipPath,opacity,visibility" });
          gsap.set(grid, { clearProps: "transform,opacity,filter" });
          gsap.set(introTitle, { clearProps: "transform,opacity,filter" });
          gsap.set(fullview, { clearProps: "opacity,visibility" });
          setIntroOpen(true);
          setIsIntroTransitioning(false);
          setIsTitleMerging(false);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
          });
        },
      })
      .add(
        Flip.from(flipState, {
          duration: 1,
          ease: "power4.inOut",
          absolute: true,
          simple: true,
        }),
        0,
      )
      .to(
        grid,
        {
          duration: 0.9,
          opacity: 0,
          scale: 0.96,
          filter: "blur(10px)",
        },
        0,
      )
      .to(
        introTitle,
        {
          y: "-14vh",
          scale: 0.74,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.82,
        },
        0.04,
      )
      .to(
        middleImage,
        {
          scale: 1.12,
          filter: "brightness(58%)",
          y: "-4vh",
          duration: 1,
          ease: "power3.out",
        },
        0.08,
      )
      .to(
        introSection,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          autoAlpha: 0,
          duration: 0.95,
        },
        0.18,
      )
      .to(
        content,
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.88,
          ease: "power3.out",
        },
        0.28,
      )
      .to(
        contentTitle,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.86,
          ease: "power3.out",
        },
        0.42,
      );
  };

  return (
    <div className="relative overflow-hidden bg-background recent-projects-page">
      <RecentProjectsIntro
        introOpen={introOpen}
        isIntroTransitioning={isIntroTransitioning}
        isTitleMerging={isTitleMerging}
        introRows={introRows}
        introSectionRef={introSectionRef}
        introTitleRef={introTitleRef}
        gridRef={gridRef}
        fullviewRef={fullviewRef}
        rowRefs={rowRefs}
        onEnter={enterFullview}
      />

      <RecentProjectsContent
        contentRef={contentRef}
        contentTitleRef={contentTitleRef}
        introOpen={introOpen}
        imageOverrides={projectImageMap}
        activeProjects={activeProjects}
        completedProjects={completedProjects}
        totalBeneficiaries={totalBeneficiaries}
        totalVolunteers={totalVolunteers}
        totalPartners={totalPartners}
        totalSpent={totalSpent}
        totalBudget={totalBudget}
        utilization={utilization}
      />
    </div>
  );
};

export default RecentProjects;
