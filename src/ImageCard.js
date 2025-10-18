import React from "react";
import "./index.css";

export default function ImageCard({ image, isSelected, onSelect }) {
  const handleDownload = () => {
    fetch(image.links.download_location + `?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
    window.open(image.urls.full, "_blank");
  };

  return (
    <div className={`image-card ${isSelected ? "selected" : ""}`}
     onClick={onSelect}>
      <img src={image.urls.small} alt={image.alt_description || "Unsplash"} />
      {isSelected && (
        <button className="download-btn" onClick={handleDownload}>
          ⬇️ Download
        </button>
      )}
    </div>
  );
}