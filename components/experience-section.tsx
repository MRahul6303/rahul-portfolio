"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { DEFAULT_EASE } from "@/lib/animations";

const experiences = [
  {
    title: "AI Product Engineer / Product Designer",
    company: "Joseph Group — Dubai, UAE",
    period: "June 2025 - Present",
    description:
      "Bridging design and development for Joseph Group's internal platforms. Designed and implemented a 300+ screen project management system, leveraging AI-assisted development to bring designs to life and cut production time by 30%. Built scalable design systems, managed the development process, and contributed to marketing and lead-generation efforts for global subsidiaries, helping drive £35K+ in new leads within six months.",
    current: true,
  },
  {
    title: "UX Freelancer",
    company: "CURD.Network — Dubai, UAE · Remote",
    period: "October 2025 - Present",
    description:
      "Led UX research and designed high-fidelity prototypes for CURD.Network's social media platform. Created user journey maps and collaborated with developers to refine user flows and interactions, enhancing overall usability and engagement across core features.",
    current: true,
  },
  {
    title: "Product Designer (Intern)",
    company: "Merck Sharp & Dohme — Dubai, UAE · Hybrid",
    period: "July 2024 - Jan 2025",
    description:
      "Redesigned and implemented the MSD GCC Pulse internal platform using Figma and WordPress, establishing a scalable design system that improved brand consistency and reduced development time. Supported DE&I marketing initiatives through content creation and video strategy, boosting visibility and engagement across regional teams.",
    current: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: DEFAULT_EASE,
    },
  },
};

export function ExperienceSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Career Journey</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            1+ years of designing product experiences across startups and scale-ups.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-iris via-mint to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-8 w-3 h-3 -translate-x-[5px] hidden md:block">
                  <motion.div
                    className={`w-full h-full rounded-full ${
                      experience.current ? "bg-iris" : "bg-mint/50"
                    }`}
                    animate={
                      experience.current
                        ? {
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.8, 1],
                          }
                        : {}
                    }
                    transition={
                      experience.current
                        ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                    style={{
                      boxShadow: experience.current
                        ? "0 0 20px 5px hsl(var(--iris-hsl) / 0.6)"
                        : "0 0 10px 2px hsl(var(--mint-hsl) / 0.4)",
                    }}
                  />
                </div>

                {/* Experience Card */}
                <motion.div
                  className="md:ml-12 p-6 md:p-8 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-iris/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-iris/10"
                  whileHover={{ x: 10, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-primary font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap font-mono">
                        {experience.period}
                      </span>
                      {experience.current && (
                        <motion.span
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="px-3 py-1 bg-iris/20 text-iris text-xs font-semibold rounded-full"
                        >
                          Current
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Decorative gradient on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-iris/5 to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
