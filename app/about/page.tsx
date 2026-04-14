"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Download, Linkedin, Mail, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useRef } from "react";
import { DEFAULT_EASE } from "@/lib/animations";

const stats = [
  { icon: TrendingUp, label: "Years Experience", value: "2+", color: "iris" },
  { icon: Sparkles, label: "Projects Shipped", value: "6+", color: "mint" },
  { icon: Users, label: "Teams Worked With", value: "3+", color: "amber" },
  { icon: Zap, label: "Avg Impact", value: "+30%", color: "coral" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Image */}
          <motion.div
            style={{ y, opacity }}
            className="mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: DEFAULT_EASE }}
                className="relative group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-iris/20 to-mint/20">
                  {/* Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/images/projects/construction-installation-tracker/me.jpg"
                      alt="Rahul Mahesh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-mint/30 rounded-full"
                />
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: DEFAULT_EASE, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">About Me</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Product Designer &{" "}
                  <span className="bg-gradient-to-r from-iris to-mint bg-clip-text text-transparent">
                    Engineer
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Crafting experiences that don't just look good—they drive real business results.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <stat.icon className={`h-8 w-8 mb-4 text-${stat.color}`} style={{ color: `var(--${stat.color})` }} />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio Section - More Dynamic */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg leading-relaxed"
              >
                I'm Rahul Mahesh, a product designer who believes great design isn't
                just beautiful—it drives measurable business growth. Over the past
                year, I've helped startups and scale-ups reduce friction, increase
                engagement, and boost conversion through thoughtful, user-centered design.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg leading-relaxed"
              >
                My workflow blends research, rapid experimentation, and data-driven
                iteration, and I not only design products—I also develop them,
                enabling faster handoff, tighter alignment with engineering, and
                quicker iteration cycles.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg leading-relaxed"
              >
                I've led projects that improved activation by 27%, reduced design
                debt by 35%, and increased paid conversion by 18%, all while
                maintaining a strong focus on accessibility and user delight.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg leading-relaxed"
              >
                Currently, I'm bridging design and development at{" "}
                <span className="font-semibold bg-gradient-to-r from-iris to-mint bg-clip-text text-transparent">
                  Joseph Group
                </span>, working at the intersection of AI-assisted development,
                product design, and scalable systems.
              </motion.p>
            </div>
          </motion.div>

          {/* Values - Interactive Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Core Values
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "User-Centered",
                  desc: "Every design decision starts with understanding user needs, pain points, and motivations through research and data.",
                  gradient: "from-iris/20 to-iris/5",
                  border: "hover:border-iris/50",
                },
                {
                  title: "Growth-Oriented",
                  desc: "Design should drive business outcomes. I measure success in activation, retention, and revenue—not just pixels.",
                  gradient: "from-mint/20 to-mint/5",
                  border: "hover:border-mint/50",
                },
                {
                  title: "Accessibility First",
                  desc: "Inclusive design isn't optional. Every project prioritizes WCAG compliance and works for all users.",
                  gradient: "from-amber/20 to-amber/5",
                  border: "hover:border-amber/50",
                },
                {
                  title: "Systematic Thinking",
                  desc: "I build scalable design systems that empower teams to move fast without sacrificing consistency or quality.",
                  gradient: "from-coral/20 to-coral/5",
                  border: "hover:border-coral/50",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  <div className={`p-6 rounded-xl bg-gradient-to-br ${value.gradient} border border-border ${value.border} transition-all duration-300 hover:shadow-xl`}>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Tools */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Skills & Tools</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="font-semibold mb-3">Design</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Product Design</li>
                  <li>UX Research</li>
                  <li>UI Design</li>
                  <li>Design Systems</li>
                  <li>Prototyping</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Growth</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>A/B Testing</li>
                  <li>Conversion Optimization</li>
                  <li>Onboarding Design</li>
                  <li>Growth Experiments</li>
                  <li>Analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Engineering</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>HTML / CSS</li>
                  <li>Git / GitHub</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                  <li>Mixpanel / Amplitude</li>
                  <li>Hotjar / FullStory</li>
                  <li>Storybook</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience Timeline - Animated */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8"
            >
              Experience
            </motion.h2>
            <div className="space-y-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-mint to-transparent" />

              {[
                {
                  title: "AI Product Engineer / Product Designer",
                  period: "June 2025 - Present",
                  company: "Joseph Group — Dubai, UAE",
                  desc: "Bridging design and development for internal platforms. Designed and implemented 300+ screens, leveraging AI-assisted development to cut production time by 30%. Drove £35K+ in new leads within six months.",
                  active: true,
                },
                {
                  title: "UX Freelancer",
                  period: "October 2025 - Present",
                  company: "CURD.Network — Dubai, UAE · Remote",
                  desc: "Led UX research and designed high-fidelity prototypes for a social media platform. Created user journey maps and collaborated with developers to enhance usability and engagement.",
                  active: true,
                },
                {
                  title: "Consumer Behaviour & Travel Market Analysis Extern",
                  period: "March 2025 - May 2025",
                  company: "Expedia — Remote",
                  desc: "Designed and implemented a survey solution using Google Forms and chatbot tools for targeted travel-industry customer data collection. Analyzed market datasets in Google Sheets and Tableau, built dashboards, and presented weekly insights and recommendations to stakeholders.",
                  active: false,
                },
                {
                  title: "Product Designer (Intern)",
                  period: "July 2024 - Jan 2025",
                  company: "Merck Sharp & Dohme — Dubai, UAE · Hybrid",
                  desc: "Redesigned the MSD GCC Pulse internal platform using Figma and WordPress, establishing a scalable design system. Supported DE&I marketing initiatives through content creation and video strategy.",
                  active: false,
                },
              ].map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-8 group"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full ${
                      job.active ? "bg-primary ring-4 ring-primary/20" : "bg-muted"
                    }`}
                  />

                  <div className={`p-6 rounded-xl border ${job.active ? "border-primary/50 bg-primary/5" : "border-border bg-card/50"} group-hover:border-primary/50 transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-3">{job.company}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-iris/20 via-mint/20 to-amber/20 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-r from-iris/10 to-mint/10 rounded-2xl p-12 text-center border border-primary/20 overflow-hidden">
              {/* Animated Background Shapes */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-mint/20 to-transparent rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-iris/20 to-transparent rounded-full blur-2xl"
              />

              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Let's Work Together
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
                >
                  I'm always interested in hearing about new projects and
                  opportunities. Whether you need a product designer, growth
                  strategist, or design systems expert, let's connect.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" asChild className="shadow-lg">
                      <Link href="mailto:rahuldesigns@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Get in Touch
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/cv.pdf" target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="ghost" asChild>
                      <a
                        href="https://www.linkedin.com/in/itsnotrahul/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
