import React from "react";
import Link from "next/link";
import * as ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";

const Img = ({ ...props }: any) => (
  <img className="rounded-md max-w-screen-lg mx-auto w-full" {...props} />
);

const Text = ({ children, node }: { children: React.ReactNode; node: any }) => {
  if (node.children[0].tagName === "img") {
    const image: any = node.children[0];
    return <Img src={image.properties.src} />;
  }

  return (
    <p className="flex-1 flex-grow w-full text-sm leading-7 max-w-screen-md mx-auto">
      {children}
    </p>
  );
};

const Anchor = ({ children, href }: any) => (
  <Link href={href} className="inline underline">
    {children}
  </Link>
);

export const renderMarkdownToHTML = (markup: string) => {
  return ReactDOMServer.renderToStaticMarkup(
    <ReactMarkdown
      components={{
        p: Text,
        img: Img,
        a: Anchor,
      }}
    >
      {markup.trim()!}
    </ReactMarkdown>
  );
};
