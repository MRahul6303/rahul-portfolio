import { ProjectMetadata, SortOption } from "@/types/project";

export function filterProjects(
  projects: ProjectMetadata[],
  selectedTags: string[],
  searchQuery: string
): ProjectMetadata[] {
  return projects.filter((project) => {
    // Filter by tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesTags && matchesSearch;
  });
}

export function sortProjects(
  projects: ProjectMetadata[],
  sortBy: SortOption
): ProjectMetadata[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => b.year - a.year);
    case "impact":
      // Extract numeric value from impact_metric for sorting
      return sorted.sort((a, b) => {
        const aValue = parseInt(a.impact_metric.match(/\d+/)?.[0] || "0");
        const bValue = parseInt(b.impact_metric.match(/\d+/)?.[0] || "0");
        return bValue - aValue;
      });
    case "length":
      return sorted.sort((a, b) => a.title.length - b.title.length);
    default:
      return sorted;
  }
}

export function getAllTags(projects: ProjectMetadata[]): string[] {
  const tagsSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}


