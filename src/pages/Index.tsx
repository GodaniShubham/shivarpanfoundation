import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, TreePine, Stethoscope, ArrowRight, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import ImpactCounter from "@/components/ImpactCounter";
import CampaignCard from "@/components/CampaignCard";
import heroImage from "@/assets/hero-main.jpg";
import campaignFood from "@/assets/campaign-food.jpg";
import campaignEducation from "@/assets/campaign-education.jpg";
import campaignHealth from "@/assets/campaign-health.jpg";
import campaignEnvironment from "@/assets/campaign-environment.jpg";

const campaigns = [
  { title: "Feed 1000 Families This Winter", image: campaignFood, goal: 200000, raised: 142000, donors: 89, category: "Food Security", urgent: true, daysLeft: 12 },
  { title: "Education for Every Child – School Kit Drive", image: campaignEducation, goal: 150000, raised: 98500, donors: 67, category: "Education", daysLeft: 25 },
  { title: "Free Health Camp in Rural Maharashtra", image: campaignHealth, goal: 300000, raised: 175000, donors: 124, category: "Healthcare", daysLeft: 18 },
  { title: "Plant 10,000 Trees – Green India Mission", image: campaignEnvironment, goal: 100000, raised: 72000, donors: 53, category: "Environment", daysLeft: 40 },
];

const causes = [
  { icon: <BookOpen className="w-7 h-7" />, title: "Education", desc: "Quality education for underprivileged children across India" },
  { icon: <Stethoscope className="w-7 h-7" />, title: "Healthcare", desc: "Free medical camps and healthcare support for rural communities" },
  { icon: <Heart className="w-7 h-7" />, title: "Food Security", desc: "Hunger-free India through meal distribution and food drives" },
  { icon: <TreePine className="w-7 h-7" />, title: "Environment", desc: "Tree plantation and sustainability programs for a greener future" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Monthly Donor", text: "Shivarpan Foundation transformed our village school. 50 children now have access to quality education and daily meals." },
  { name: "Rajesh Patel", role: "Volunteer", text: "Being part of the tree plantation drive was incredible. We planted 2000 saplings in just one weekend!" },
  { name: "Dr. Anita Desai", role: "Healthcare Partner", text: "Our partnership with Shivarpan has enabled free health camps reaching over 5000 patients in rural areas." },
];

const Index = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroImage} alt="Shivarpan Foundation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 text-primary-foreground text-sm mb-6"
            >
              <Heart className="w-4 h-4 text-accent" />
              Building a better tomorrow, together
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Empowering Lives,{" "}
              <span className="text-accent">Transforming</span>{" "}
              Communities
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-xl"
            >
              Shivarpan Charitable Foundation works tirelessly to provide education, healthcare, food security, and environmental sustainability to underserved communities across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/campaigns">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 backdrop-blur-sm font-semibold">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* Impact Counters */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactCounter end={15000} suffix="+" label="Lives Impacted" icon={<Heart className="w-7 h-7" />} delay={0} />
            <ImpactCounter end={200} suffix="+" label="Campaigns" icon={<BookOpen className="w-7 h-7" />} delay={0.1} />
            <ImpactCounter end={5000} suffix="+" label="Volunteers" icon={<Users className="w-7 h-7" />} delay={0.2} />
            <ImpactCounter end={50} suffix="+" label="Partner NGOs" icon={<TreePine className="w-7 h-7" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Our Causes */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Our Core Causes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We focus on four key areas that create lasting impact in underserved communities across India.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((cause, i) => (
              <AnimatedSection key={cause.title} delay={i * 0.1}>
                <Link to="/causes">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-card rounded-2xl p-7 text-center border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 group cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      {cause.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{cause.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cause.desc}</p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Support a Cause</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Active Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every donation makes a difference. Choose a campaign and contribute towards building a better India.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <CampaignCard {...c} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link to="/campaigns">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                View All Campaigns <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 hero-overlay">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Stories of Impact</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">What People Say</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-7 border border-primary-foreground/10"
                >
                  <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-5">{t.text}</p>
                  <div>
                    <p className="font-display font-semibold text-primary-foreground">{t.name}</p>
                    <p className="text-xs text-primary-foreground/60">{t.role}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="bg-card rounded-3xl p-10 md:p-16 text-center border border-border shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">Your contribution, no matter how small, creates a ripple of change. Join thousands of donors who are building a better India.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/campaigns">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                      <Heart className="w-5 h-5 mr-2" /> Donate Now
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base font-semibold">
                      Become a Volunteer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
