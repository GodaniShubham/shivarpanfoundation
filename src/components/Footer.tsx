import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import shivarpanLogo from "@/assets/shivarpan-logo.jpeg";
import { aboutContent } from "@/data/siteContent";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="mb-4 inline-flex rounded-xl bg-primary-foreground p-2 shadow-md">
              <img
                src={shivarpanLogo}
                alt="Shivarpan Foundation logo"
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {aboutContent.footerSummary}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, link: "https://www.facebook.com/share/17EXvAn2U2/" },
                { Icon: Instagram, link: "https://www.instagram.com/shivarpan_foundation?igsh=bXc0NDY3dXl0bWM1" },
                { Icon: Linkedin, link: "https://www.linkedin.com/company/shivarpan-foundation/" },
                { Icon: Youtube, link: "https://youtu.be/HeUBBLW01Ms?si=wcvxeT97VEEgc6RI" },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/gallery", label: "Gallery" },
                { to: "/news-stories", label: "Stories" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm opacity-70 transition-all duration-300 hover:text-accent hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">
              Media & Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/awards", label: "Awards" },
                { to: "/podcast", label: "Podcast" },
                { to: "/e-magazine-articles", label: "E-Magazine" },
                { to: "/gallery", label: "Photo Gallery" },
                { to: "/news-stories", label: "Stories" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm opacity-70 transition-all duration-300 hover:text-accent hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">
              Governance
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/board-of-trustees"
                  className="text-sm opacity-70 transition-all duration-300 hover:text-accent hover:opacity-100"
                >
                  Board of Trustees
                </Link>
              </li>
              <li>
                <Link
                  to="/team-members"
                  className="text-sm opacity-70 transition-all duration-300 hover:text-accent hover:opacity-100"
                >
                  Team Members
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  F.F, 104-D, 100 Feet Rd, nr. Sachin Tower, Satellite, ANANDNAGAR,
                  Jodhpur Village, Ahmedabad, Gujarat 380015.
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98980 38241</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@shivarpanfoundation.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row">
          <p className="text-xs opacity-50">
            (c) 2026 Shivarpan Charitable Foundation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs opacity-50 transition-opacity hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-xs opacity-50 transition-opacity hover:opacity-100"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-xs opacity-50">
              Refund Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
