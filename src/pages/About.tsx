import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Heart, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aboutHero from "@/assets/about-hero.jpg";

const team = [
  { name: "Rajendra Shivarpan", role: "Founder & President", initials: "RS" },
  { name: "Meera Kulkarni", role: "Director of Operations", initials: "MK" },
  { name: "Suresh Yadav", role: "Head of Programs", initials: "SY" },
  { name: "Anita Joshi", role: "Finance & Compliance", initials: "AJ" },
];

const milestones = [
  { year: "2018", event: "Foundation established in Mumbai" },
  { year: "2019", event: "First 1,000 meals distributed" },
  { year: "2020", event: "COVID relief reaching 5,000 families" },
  { year: "2021", event: "Education program launched in 10 schools" },
  { year: "2022", event: "Healthcare camps serving 3,000 patients" },
  { year: "2023", event: "5,000 trees planted across Maharashtra" },
  { year: "2024", event: "80G certification received" },
  { year: "2025", event: "Expanded to 5 states across India" },
];

const About = () => (
  <div>
    <PageHero title="About Us" subtitle="Our story of compassion, service, and community transformation" image={aboutHero} />

    {/* Mission & Vision */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          <AnimatedSection direction="left">
            <div className="bg-card rounded-2xl p-8 border border-border h-full hover:shadow-xl transition-shadow duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower underprivileged communities through sustainable programs in education, healthcare, food security, and environmental conservation. We believe that every individual deserves an opportunity to thrive.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="bg-card rounded-2xl p-8 border border-border h-full hover:shadow-xl transition-shadow duration-500">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-5">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where no one goes to bed hungry, every child has access to quality education, healthcare is a right not a privilege, and our environment is preserved for future generations.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">What Guides Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Our Core Values</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Heart className="w-6 h-6" />, title: "Compassion", desc: "Leading with empathy in every action we take" },
            { icon: <CheckCircle className="w-6 h-6" />, title: "Transparency", desc: "Complete accountability in fund usage and impact" },
            { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Working together with local communities for lasting change" },
            { icon: <Award className="w-6 h-6" />, title: "Excellence", desc: "Striving for the highest standards in all our programs" },
          ].map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/30 transition-all">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{v.icon}</div>
                <h4 className="font-display text-lg font-semibold mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Journey</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Milestones</h2>
        </AnimatedSection>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
          {milestones.map((m, i) => (
            <AnimatedSection key={m.year} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex items-center gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  <h4 className="font-display text-lg font-bold text-primary">{m.year}</h4>
                  <p className="text-sm text-muted-foreground">{m.event}</p>
                </div>
                <div className="relative z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                </div>
                <div className="flex-1 md:hidden">
                  <h4 className="font-display text-lg font-bold text-primary">{m.year}</h4>
                  <p className="text-sm text-muted-foreground">{m.event}</p>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">The People Behind</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Our Team</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="bg-card rounded-2xl p-6 text-center border border-border hover:shadow-xl transition-all duration-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">{t.initials}</span>
                </div>
                <h4 className="font-display text-lg font-semibold">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
