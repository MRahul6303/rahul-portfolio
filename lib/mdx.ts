import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectMetadata } from "@/types/project";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getProjectBySlug(slug: string): {
  metadata: ProjectMetadata;
  content: string;
} {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      ...data,
      slug: realSlug,
    } as ProjectMetadata,
    content,
  };
}

export function getAllProjects(): ProjectMetadata[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => {
      const { metadata } = getProjectBySlug(slug);
      return metadata;
    })
    .sort((a, b) => b.year - a.year);

  return projects;
}

export function getFeaturedProjects(): ProjectMetadata[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.featured).slice(0, 3);
}


