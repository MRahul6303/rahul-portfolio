"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    // Add custom smooth scrolling behavior
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const scrollSpeed = 0.6; // Adjust for slower/faster scroll (lower = slower)
      
      window.scrollBy({
        top: delta * scrollSpeed,
        behavior: "auto", // We handle smoothness ourselves
      });
    };

    // Only add wheel listener if not reduced motion
    const scrollElement = window;
    scrollElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div ref={scrollRef} className="relative">
      {children}
    </div>
  );
}



