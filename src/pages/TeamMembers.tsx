import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aboutHero from "@/assets/about-hero.png";

const teamMembers = [
  { name: "Chavda Rajveersinh", role: "Developer", initials: "CR" },
  { name: "Godani Shubham", role: "Developer", initials: "GS" },
  { name: "Appalla Karthik", role: "Developer", initials: "AK" },
];

const TeamMembers = () => (
  <div className="relative overflow-hidden">
    <PageHero
      title="Team Members"
      subtitle="The developers currently building and supporting the Shivarpan Foundation website."
      image={aboutHero}
    />

    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 section-gradient">
      <motion.div
        aria-hidden
        animate={{ x: [0, 24, 0], y: [0, -12, 0], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-4rem] top-28 h-52 w-52 rounded-full bg-primary/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-20 right-[-5rem] h-80 w-80 rounded-full border border-accent/20"
      />
      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Development Team
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            The Team Behind The Website
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            These are the developers currently shaping the platform experience,
            interface quality, and ongoing improvements for Shivarpan Foundation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
                transition={{ type: "spring", stiffness: 190, damping: 22 }}
                className="group relative overflow-hidden rounded-[1.9rem] border border-border/85 bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--card)/0.94)_100%)] p-6 text-center shadow-[0_24px_70px_-48px_hsl(var(--foreground))] [transform-style:preserve-3d] sm:p-7"
              >
                <motion.div
                  aria-hidden
                  animate={{ x: ["-115%", "120%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.7, delay: index * 0.2, ease: "linear" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/18 to-transparent"
                />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />

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
                    <span className="font-display text-2xl font-bold text-primary">
                      {member.initials}
                    </span>
                  </div>
                </div>

                <h4 className="font-display text-xl font-semibold text-foreground">{member.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                <motion.span
                  whileHover={{ y: -1 }}
                  className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                >
                  Developer
                </motion.span>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Contributing to the website experience, interface refinement, and
                  ongoing platform improvements.
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default TeamMembers;
