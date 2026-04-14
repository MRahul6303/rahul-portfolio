"use client";

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, Lightbulb, Zap, Target } from "lucide-react";
import { ReactNode, isValidElement } from "react";

const MotionImage = ({ src, alt }: { src?: string; alt?: string }) => {
  const imageSrc = typeof src === "string" ? src : "";

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 -mx-4 sm:-mx-6 lg:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border-0 bg-muted group shadow-lg">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span>Image not found</span>
          </div>
        )}
      </div>
      {alt && (
        <figcaption className="text-sm text-muted-foreground mt-3 text-center italic px-4 sm:px-6 lg:px-8">
          {alt}
        </figcaption>
      )}
    </motion.figure>
  );
};

const MotionVideo = ({ src, alt }: { src?: string; alt?: string }) => {
  const videoSrc = typeof src === "string" ? src : "";

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 -mx-4 sm:-mx-6 lg:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border-0 bg-muted shadow-lg">
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            className="w-full h-full object-cover"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span>Video not found</span>
          </div>
        )}
      </div>
      {alt && (
        <figcaption className="text-sm text-muted-foreground mt-3 text-center italic px-4 sm:px-6 lg:px-8">
          {alt}
        </figcaption>
      )}
    </motion.figure>
  );
};

(MotionImage as any).__mdxImage = true;

function isImageOnlyParagraph(children: ReactNode) {
  const nodes = Array.isArray(children) ? children : [children];
  const filtered = nodes.filter(
    (child) => typeof child !== "string" || child.trim().length > 0,
  );

  if (filtered.length !== 1) {
    return false;
  }

  const child = filtered[0];
  if (!isValidElement(child)) {
    return false;
  }

  const childProps = child.props as Record<string, unknown>;
  const childType = child.type as any;
  if (childType?.__mdxImage) {
    return true;
  }

  const typeHint = (childProps as any)?.mdxType || (childProps as any)?.originalType;
  return typeHint === "img";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight mb-6 mt-12 first:mt-0 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold tracking-tight mb-5 mt-12 flex items-center gap-3 group"
      >
        <span className="w-1 h-8 bg-gradient-to-b from-iris to-mint rounded-full opacity-100 transition-opacity" />
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-semibold tracking-tight mb-4 mt-8"
      >
        {children}
      </motion.h3>
    ),
    p: ({ children }) => {
      if (isImageOnlyParagraph(children)) {
        return <>{children}</>;
      }

      return (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-base leading-relaxed mb-6 text-foreground/90"
        >
          {children}
        </motion.p>
      );
    },
    ul: ({ children }) => (
      <motion.ul
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="list-disc pl-6 mb-6 space-y-3 text-foreground/90"
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children }) => (
      <motion.ol
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="list-decimal pl-6 mb-6 space-y-3 text-foreground/90"
      >
        {children}
      </motion.ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed marker:text-iris">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    img: (props) => <MotionImage {...props} />,
    blockquote: ({ children, ...props }: any) => {
      const type = props.type || "info";
      const icons = {
        info: <Info className="h-5 w-5" />,
        tip: <Lightbulb className="h-5 w-5" />,
        warning: <AlertCircle className="h-5 w-5" />,
        success: <CheckCircle2 className="h-5 w-5" />,
      };
      const colors = {
        info: "border-iris/50 bg-iris/5",
        tip: "border-amber/50 bg-amber/5",
        warning: "border-orange/50 bg-orange/5",
        success: "border-mint/50 bg-mint/5",
      };
      
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`border-l-4 ${colors[type as keyof typeof colors] || colors.info} pl-6 py-4 my-6 rounded-r-lg`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-iris">
              {icons[type as keyof typeof icons] || icons.info}
            </div>
            <div className="flex-1 text-foreground/90 leading-relaxed">
              {children}
            </div>
          </div>
        </motion.blockquote>
      );
    },
    code: ({ children, className }: any) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-iris">
            {children}
          </code>
        );
      }
      return (
        <code className={className}>
          {children}
        </code>
      );
    },
    pre: ({ children }: any) => (
      <motion.pre
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-muted/50 border border-border/50 p-6 rounded-xl overflow-x-auto my-6 shadow-inner font-mono text-sm"
      >
        {children}
      </motion.pre>
    ),
    hr: () => (
      <motion.hr
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    Video: ({ src, alt }: { src?: string; alt?: string }) => <MotionVideo src={src} alt={alt} />,
    ...components,
  };
}
