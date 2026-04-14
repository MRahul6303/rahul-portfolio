"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number; xOffset: number }>>([]);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Generate particle positions only on client
    const particleData = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      xOffset: Math.random() * 20 - 10,
    }));
    setParticles(particleData);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{
            backgroundPosition: isReducedMotion ? "0% 0%" : ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)",
          }}
        />
      </div>

      {/* Large Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <motion.div
          animate={
            isReducedMotion
              ? {}
              : {
                  x: [0, 50, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/3 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-iris/30 via-iris/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={
            isReducedMotion
              ? {}
              : {
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-mint/30 via-mint/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={
            isReducedMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.25, 1],
                  rotate: [0, 180, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber/25 via-coral/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={
            isReducedMotion
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 25, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-coral/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles - Only render on client after mount */}
      {isMounted && !isReducedMotion && particles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, particle.xOffset, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60 pointer-events-none" />

      {/* Mesh gradient effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(124, 92, 252, 0.3) 0%, transparent 25%),
                        radial-gradient(circle at 80% 50%, rgba(0, 209, 178, 0.3) 0%, transparent 25%),
                        radial-gradient(circle at 50% 80%, rgba(255, 183, 3, 0.3) 0%, transparent 25%)`,
            filter: "blur(80px)",
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}



