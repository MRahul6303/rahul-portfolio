export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string[];
  tags: string[];
  impact_metric: string;
  summary: string;
  cover: string;
  gallery: string[];
  team: string[];
  tools: string[];
  timeline: string;
  links?: {
    prototype?: string;
    live?: string;
    repo?: string;
  };
  featured?: boolean;
}

export interface ProjectMetadata {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  role: string[];
  tags: string[];
  impact_metric: string;
  summary: string;
  cover: string;
  gallery?: string[];
  team: string[];
  tools: string[];
  timeline: string;
  links?: {
    prototype?: string;
    live?: string;
    repo?: string;
  };
  featured?: boolean;
}

export type SortOption = "newest" | "impact" | "length";

