import React from "react";
import Image from "next/image";

export type ProjectMeta = {
  title: string;
  description: string;
  slug: string;
  date: string;
  photo: string;
};

export type Project = {
  meta: ProjectMeta;
  content: string;
};

const Project = ({
  project,
  renderedProjectContent,
}: {
  project: Project;
  renderedProjectContent: string;
}) => (
  <div className="flex flex-col gap-8 max-w-screen-md mx-auto">
    <h2 className="text-black font-bold text-lg">{project.meta.title}</h2>
    <h3 className="text-gray-500 text-md">{project.meta.description}</h3>
    <Image
      src={project.meta.photo}
      alt={project.meta.title}
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-full"
      priority
    />
    <div
      className="flex flex-col gap-8"
      dangerouslySetInnerHTML={{ __html: renderedProjectContent }}
    />
  </div>
);

export default Project;
