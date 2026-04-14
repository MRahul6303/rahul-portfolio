"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Users, Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectMetadata } from "@/types/project";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useMDXComponents } from "@/mdx-components";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_EASE } from "@/lib/animations";
import { ImageCarousel } from "@/components/image-carousel";

interface ProjectDetailProps {
  metadata: ProjectMetadata;
  content: string;
  prevProject: ProjectMetadata | null;
  nextProject: ProjectMetadata | null;
}

export function ProjectDetail({
  metadata,
  content,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const router = useRouter();
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    async function compileMDX() {
      const result = await serialize(content);
      setMdxSource(result);
    }
    compileMDX();
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: DEFAULT_EASE }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-8 group hover:bg-primary/10"
            >
              <Link href="/work">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Work
              </Link>
            </Button>
          </motion.div>

          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Header */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
                >
                  <span className="text-sm font-medium text-primary">Case Study</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {metadata.title}
                </h1>
                {metadata.subtitle && (
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    ({metadata.subtitle})
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{metadata.year} • {metadata.timeline}</span>
                  </div>
                  {metadata.impact_metric && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-1.5 bg-gradient-to-r from-iris to-mint rounded-full"
                    >
                      <span className="text-sm font-bold text-white">
                        {metadata.impact_metric}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cover Image Carousel or Video */}
              {metadata.cover && (() => {
                const galleryImages = metadata.gallery && Array.isArray(metadata.gallery) && metadata.gallery.length > 0
                  ? metadata.gallery
                  : [];
                
                // Check if there's a video in the gallery
                const hasVideo = galleryImages.some((item: string) => 
                  item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.mov')
                );
                
                // If there's a video, show only the video (not the cover image in carousel)
                if (hasVideo && galleryImages.length > 0) {
                  const videoFile = galleryImages.find((item: string) => 
                    item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.mov')
                  );
                  
                  if (videoFile) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted"
                      >
                        <video
                          src={videoFile}
                          controls
                          className="w-full h-full object-cover"
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                      </motion.div>
                    );
                  }
                }
                
                // Otherwise, show carousel with cover and gallery images
                const allMedia = [metadata.cover, ...galleryImages];
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <ImageCarousel
                      images={allMedia}
                      alt={metadata.title}
                      autoChangeInterval={5000}
                    />
                  </motion.div>
                );
              })()}
            </motion.div>

            {/* Content Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="prose prose-lg max-w-none dark:prose-invert"
            >
              {mdxSource && <MDXRemote {...mdxSource} components={components} />}
            </motion.div>

            {/* Project Details Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {/* Role */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/30 hover:border-iris/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-iris/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-iris" />
                  </div>
                  <h3 className="font-semibold text-lg">My Role</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {metadata.role.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="text-iris mt-1">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Team */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/30 hover:border-mint/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-mint" />
                  </div>
                  <h3 className="font-semibold text-lg">Team</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {metadata.team.map((member) => (
                    <li key={member} className="flex items-start gap-2">
                      <span className="text-mint mt-1">•</span>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tools */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/30 hover:border-amber/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-amber" />
                  </div>
                  <h3 className="font-semibold text-lg">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {metadata.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Links */}
            {metadata.links && Object.keys(metadata.links).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                {metadata.links.prototype && (
                  <Button variant="outline" asChild className="group">
                    <a href={metadata.links.prototype} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      View Prototype
                    </a>
                  </Button>
                )}
                {metadata.links.live && (
                  <Button asChild className="group">
                    <a href={metadata.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Live Site
                    </a>
                  </Button>
                )}
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 pt-8 border-t flex justify-between items-center"
            >
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Previous</div>
                    <div className="font-semibold">{prevProject.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextProject ? (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all text-right"
                >
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Next</div>
                    <div className="font-semibold">{nextProject.title}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
