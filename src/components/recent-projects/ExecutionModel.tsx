import { motion } from "framer-motion";
import { deliverySteps } from "@/data/recentProjects";

const ExecutionModel = () => (
  <section className="relative overflow-hidden border-y border-border/70 py-14 section-gradient md:py-20">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_45%),radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.16),transparent_45%)]" />
    <div className="container relative z-10 mx-auto px-4">
      <div className="grid gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            How Execution Works
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Delivery is designed for speed, proof, and accountability
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Each chapter follows a repeatable system that keeps logistics,
            funding, and beneficiary outcomes visible at every stage of
            execution.
          </p>

          <div className="mt-6 rounded-[1.7rem] border border-border/80 bg-card/92 p-5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Why This Matters
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Programs do not move forward on instinct alone. Field checks,
              budget planning, sprint reviews, and post-delivery audits ensure
              that every intervention stays grounded in verified need.
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <div className="relative md:pl-10">
            <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
            <div className="space-y-4">
              {deliverySteps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="relative md:pl-8"
                  >
                    <span className="absolute left-0 top-6 hidden h-4 w-4 rounded-full border border-primary/35 bg-background md:block" />
                    <div className="rounded-[1.7rem] border border-border/80 bg-card/92 p-5 shadow-[0_16px_48px_-42px_hsl(var(--foreground))] sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span className="rounded-2xl bg-primary/12 p-3 text-primary">
                            <StepIcon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                              Step {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <span className="hidden rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline-flex">
                          Delivery Workflow
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.detail}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExecutionModel;
