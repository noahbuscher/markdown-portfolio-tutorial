import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  title,
  description,
  slug,
  photo,
}: {
  title: string;
  description: string;
  slug: string;
  photo: string;
}) => (
  <Link href={`/project/${slug}`}>
    <div className="flex-1 flex flex-col gap-2">
      <Image
        src={photo}
        alt={title}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-full aspect-square object-cover"
        priority
      />
      <h3 className="text-black font-bold text-xs">{title}</h3>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  </Link>
);

export default ProjectCard;
