import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import campaignEducation from "@/assets/campaign-education.jpg";
import campaignEnvironment from "@/assets/campaign-environment.jpg";
import campaignHealth from "@/assets/campaign-health.jpg";
import { Button } from "@/components/ui/button";
import { createRevealTransition, motionTokens } from "@/lib/motion";

type StoryBeat = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  metric: string;
  image: string;
  icon: LucideIcon;
};

const storyBeats: StoryBeat[] = [
  {
    id: "education",
    title: "Learning Futures",
    subtitle: "Education Access Story",
    description:
      "Scholarships, mentorship, and school kits are delivered as one experience so students stay in classrooms and continue toward careers.",
    detail:
      "From enrollment support to year-round guidance, each intervention is tracked through community mentors.",
    metric: "1,200 learners supported",
    image: campaignEducation,
    icon: GraduationCap,
  },
  {
    id: "health",
    title: "Rural Health Lifeline",
    subtitle: "Healthcare Story",
    description:
      "Mobile camps bring diagnostics, medicine, and referral support to neighborhoods where hospitals are hard to reach.",
    detail:
      "Follow-up protocols connect every patient with local volunteers for treatment continuity and health literacy.",
    metric: "500+ patients per flagship camp",
    image: campaignHealth,
    icon: HeartPulse,
  },
  {
    id: "environment",
    title: "Green Recovery Missions",
    subtitle: "Environment Story",
    description:
      "Tree restoration, awareness drives, and youth volunteer squads are planned as seasonal campaigns with measurable outcomes.",
    detail:
      "Each plantation cycle includes maintenance windows, survival audits, and neighborhood ownership groups.",
    metric: "10,000+ saplings protected",
    image: campaignEnvironment,
    icon: Sprout,
  },
];

const clampIndex = (value: number, max: number) =>
  Math.max(0, Math.min(max, Math.round(value)));

const CinematicImpactStory = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = storyBeats.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.3,
  });

  const activeSignal = useTransform(smoothProgress, [0, 1], [0, maxIndex]);
  const stageScale = useTransform(smoothProgress, [0, 1], [1.04, 0.98]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.58, 0.8, 0.6]);

  useMotionValueEvent(activeSignal, "change", (value) => {
    setActiveIndex(clampIndex(value, maxIndex));
  });

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[#040806] py-16 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_80%_76%,rgba(20,83,45,0.22),transparent_38%)]" />
      </div>

      <div ref={sectionRef} className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={createRevealTransition()}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/90">
            Cinematic Impact Journey
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">
            Scroll Through How Change Is Built
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75 md:text-base">
            A narrative section that moves like a documentary timeline. Each block
            maps one program area and the measurable outcomes behind it.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div
              style={{ scale: stageScale }}
              className="relative lg:sticky lg:top-28"
            >
              <div className="relative overflow-hidden rounded-[1.8rem] border border-primary-foreground/20 bg-primary-foreground/5 shadow-[0_40px_100px_-48px_rgba(0,0,0,0.85)] backdrop-blur-sm">
                <div className="relative aspect-[3/4]">
                  {storyBeats.map((beat, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <motion.img
                        key={beat.id}
                        src={beat.image}
                        alt={beat.title}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 1.08,
                          filter: isActive ? "brightness(1)" : "brightness(0.75)",
                        }}
                        transition={{
                          duration: motionTokens.duration.medium,
                          ease: motionTokens.ease,
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    );
                  })}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/26 to-transparent" />
                </div>

                <motion.div
                  style={{ opacity: glowOpacity }}
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/45 to-transparent"
                />

                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-primary-foreground/20 bg-black/35 p-4 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                    Active Story
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-primary-foreground">
                    {storyBeats[activeIndex].title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
                    {storyBeats[activeIndex].detail}
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {storyBeats[activeIndex].metric}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            {storyBeats.map((beat, index) => {
              const Icon = beat.icon;
              const isActive = index === activeIndex;

              return (
                <motion.article
                  key={beat.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={createRevealTransition(index * 0.08)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocusCapture={() => setActiveIndex(index)}
                  className={`relative min-h-[46vh] overflow-hidden rounded-3xl border p-6 transition-colors md:p-8 ${
                    isActive
                      ? "border-accent/55 bg-primary-foreground/5"
                      : "border-primary-foreground/20 bg-primary-foreground/[0.03]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(245,158,11,0.14),transparent_44%)]" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                        <Icon className="h-3.5 w-3.5 text-accent" />
                        {beat.subtitle}
                      </span>
                      <span className="font-display text-2xl font-semibold text-primary-foreground/45">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                      {beat.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/78 md:text-base">
                      {beat.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <p className="inline-flex rounded-full border border-primary-foreground/25 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {beat.metric}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={createRevealTransition(0.12)}
              className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 md:p-7"
            >
              <h3 className="font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Continue Into Live Programs
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 md:text-base">
                Explore the active project dashboard to see transparent funding
                status, volunteer progress, and outcomes in real time.
              </p>
              <Link to="/recent-projects" className="mt-5 inline-block">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Open Project Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicImpactStory;
