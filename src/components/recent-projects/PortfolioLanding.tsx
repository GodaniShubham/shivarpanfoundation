import type { RefObject } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RecentProject } from "@/data/recentProjects";
import {
  formatRecentProjectsInr,
  recentProjectsNumberFormat,
} from "@/data/recentProjects";

interface PortfolioLandingProps {
  titleRef: RefObject<HTMLHeadingElement | null>;
  featuredProject: RecentProject;
}

const PortfolioLanding = ({ titleRef, featuredProject }: PortfolioLandingProps) => {
  const featuredUtilization = Math.round(
    (featuredProject.spent / featuredProject.budget) * 100,
  );

  return (
    <section className="relative isolate -mt-[610px] overflow-hidden border-b border-border/70 pb-16 pt-6 sm:pt-8 lg:pb-20 lg:pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--background))_0%,hsl(var(--muted))_52%,hsl(var(--background))_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,hsl(var(--border)/0.7)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.55)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Portfolio Landing
            </span>
            <h1
              ref={titleRef}
              className="recent-projects-main-title mt-5 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Recent Projects That Turn Community Need Into Measured Action
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              From rapid relief to long-horizon resilience, each chapter in this
              portfolio shows how Shivarpan moves from local need identification
              to accountable delivery. The work is designed to stay human-first,
              operationally disciplined, and clear enough for partners to trust.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 rounded-full px-7">
                <Link to="/contact">
                  Start A Partnership
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-full px-7"
              >
                <Link to="/news-stories">
                  Read Field Stories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 max-w-2xl rounded-[1.7rem] border border-border/80 bg-card/88 p-5 shadow-[0_20px_60px_-48px_hsl(var(--foreground))]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Editorial Note
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This cycle balances emergency response, student continuity,
                preventive care, and environmental resilience. Every chapter is
                reviewed through utilization, partner coordination, and delivery
                audits so the work remains transparent as it scales.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/92 p-4 shadow-[0_30px_75px_-48px_hsl(var(--foreground))] backdrop-blur-sm sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,hsl(var(--accent)/0.26),transparent_48%),radial-gradient(circle_at_12%_92%,hsl(var(--primary)/0.2),transparent_48%)]" />
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="h-[24rem] w-full object-cover sm:h-[28rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/18 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {featuredProject.focus}
                  </Badge>
                  <Badge
                    className={
                      featuredProject.status === "Active"
                        ? "border-amber-500/35 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        : "border-emerald-500/35 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    }
                  >
                    {featuredProject.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-primary-foreground/20 bg-foreground/55 p-4 text-primary-foreground backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                    Featured Chapter
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold leading-tight">
                    {featuredProject.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-primary-foreground/85">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {featuredProject.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 px-3 py-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredProject.timeline}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-4 rounded-[1.7rem] border border-border/80 bg-card/92 p-5 shadow-[0_18px_55px_-46px_hsl(var(--foreground))]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Performance Capsule
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {featuredUtilization}% utilized
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Budget Deployed
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatRecentProjectsInr(featuredProject.spent)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Delivery Partners
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {featuredProject.partners}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Beneficiaries
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {recentProjectsNumberFormat.format(featuredProject.beneficiaries)}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${featuredUtilization}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent"
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                The leading active chapter is currently running with{" "}
                {recentProjectsNumberFormat.format(featuredProject.volunteers)}{" "}
                volunteers and structured follow-up support to keep service
                delivery consistent beyond the first intervention.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioLanding;
