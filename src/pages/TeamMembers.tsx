import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aboutHero from "@/assets/about-hero.png";

const teamMembers = [
  { name: "Rajendra Shivarpan", role: "Founder & President", initials: "RS" },
  { name: "Meera Kulkarni", role: "Director of Operations", initials: "MK" },
  { name: "Suresh Yadav", role: "Head of Programs", initials: "SY" },
  { name: "Anita Joshi", role: "Finance & Compliance", initials: "AJ" },
];

const TeamMembers = () => (
  <div className="relative overflow-hidden">
    <PageHero
      title="Team Members"
      subtitle="The people delivering programs, partnerships, and impact across communities."
      image={aboutHero}
    />

    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 section-gradient">
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-20 right-[-5rem] h-80 w-80 rounded-full border border-accent/20"
      />
      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="mb-12 text-center md:mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Core Leadership
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Team Members
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
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
                    <span className="font-display text-2xl font-bold text-primary">
                      {member.initials}
                    </span>
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

export default TeamMembers;
