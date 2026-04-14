"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_EASE } from "@/lib/animations";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <div>Rahul Mahesh</div>
            <div className="whitespace-nowrap">
              <span className="bg-gradient-to-r from-iris to-mint bg-clip-text text-transparent">
                Product Design
              </span>
              {" "}+{" "}
              <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                Engineering
              </span>
            </div>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Great at collaboration, dangerous with Figma, and surprisingly responsible with code.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" asChild className="group">
              <Link href="#work">
                View Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">About</Link>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Profile Image - Pops from the side */}
      <motion.div
        initial={{ x: 200, opacity: 0, rotate: 15 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          ease: DEFAULT_EASE,
        }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-20 hidden md:block"
      >
        <motion.div
          animate={{
            y: isReducedMotion ? 0 : [0, -15, 0],
            rotate: isReducedMotion ? 0 : [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, hsl(var(--iris-hsl) / 0.6) 0%, hsl(var(--mint-hsl) / 0.3) 50%, transparent 100%)`,
              filter: "blur(30px)",
              transform: "scale(1.5)",
            }}
          />

          {/* Decorative rotating ring */}
          <motion.div
            animate={{
              rotate: 360,
              scale: isReducedMotion ? 1 : [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -inset-4 rounded-full border-2 border-iris/30 opacity-50"
          />

          {/* Second decorative ring */}
          <motion.div
            animate={{
              rotate: -360,
              scale: isReducedMotion ? 1 : [1.05, 1, 1.05],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute -inset-6 rounded-full border border-mint/20 opacity-40"
          />

          {/* Profile Image Container */}
          <Link href="/about" className="block">
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-background shadow-2xl cursor-pointer group">
              {/* Profile Image */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/projects/construction-installation-tracker/me.jpg"
                  alt="Rahul Mahesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                />
                {/* Small sparkle effect */}
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full z-10"
                  style={{
                    boxShadow: "0 0 10px 3px rgba(255, 255, 255, 0.8)",
                  }}
                />
              </motion.div>

              {/* Blue glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-iris/50 to-mint/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
            </div>
          </Link>


          {/* Floating particles around the image */}
          {!isReducedMotion && (
            <>
              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * 360;
                const radius = 80;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      background: `radial-gradient(circle, hsl(var(--iris-hsl) / 0.8) 0%, hsl(var(--mint-hsl) / 0.4) 100%)`,
                      boxShadow: `0 0 10px 3px hsl(var(--iris-hsl) / 0.5)`,
                    }}
                    animate={{
                      x: [0, x, 0],
                      y: [0, y, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
