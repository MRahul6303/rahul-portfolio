"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Spotify", href: "https://spotify.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/itsnotrahul/" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4">Rahul Mahesh</h2>
            <p className="text-sm text-muted-foreground">
              Product Designer & Growth Strategist
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold tracking-widest text-foreground mb-4 uppercase">
              Location
            </h3>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              <p>Jumeirah Lake Towers,</p>
              <p>Dubai</p>
            </address>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold tracking-widest text-foreground mb-4 uppercase">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a
                  href="tel:+971585496303"
                  className="hover:text-iris transition-colors duration-300"
                >
                  +971 58 549 6303
                </a>
              </p>
              <p>
                <a
                  href="mailto:rahuldesigns@gmail.com"
                  className="hover:text-iris transition-colors duration-300"
                >
                  rahuldesigns@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xs font-semibold tracking-widest text-foreground mb-4 uppercase">
              Social
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-iris transition-colors duration-300 inline-flex items-center group"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
