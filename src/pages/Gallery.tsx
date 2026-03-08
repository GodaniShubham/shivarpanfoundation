import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Image as ImageIcon, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aboutHero from "@/assets/about-hero.jpg";
import campaignFood from "@/assets/campaign-food.jpg";
import campaignEducation from "@/assets/campaign-education.jpg";
import campaignHealth from "@/assets/campaign-health.jpg";
import campaignEnvironment from "@/assets/campaign-environment.jpg";

const galleryItems = [
  { title: "Food Drive in Mumbai", category: "Relief", image: campaignFood },
  { title: "Scholarship Kit Distribution", category: "Education", image: campaignEducation },
  { title: "Rural Medical Camp", category: "Healthcare", image: campaignHealth },
  { title: "Tree Plantation Mission", category: "Environment", image: campaignEnvironment },
  { title: "Volunteer Orientation Day", category: "Community", image: campaignFood },
  { title: "School Renovation Week", category: "Education", image: campaignEducation },
  { title: "Women Health Awareness", category: "Healthcare", image: campaignHealth },
  { title: "Green Campus Initiative", category: "Environment", image: campaignEnvironment },
];

const tileClassByIndex = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "lg:row-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-1",
  "",
  "",
];

const galleryTags = ["Relief", "Education", "Healthcare", "Environment", "Community"];

const galleryTileVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: index % 2 === 0 ? 64 : 52,
    x: index % 3 === 0 ? -24 : index % 3 === 2 ? 24 : 0,
    rotateX: index % 2 === 0 ? 16 : -12,
    rotateY: index % 2 === 0 ? -10 : 10,
    scale: 0.86,
    filter: "blur(14px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 18,
      mass: 0.8,
      delay: 0.08 + index * 0.07,
    },
  }),
};

const galleryImageVariants = {
  hidden: {
    scale: 1.18,
    clipPath: "inset(16% 12% 20% 12% round 24px)",
    filter: "saturate(0.78) contrast(0.92)",
  },
  visible: {
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    filter: "saturate(1) contrast(1)",
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Gallery = () => (
  <div className="relative overflow-hidden">
    <motion.div
      aria-hidden
      animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.12, 0.28, 0.12] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -left-10 top-[22rem] h-52 w-52 rounded-full bg-primary/20 blur-3xl sm:h-64 sm:w-64 md:-left-12 md:top-[26rem] md:h-72 md:w-72"
    />
    <motion.div
      aria-hidden
      animate={{ x: [0, -24, 0], y: [0, 18, 0], opacity: [0.1, 0.24, 0.1] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -right-12 top-[36rem] h-52 w-52 rounded-full bg-accent/20 blur-3xl sm:h-64 sm:w-64 md:-right-16 md:top-[42rem] md:h-72 md:w-72"
    />
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      {Array.from({ length: 9 }).map((_, index) => (
        <motion.span
          key={`gallery-particle-${index}`}
          aria-hidden
          style={{
            left: `${12 + (index % 3) * 28}%`,
            top: `${18 + Math.floor(index / 3) * 20}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.12, 0.45, 0.12], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/45"
        />
      ))}
    </div>

    <PageHero
      title="Gallery"
      subtitle="Moments of service, hope, and transformation from our field programs"
      image={aboutHero}
    />

    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,hsl(var(--primary)/0.08),transparent_42%),radial-gradient(circle_at_84%_80%,hsl(var(--accent)/0.1),transparent_40%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <AnimatedSection className="mb-10 text-center md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4 text-accent" />
            Visual Impact
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Photo Highlights</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Hover each card for cinematic depth, motion glow, and a polished storytelling feel.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {galleryTags.map((tag, index) => (
              <motion.span
                key={tag}
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
              >
                {tag}
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
                  className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
              </motion.span>
            ))}
          </div>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-90px" }}
          className="grid auto-rows-[220px] grid-cols-1 gap-6 [perspective:1400px] sm:auto-rows-[190px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index}
              variants={galleryTileVariants}
              whileHover={{
                y: -14,
                scale: 1.025,
                rotateZ: index % 2 === 0 ? -0.5 : 0.5,
                rotateX: index % 2 === 0 ? 3 : -3,
                rotateY: index % 2 === 0 ? -3 : 3,
              }}
              transition={{ type: "spring", stiffness: 190, damping: 19 }}
              className={`group relative h-full overflow-hidden rounded-2xl border border-border/85 bg-card [transform-style:preserve-3d] shadow-[0_25px_70px_-48px_hsl(var(--foreground))] ${tileClassByIndex[index] ?? ""}`}
            >
              <motion.img
                variants={galleryImageVariants}
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 0.28, scale: 1.05 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-accent/30 blur-2xl"
              />
              <motion.div
                aria-hidden
                initial={{ x: "-130%" }}
                whileInView={{ x: "160%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.15, delay: 0.12 + index * 0.06, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/35 to-transparent"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-400 group-hover:border-primary-foreground/40" />
              <div className="pointer-events-none absolute inset-y-0 -left-3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/35 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

              <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/35 bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div className="absolute right-3 top-3 rounded-full border border-primary-foreground/30 bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground backdrop-blur-sm">
                {item.category}
              </div>

              <div className="absolute bottom-3 left-3 right-3 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="line-clamp-2 font-display text-lg font-semibold leading-tight text-primary-foreground">
                  {item.title}
                </h3>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <motion.span
                aria-hidden
                animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
                className="pointer-events-none absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-accent"
              />
            </motion.article>
          ))}
        </motion.div>

        <AnimatedSection className="mt-10 md:mt-12">
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-5 text-center shadow-[0_20px_60px_-45px_hsl(var(--foreground))] backdrop-blur-sm sm:p-6"
          >
            <motion.div
              aria-hidden
              animate={{ x: ["-120%", "130%"] }}
              transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-primary/18 to-transparent"
            />
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Camera className="h-6 w-6" />
            </div>
            <p className="text-muted-foreground">Fresh photos and event albums are added every month.</p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Gallery;
