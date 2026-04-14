"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProjectMetadata } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { DEFAULT_EASE } from "@/lib/animations";

interface ProjectCardProps {
  project: ProjectMetadata;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / 20;
    const deltaY = (e.clientY - centerY) / 20;
    
    x.set(deltaX);
    y.set(deltaY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isClicked ? 0.95 : 1,
      }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.06,
        scale: { duration: 0.2 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="h-full"
    >
      <Link 
        href={`/work/${project.slug}`}
        onClick={() => setIsClicked(true)}
        className="h-full block"
      >
        <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl relative h-full flex flex-col p-0 gap-0">
          <motion.div
            animate={{
              scale: isClicked ? 0.98 : isHovered ? 1.02 : 1,
            }}
            transition={{
              duration: isClicked ? 0.15 : 0.3,
              ease: DEFAULT_EASE,
            }}
            className="flex flex-col h-full"
          >
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
              {project.cover ? (
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: DEFAULT_EASE }}
                  className="w-full h-full"
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span className="text-4xl font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Animated gradient overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/20 to-transparent"
              />
              
              {/* Shimmer effect on hover */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />

              {/* Impact metric badge */}
              {project.impact_metric && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
                >
                  <TrendingUp className="h-3 w-3" />
                  {project.impact_metric}
                </motion.div>
              )}
            </div>

            <CardContent className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <motion.h3
                  animate={{
                    color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-semibold line-clamp-2 flex-1"
                >
                  {project.title}
                </motion.h3>
                <motion.span
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  className="text-sm text-muted-foreground whitespace-nowrap ml-4"
                >
                  {project.year}
                </motion.span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                {project.summary}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </motion.div>

          {/* Corner accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/20 to-transparent"
          />
        </Card>
      </Link>
    </motion.div>
  );
}
