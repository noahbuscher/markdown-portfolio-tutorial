import React from "react";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../layouts/Project";

const Grid = ({ projects }: { projects: Project[] }) => (
  <div className="flex flex-col gap-12 max-w-screen-md mx-auto">
    <h2 className="text-black font-bold text-lg">Projects</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {projects.map(({ meta }) => (
        <ProjectCard
          key={meta.slug}
          title={meta.title}
          description={meta.description}
          slug={meta.slug}
          photo={meta.photo}
        />
      ))}
    </div>
  </div>
);

export default Grid;
