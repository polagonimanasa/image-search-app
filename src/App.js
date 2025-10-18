import React, { useState, useEffect } from "react";
import ImageGrid from "./ImageGrid";
import "./index.css";

const accessKey = "WIrrUspHTvOvvs21cj8iAeA8ZVc709koXx07NyE6BbM"; 

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images
  useEffect(() => {
    if (!searchTerm) return;
    fetchImages();
    // eslint-disable-next-line
  }, [page, searchTerm]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${accessKey}&per_page=15`
      );
      const data = await response.json();
      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearchTerm(query);
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading) setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="app-container">
      <h1 className="title">Image Search App</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search high-quality images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ImageGrid images={images}
       selectedImage={selectedImage}
       setSelectedImage={setSelectedImage}
      />

      {loading && <p className="loading">Loading more images...</p>}
    </div>
  );
}