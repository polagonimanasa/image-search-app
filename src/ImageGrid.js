import React from "react";
import ImageCard from "./ImageCard";
import "./index.css";

export default function ImageGrid({ images, selectedImage, setSelectedImage }) {
  return (
    <div className="image-grid">
      {images.map((img) => (
        <ImageCard 
         key={img.id} 
         image={img}
         isSelected={selectedImage?.id === img.id}
         onSelect={() => setSelectedImage(img)}
        />
      ))}
    </div>
  );
}