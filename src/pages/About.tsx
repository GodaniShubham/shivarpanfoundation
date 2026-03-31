import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Heart, CheckCircle, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { aboutContent } from "@/data/siteContent";

const team = [
  { name: "Rajendra Shivarpan", role: "Founder & President", initials: "RS" },
  { name: "Meera Kulkarni", role: "Director of Operations", initials: "MK" },
  { name: "Suresh Yadav", role: "Head of Programs", initials: "SY" },
  { name: "Anita Joshi", role: "Finance & Compliance", initials: "AJ" },
];

const milestones = [
  { year: "2025", event: "Shivarpan Charitable Foundation was established with a purpose-driven community mission." },
  { year: "2025", event: "Early initiatives began across education, food support, social care, and welfare outreach." },
  { year: "2025", event: "Volunteer, donor, and field support systems were aligned for structured last-mile delivery." },
  { year: "2026", event: "Corporate, CSR, and social impact partnerships opened to scale inclusive community development." },
  { year: "2026", event: "Program execution strengthened around transparency, accountability, and measurable outcomes." },
];

const values = [
  { icon: <Heart className="h-6 w-6" />, title: "Compassion", desc: "Leading with empathy in every action we take" },
  { icon: <CheckCircle className="h-6 w-6" />, title: "Transparency", desc: "Complete accountability in fund usage and impact" },
  { icon: <Users className="h-6 w-6" />, title: "Community", desc: "Working together with local communities for lasting change" },
  { icon: <Award className="h-6 w-6" />, title: "Excellence", desc: "Striving for the highest standards in all our programs" },
];

type AboutProps = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string | null;
};

const About = ({ heroTitle, heroSubtitle, heroImage }: AboutProps) => (
  <div className="relative overflow-hidden">
    <motion.div
      aria-hidden
      animate={{ x: [0, 28, 0], y: [0, -14, 0], opacity: [0.12, 0.28, 0.12] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -left-14 top-[20rem] h-52 w-52 rounded-full bg-primary/20 blur-3xl sm:h-64 sm:w-64 md:-left-20 md:top-[22rem] md:h-72 md:w-72"
    />
    <motion.div
      aria-hidden
      animate={{ x: [0, -24, 0], y: [0, 20, 0], opacity: [0.12, 0.24, 0.12] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -right-12 top-[58rem] h-52 w-52 rounded-full bg-accent/20 blur-3xl sm:h-64 sm:w-64 md:right-0 md:top-[68rem] md:h-72 md:w-72"
    />
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          key={`about-particle-${index}`}
          aria-hidden
          style={{
            left: `${10 + (index % 5) * 18}%`,
            top: `${16 + Math.floor(index / 2) * 15}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.55, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/45"
        />
      ))}
    </div>

    <PageHero
      title={heroTitle ?? "About Us"}
      subtitle={heroSubtitle ?? aboutContent.heroSubtitle}
      image={heroImage ?? undefined}
    />

    <section className="relative py-10 sm:py-12 md:py-14">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto max-w-4xl rounded-[1.8rem] border border-border/85 bg-card/92 p-6 shadow-[0_24px_72px_-52px_hsl(var(--foreground))] backdrop-blur-sm sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4 text-accent" />
            Who We Are
          </span>
          <div className="mt-5 space-y-4">
            {aboutContent.introParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="relative py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4 text-accent" />
            Purpose First
          </span>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          <AnimatedSection direction="left">
            <motion.div
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="group relative h-full [transform-style:preserve-3d]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full overflow-hidden rounded-[1.7rem] border border-border/85 bg-card/95 p-6 shadow-[0_20px_70px_-40px_hsl(var(--foreground))] backdrop-blur-sm sm:p-7 md:p-8">
                <motion.div
                  aria-hidden
                  animate={{ x: ["-120%", "130%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.8, ease: "linear" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/18 to-transparent"
                />
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary"
                >
                  <Target className="h-7 w-7" />
                </motion.div>
                <h3 className="mb-3 font-display text-xl font-bold text-foreground sm:text-2xl">Our Mission</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {aboutContent.mission}
                </p>
                <div className="relative mt-5 h-0.5 w-full overflow-hidden rounded-full bg-border/80">
                  <motion.span
                    aria-hidden
                    animate={{ x: ["-100%", "180%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <motion.div
              whileHover={{ y: -8, rotateX: 4, rotateY: 4 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="group relative h-full [transform-style:preserve-3d]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/12 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full overflow-hidden rounded-[1.7rem] border border-border/85 bg-card/95 p-6 shadow-[0_20px_70px_-40px_hsl(var(--foreground))] backdrop-blur-sm sm:p-7 md:p-8">
                <motion.div
                  aria-hidden
                  animate={{ x: ["-120%", "130%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/22 to-transparent"
                />
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent"
                >
                  <Eye className="h-7 w-7" />
                </motion.div>
                <h3 className="mb-3 font-display text-xl font-bold text-foreground sm:text-2xl">Our Vision</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {aboutContent.vision}
                </p>
                <div className="relative mt-5 h-0.5 w-full overflow-hidden rounded-full bg-border/80">
                  <motion.span
                    aria-hidden
                    animate={{ x: ["-100%", "180%"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.3 }}
                    className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 section-gradient">
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 8, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-14 -top-14 h-64 w-64 rounded-full border border-primary/20"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />
      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="mb-12 text-center md:mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">What Guides Us</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Our Core Values</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative overflow-hidden rounded-3xl border border-border/85 bg-card/90 p-6 text-center shadow-[0_20px_60px_-48px_hsl(var(--foreground))] backdrop-blur-sm"
              >
                <span className="absolute right-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {`0${index + 1}`}
                </span>
                <motion.div
                  aria-hidden
                  animate={{ y: ["-120%", "180%"], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.2, ease: "linear" }}
                  className="pointer-events-none absolute left-0 right-0 mx-auto h-24 w-1/2 -skew-x-12 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
                />
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {value.icon}
                </motion.div>
                <h4 className="mb-2 font-display text-lg font-semibold">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20">
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-12 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatedSection className="mb-12 text-center md:mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Our Journey</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Milestones</h2>
        </AnimatedSection>
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            animate={{ y: [0, 280, 0], opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8px] top-2 h-8 w-8 rounded-full bg-primary/30 blur-md md:left-1/2 md:-translate-x-1/2"
          />
          {milestones.map((milestone, index) => (
            <AnimatedSection key={milestone.year} delay={index * 0.08} direction={index % 2 === 0 ? "left" : "right"}>
              <div className={`mb-8 flex items-start gap-5 md:items-center md:gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <motion.div
                  whileHover={{ y: -3, x: index % 2 === 0 ? -4 : 4 }}
                  className={`group hidden flex-1 overflow-hidden rounded-2xl border border-border/85 bg-card/90 p-4 shadow-sm backdrop-blur-sm md:block ${index % 2 === 0 ? "text-right" : "text-left"}`}
                >
                  <h4 className="font-display text-lg font-bold text-primary">{milestone.year}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.event}</p>
                  <div className={`mt-3 h-0.5 overflow-hidden rounded-full bg-border/80 ${index % 2 === 0 ? "ml-auto" : ""} w-20`}>
                    <motion.span
                      aria-hidden
                      animate={{ x: ["-100%", "180%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: index * 0.12 }}
                      className="block h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary)/0.3)", "0 0 0 12px hsl(var(--primary)/0)", "0 0 0 0 hsl(var(--primary)/0.3)"] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.18 }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary shadow-lg"
                >
                  <div className="h-3 w-3 rounded-full bg-primary-foreground" />
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex-1 rounded-2xl border border-border/85 bg-card/90 p-4 shadow-sm backdrop-blur-sm md:hidden">
                  <h4 className="font-display text-lg font-bold text-primary">{milestone.year}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.event}</p>
                  <div className="mt-3 h-0.5 w-20 overflow-hidden rounded-full bg-border/80">
                    <motion.span
                      aria-hidden
                      animate={{ x: ["-100%", "180%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: index * 0.12 }}
                      className="block h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  </div>
                </motion.div>

                <div className="hidden flex-1 md:block" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 section-gradient">
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-20 right-[-5rem] h-80 w-80 rounded-full border border-accent/20"
      />
      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="mb-12 text-center md:mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">The People Behind</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Our Team</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
                transition={{ type: "spring", stiffness: 190, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-border/85 bg-card/95 p-6 text-center shadow-[0_20px_55px_-45px_hsl(var(--foreground))] [transform-style:preserve-3d]"
              >
                <motion.div
                  aria-hidden
                  animate={{ x: ["-115%", "120%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.7, delay: index * 0.2, ease: "linear" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/18 to-transparent"
                />

                <div className="relative mx-auto mb-4 h-20 w-20">
                  <motion.div
                    aria-hidden
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--primary)/0.7),hsl(var(--accent)/0.7),hsl(var(--primary)/0.7))] p-[2px]"
                  >
                    <div className="h-full w-full rounded-full bg-card" />
                  </motion.div>
                  <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-2xl font-bold text-primary">{member.initials}</span>
                  </div>
                </div>

                <h4 className="font-display text-lg font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <motion.span
                  whileHover={{ y: -1 }}
                  className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                >
                  Core Team
                </motion.span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
