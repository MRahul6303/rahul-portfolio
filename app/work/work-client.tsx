"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { FilterChips } from "@/components/filter-chips";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { ProjectMetadata, SortOption } from "@/types/project";
import { filterProjects, sortProjects, getAllTags } from "@/lib/projects";
import { ArrowUpDown } from "lucide-react";

interface WorkClientProps {
  initialProjects: ProjectMetadata[];
}

export function WorkClient({ initialProjects }: WorkClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const allTags = useMemo(
    () => getAllTags(initialProjects),
    [initialProjects]
  );

  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(
      initialProjects,
      selectedTags,
      searchQuery
    );
    return sortProjects(filtered, sortBy);
  }, [initialProjects, selectedTags, searchQuery, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const cycleSortOrder = () => {
    const sortOrder: SortOption[] = ["newest", "impact", "length"];
    const currentIndex = sortOrder.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOrder.length;
    setSortBy(sortOrder[nextIndex]);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "newest":
        return "Newest";
      case "impact":
        return "Impact";
      case "length":
        return "Length";
      default:
        return "Newest";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Work
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Explore product design case studies focused on growth, usability,
            and measurable business impact.
          </p>
        </motion.div>

        {/* Search Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="max-w-md mx-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search projects..."
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground mb-4">
              {initialProjects.length === 0
                ? "No projects available yet."
                : "No projects match your filters."}
            </p>
            {(selectedTags.length > 0 || searchQuery) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTags([]);
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

