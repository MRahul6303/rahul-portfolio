import { getAllProjects } from "@/lib/mdx";
import { WorkClient } from "./work-client";

export const metadata = {
  title: "Work",
  description:
    "Explore product design case studies focused on growth, usability, and measurable business impact.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return <WorkClient initialProjects={projects} />;
}
