import React from "react";

export const YoutubeEmbed = ({ url }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <iframe
      width="853"
      height="480"
      src={url}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    />
  </div>
);

export const getEmbeddedYoutubeUrl = (url) => { 
    const splitted = url.split("watch?v=");
    const splitted2 = url.split("youtu.be/");
    if (splitted.length < 2 && splitted2.length < 2) {
        return null;
      }
    const videoId = splitted.length > 1 ? splitted[1].substring(0, 11) : splitted2[1].substring(0, 11);
    return `https://www.youtube.com/embed/${videoId}`;

}