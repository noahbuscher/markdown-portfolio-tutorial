import React from "react";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import ProjectLayout from "../../layouts/Project";
import { renderMarkdownToHTML } from "../../utils/markdown";
import type { Project } from "../../layouts/Project";

const PROJECTS_DIR = "_projects";

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const projectsDir = path.join(process.cwd(), PROJECTS_DIR);
  const files = await fs.readdir(projectsDir);

  const projectPaths = files.filter((file) => {
    const ext = path.extname(file);
    return ext === ".md";
  });

  const projects = await Promise.all(
    projectPaths.map(async (file: string) => {
      const contents = await fs.readFile(path.join(projectsDir, file), "utf8");
      const parsed = matter(contents);

      return {
        content: parsed.content,
        meta: parsed.data,
      };
    })
  );

  const project = projects.find((p) => p?.meta?.slug === params.slug);

  const renderedProjectContent = renderMarkdownToHTML(project?.content!);

  return {
    props: {
      project,
      renderedProjectContent,
    },
  };
}

export async function getStaticPaths() {
  const projectsDir = path.join(process.cwd(), PROJECTS_DIR);
  const files = await fs.readdir(projectsDir);

  const projectPaths = files.filter((file) => {
    const ext = path.extname(file);
    return ext === ".md";
  });

  const projects = await Promise.all(
    projectPaths.map(async (file: string) => {
      const contents = await fs.readFile(path.join(projectsDir, file), "utf8");
      const parsed = matter(contents);

      return {
        content: parsed.content,
        meta: parsed.data,
      };
    })
  );

  const paths = projects.map((project) => ({
    params: { slug: project?.meta?.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

const Project = ({
  project,
  renderedProjectContent,
}: {
  project: Project;
  renderedProjectContent: string;
}) => (
  <main className="mx-10 sm:mx-0 my-10">
    <ProjectLayout
      project={project}
      renderedProjectContent={renderedProjectContent}
    />
  </main>
);

export default Project;
