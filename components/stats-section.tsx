"use client";

import { motion } from "framer-motion";
import { DEFAULT_EASE } from "@/lib/animations";

const stats = [
  {
    value: "300+",
    label: "Screens designed to streamline collaboration across seven GO-to-go departments",
  },
  {
    value: "£35K+",
    label: "Initiated generated through high-performing digital campaigns",
  },
  {
    value: "10+",
    label: "Integrated modules designed for seamless end-to-end project management",
  },
  {
    value: "5+",
    label: "Projects shipped across startups, scale-ups, and enterprise teams",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: DEFAULT_EASE,
    },
  },
};

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Blending design clarity with marketing strategy, creating experiences
              that convert and perform
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                {/* Number - Main Focus */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--iris-hsl))] via-[hsl(var(--mint-hsl))] to-[hsl(var(--iris-hsl))] bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                </motion.div>

                {/* Description - Subtle */}
                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-sm mx-auto">
                  {stat.label}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="mt-6 mx-auto h-px bg-gradient-to-r from-transparent via-iris to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center border-t border-border/30 pt-16"
          >
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Connect with me to explore your project's potential.
            </p>
            <motion.a
              href="/about"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-iris transition-colors duration-300 group"
              whileHover={{ x: 5 }}
            >
              <span>About</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
