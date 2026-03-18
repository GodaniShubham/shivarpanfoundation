import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { getJson } from "@/lib/api";

const EVENT_POSTER_URL = "/upcoming-event-poster.webp";

type UpcomingEventPopupProps = {
  enabled?: boolean;
};

type MediaAsset = {
  id: number;
  title: string;
  alt_text: string;
  url: string;
};

type UpcomingEventPayload = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date_label: string;
  location_label: string;
  poster_image: MediaAsset | null;
  cta_text: string;
  cta_url: string;
};

const fallbackEvent: UpcomingEventPayload = {
  id: 0,
  title: "Community Action Week 2026",
  subtitle: "",
  description:
    "Join our upcoming drives across education support, health camps, and food relief. Volunteer slots, CSR participation, and donor collaborations are now open.",
  date_label: "April 2026",
  location_label: "Mumbai + Nearby Districts",
  poster_image: null,
  cta_text: "View Upcoming Events",
  cta_url: "/upcoming-events",
};

const UpcomingEventPopup = ({ enabled = true }: UpcomingEventPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [event, setEvent] = useState<UpcomingEventPayload>(fallbackEvent);
  const posterRef = useRef<HTMLImageElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (enabled) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const loadEvent = async () => {
      try {
        const data = await getJson<Partial<UpcomingEventPayload>>("upcoming-events/active");
        if (data && data.title) {
          setEvent({
            ...fallbackEvent,
            ...data,
          } as UpcomingEventPayload);
        } else {
          setEvent(fallbackEvent);
        }
      } catch {
        setEvent(fallbackEvent);
      }
    };

    loadEvent();
  }, [enabled]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const ctx = gsap.context(() => {
      if (posterRef.current) {
        gsap.to(posterRef.current, {
          y: -6,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.75,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/70 px-4 py-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-primary/25 bg-background shadow-[0_40px_120px_-60px_hsl(var(--foreground))]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--accent)/0.18),transparent_45%),radial-gradient(circle_at_85%_70%,hsl(var(--primary)/0.22),transparent_45%)]" />
            <motion.div
              aria-hidden
              animate={{ x: [0, 14, 0], y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-10 right-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
            />
            <motion.div
              aria-hidden
              animate={{ x: [0, -14, 0], y: [0, 12, 0], opacity: [0.18, 0.45, 0.18] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-10 left-6 h-32 w-32 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.22),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(31,95,122,0.22),transparent_42%)] opacity-40"
            />

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Upcoming Events
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {event.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {event.description}
              </p>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="group relative mt-5 w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-sm transition hover:shadow-lg"
                aria-label="View upcoming event poster"
              >
                <img
                  src={event.poster_image?.url || EVENT_POSTER_URL}
                  alt="Upcoming event poster"
                  ref={posterRef}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-90" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                  Tap to view full size
                </span>
              </button>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {event.date_label || "April 2026"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1">
                  {event.location_label || "Mumbai + Nearby Districts"}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={event.cta_url || "/upcoming-events"} onClick={handleClose}>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {event.cta_text || "View Upcoming Events"}
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleClose} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Maybe Later
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}

      {isPreviewOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 px-4 py-8 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-primary/30 bg-background shadow-[0_40px_120px_-60px_hsl(var(--foreground))]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={event.poster_image?.url || EVENT_POSTER_URL}
              alt="Upcoming event poster full size"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default UpcomingEventPopup;
