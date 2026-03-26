import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";
import type { LegalDocument } from "@/data/siteContent";

interface LegalDocumentPageProps {
  document: LegalDocument;
}

const LegalDocumentPage = ({ document }: LegalDocumentPageProps) => (
  <div className="bg-background">
    <section className="relative overflow-hidden border-b border-border/70 bg-card/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--primary)/0.16),transparent_42%),radial-gradient(circle_at_82%_22%,hsl(var(--accent)/0.18),transparent_40%),linear-gradient(160deg,hsl(var(--background))_0%,hsl(var(--muted))_54%,hsl(var(--background))_100%)]" />
      <div className="container relative mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            Site Policy
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            {document.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {document.subtitle}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-background/90 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Last Updated
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">{document.lastUpdated}</p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/90 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Coverage
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {document.sections.length} sections covering website use and responsibilities
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-4xl rounded-[1.75rem] border border-border/80 bg-card/90 p-6 shadow-[0_24px_70px_-54px_hsl(var(--foreground))] sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <div className="space-y-3">
              {document.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-8 max-w-4xl space-y-5">
          {document.sections.map((section, index) => (
            <motion.article
              key={section.heading}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-[1.6rem] border border-border/80 bg-card/90 p-6 shadow-[0_18px_55px_-48px_hsl(var(--foreground))] sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    Section {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {document.title}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default LegalDocumentPage;
