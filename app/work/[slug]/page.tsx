import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { ProjectDetail } from "./project-detail";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const { metadata } = getProjectBySlug(slug);
    
    return {
      title: metadata.title,
      description: metadata.summary,
      openGraph: {
        title: `${metadata.title} — ${metadata.impact_metric}`,
        description: metadata.summary,
        type: "article",
        images: metadata.cover ? [metadata.cover] : [],
      },
    };
  } catch (error) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const { metadata, content } = getProjectBySlug(slug);
    const allProjects = getAllProjects();
    const currentIndex = allProjects.findIndex((p) => p.slug === slug);
    const prevProject =
      currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject =
      currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : null;

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectDetail
          metadata={metadata}
          content={content}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}

