import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">Shivarpan</span>
                <span className="block text-xs opacity-70 -mt-1">Charitable Foundation</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Empowering communities through education, healthcare, food security, and environmental sustainability. Together we build a better tomorrow.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: "About Us" },
                { to: "/causes", label: "Our Causes" },
                { to: "/campaigns", label: "Campaigns" },
                { to: "/blog", label: "Blog & Events" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Causes */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Our Causes</h4>
            <ul className="space-y-2.5">
              {["Education", "Healthcare", "Food Security", "Environment", "Women Empowerment"].map((cause) => (
                <li key={cause}>
                  <Link to="/causes" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">
                    {cause}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@shivarpanfoundation.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs opacity-50">© 2026 Shivarpan Charitable Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-xs opacity-50 hover:opacity-100 transition-opacity">Terms of Use</a>
            <a href="#" className="text-xs opacity-50 hover:opacity-100 transition-opacity">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
