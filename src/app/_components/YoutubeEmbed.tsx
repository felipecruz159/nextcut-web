// components/YouTubeEmbed.tsx
import React from "react";

type YouTubeEmbedProps = {
  src: string;
  title: string;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ src, title }) => (
  <div className={"container-fluid"}>
    <iframe
      width="560"
      height="315"
      className="p-1"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);

export default YouTubeEmbed;
