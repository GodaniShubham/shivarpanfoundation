import { motion } from "framer-motion";
import { CircleDollarSign, Handshake, Sparkles, Users, type LucideIcon } from "lucide-react";
import {
  formatRecentProjectsInr,
  recentProjectsNumberFormat,
} from "@/data/recentProjects";

interface ImpactLedgerProps {
  activeProjects: number;
  completedProjects: number;
  totalBeneficiaries: number;
  totalVolunteers: number;
  totalPartners: number;
  totalSpent: number;
  totalBudget: number;
  utilization: number;
}

interface ImpactStat {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

const ImpactLedger = ({
  activeProjects,
  completedProjects,
  totalBeneficiaries,
  totalVolunteers,
  totalPartners,
  totalSpent,
  totalBudget,
  utilization,
}: ImpactLedgerProps) => {
  const impactLedger: ImpactStat[] = [
    {
      label: "Active Projects",
      value: `${activeProjects}`,
      detail: `${completedProjects} completed chapters in the current cycle`,
      icon: Sparkles,
    },
    {
      label: "People Reached",
      value: `${recentProjectsNumberFormat.format(totalBeneficiaries)}+`,
      detail: "Direct beneficiaries across all current interventions",
      icon: Users,
    },
    {
      label: "Volunteers Mobilized",
      value: `${recentProjectsNumberFormat.format(totalVolunteers)}`,
      detail: `${totalPartners} partner organizations in delivery coordination`,
      icon: Handshake,
    },
    {
      label: "Budget Deployed",
      value: formatRecentProjectsInr(totalSpent),
      detail: `${utilization}% of ${formatRecentProjectsInr(totalBudget)} allocated`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <section className="relative border-b border-border/70 py-12 md:py-14">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 max-w-3xl"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Impact Ledger
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Four signals that define the current portfolio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            The portfolio is measured through live delivery, people reached,
            field coordination strength, and disciplined deployment of funds.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {impactLedger.map((stat, index) => {
            const StatIcon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[1.7rem] border border-border/80 bg-card/92 p-5 shadow-[0_18px_50px_-44px_hsl(var(--foreground))]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-3 font-display text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <span className="rounded-2xl bg-primary/12 p-3 text-primary">
                    <StatIcon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stat.detail}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactLedger;
