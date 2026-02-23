import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aboutHero from "@/assets/about-hero.jpg";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you — reach out anytime" image={aboutHero} />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you want to volunteer, donate, partner, or simply learn more about our work — we're here for you.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, title: "Address", value: "Mumbai, Maharashtra, India 400001" },
                    { icon: <Phone className="w-5 h-5" />, title: "Phone", value: "+91 98765 43210" },
                    { icon: <Mail className="w-5 h-5" />, title: "Email", value: "info@shivarpanfoundation.org" },
                    { icon: <Clock className="w-5 h-5" />, title: "Working Hours", value: "Mon - Sat, 9:30 AM - 6:30 PM" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <motion.form
                  onSubmit={handleSubmit}
                  className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-muted/50" />
                    <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-muted/50" />
                    <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-muted/50" />
                    <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="bg-muted/50" />
                  </div>
                  <Textarea placeholder="Your Message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="mb-6 bg-muted/50" />
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </motion.form>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3 animate-float" />
            <p className="text-muted-foreground font-medium">Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
