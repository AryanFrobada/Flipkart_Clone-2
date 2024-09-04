import React from "react";
import Categories from "../components/Categories"// Adjust the import path as needed
import Banners from "../components/Banners";
import ProductCardSection from "../components/ProductCardSection";
import ImageGrid from "../components/ImageGrid";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Categories />
      <Banners />
      <ProductCardSection />
      <ImageGrid />
      <Footer />
    </div>
  );
}
