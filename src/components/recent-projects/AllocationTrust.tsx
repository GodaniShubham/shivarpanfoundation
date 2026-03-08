import { motion } from "framer-motion";
import { Handshake, ShieldCheck } from "lucide-react";
import { recentProjectsNumberFormat, sectorSplit } from "@/data/recentProjects";

interface AllocationTrustProps {
  activeProjects: number;
  completedProjects: number;
  totalVolunteers: number;
  totalPartners: number;
  utilization: number;
}

const AllocationTrust = ({
  activeProjects,
  completedProjects,
  totalVolunteers,
  totalPartners,
  utilization,
}: AllocationTrustProps) => (
  <section className="relative py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 rounded-[2rem] border border-border/80 bg-card/92 p-6 shadow-[0_22px_70px_-52px_hsl(var(--foreground))] sm:p-8"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Allocation and Trust
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Resources are distributed across urgency and resilience
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Budget allocation is reviewed against immediate community need,
            continuity of service, and long-term recovery or resilience goals.
            The mix below shows how the current cycle is weighted.
          </p>

          <div className="mt-8 space-y-5">
            {sectorSplit.map((sector, index) => {
              const SectorIcon = sector.icon;

              return (
                <motion.div
                  key={sector.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <p className="inline-flex items-center gap-2 font-medium text-foreground">
                      <SectorIcon className="h-4 w-4 text-primary" />
                      {sector.title}
                    </p>
                    <p className="font-semibold text-foreground">{sector.share}%</p>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sector.share}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.95,
                        ease: "easeOut",
                        delay: index * 0.06,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {sector.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-4 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.8rem] border border-border/80 bg-card/92 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="rounded-2xl bg-primary/12 p-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Accountability Framework
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Every rupee is tracked against delivery intent
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Monthly reviews, field verification checkpoints, and post-delivery
              audits help the portfolio stay transparent from budget release to
              beneficiary outcome.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Utilization
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">{utilization}%</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Completed Chapters
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">{completedProjects}</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Live Tracks
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">{activeProjects}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-[1.8rem] border border-border/80 bg-card/92 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="rounded-2xl bg-accent/20 p-3 text-accent">
                <Handshake className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Partnership Network
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Coordination scales through trusted field relationships
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {totalPartners} partner organizations and{" "}
              {recentProjectsNumberFormat.format(totalVolunteers)} volunteers
              currently reinforce distribution, referrals, and follow-up
              reporting across the portfolio.
            </p>
            <div className="mt-5 space-y-3">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Structured checkpoints keep partner roles and timelines visible.</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Volunteer mobilization is tied to field capacity, not vanity numbers.</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Outcome audits are used to sharpen the next cycle of program design.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default AllocationTrust;
