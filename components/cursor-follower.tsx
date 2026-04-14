"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !isMounted) return;

    let rafId: number;
    let lastInteractive = false;

    const moveCursor = (e: MouseEvent) => {
      // Use RAF for smoother updates
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Throttle hover detection to reduce state updates
        const target = e.target as HTMLElement;
        const isInteractive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null;

        // Only update state if it changed
        if (isInteractive !== lastInteractive) {
          lastInteractive = isInteractive;
          setIsHovering(isInteractive);
        }
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isReducedMotion, isMounted]);

  // Don't render on mobile or if reduced motion is preferred
  if (!isMounted || isReducedMotion) return null;

  // Check if device has a pointer (not touch-only)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring - Blue accent */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
            opacity: isHovering ? 1 : 0.5,
          }}
          transition={{ 
            duration: isClicking ? 0.1 : 0.3, 
            ease: "easeOut" 
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer glow - Blue */}
          <div
            className="absolute inset-0 w-12 h-12 -translate-x-1 -translate-y-1 rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(var(--iris-hsl) / ${isHovering ? 0.4 : 0.2}) 0%, transparent 70%)`,
              filter: "blur(10px)",
            }}
          />

          {/* Main ring */}
          <div
            className="w-10 h-10 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: isHovering ? "hsl(var(--iris))" : "rgba(255, 255, 255, 0.8)",
              boxShadow: isHovering
                ? "0 0 20px 4px hsl(var(--iris-hsl) / 0.7), 0 0 40px 8px hsl(var(--iris-hsl) / 0.3), inset 0 0 10px 2px hsl(var(--iris-hsl) / 0.2)"
                : "0 0 8px 2px hsl(var(--iris-hsl) / 0.3)",
              mixBlendMode: isHovering ? "normal" : "difference",
            }}
          />

          {/* Single ripple effect on hover */}
          {isHovering && !isClicking && (
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: "hsl(var(--iris) / 0.5)",
              }}
              animate={{
                scale: [1, 2],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot - follows cursor directly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          }}
          transition={{ duration: isClicking ? 0.1 : 0.15 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "white",
              boxShadow: "0 0 6px 2px hsl(var(--iris-hsl) / 0.6)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced glow effect on hover */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(var(--iris-hsl) / 0.3) 0%, transparent 70%)`,
                filter: "blur(15px)",
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
