import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ClosingPartnershipCta = () => (
  <section className="pb-16 pt-2 md:pb-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[2.3rem] border border-border/80 bg-card px-6 py-12 shadow-[0_24px_75px_-54px_hsl(var(--foreground))] sm:px-10 sm:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,hsl(var(--primary)/0.18),transparent_45%),radial-gradient(circle_at_82%_82%,hsl(var(--accent)/0.22),transparent_48%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Closing Partnership CTA
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Help shape the next chapters of measurable community impact
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              We are opening new implementation partnerships for nutrition,
              education continuity, preventive healthcare, and resilience-led
              community programs. If you want credible execution with visible
              reporting, this is where the next conversation should start.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button asChild size="lg" className="gap-2 rounded-full px-7">
              <Link to="/contact">
                Become A Program Partner
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
                Explore Impact Stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ClosingPartnershipCta;
