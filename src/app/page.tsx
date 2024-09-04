import React from "react";
import Navbar from "../components/navbar"; // Adjust the import path as needed
import Categories from "../components/Categories"// Adjust the import path as needed
import Banners from "../components/Banners";
import ProductCardSection from "../components/ProductCardSection";
import ImageGrid from "../components/ImageGrid";

export default function HomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Navbar />
      <Categories />
      <Banners />
      <ProductCardSection />
      <ImageGrid />
    </div>
  );
}
