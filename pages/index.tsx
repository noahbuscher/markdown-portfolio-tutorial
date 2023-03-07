import React from "react";
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";
import Grid from "../layouts/Grid";
import type { Project } from "../layouts/Project";

const PROJECTS_DIR = "_projects";

export async function getStaticProps() {
  const projectsDir = path.join(process.cwd(), PROJECTS_DIR);
  const files = await fs.readdir(projectsDir);

  const postPaths = files.filter((file) => {
    const ext = path.extname(file);
    return ext === ".md";
  });

  const projects = await Promise.all(
    postPaths.map(async (file: string) => {
      const contents = await fs.readFile(path.join(projectsDir, file), "utf8");
      const parsed = matter(contents);

      const project = {
        content: parsed.content,
        meta: parsed.data,
      };

      return project;
    })
  );

  const sortedProjects = projects.sort((a, b) =>
    dayjs(a.meta.date).isAfter(dayjs(b.meta.date)) ? -1 : 1
  );

  return {
    props: {
      projects: sortedProjects,
    },
  };
}

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <main className="mx-10 sm:mx-0 my-10">
      <Grid projects={projects} />
    </main>
  );
}
