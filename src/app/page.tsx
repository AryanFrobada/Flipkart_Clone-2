'use client'
import React from "react";
import Categories from "../components/Categories"// Adjust the import path as needed
import Banners from "../components/Banners";
import ProductCardSection from "../components/ProductCardSection";
import ImageGrid from "../components/ImageGrid";


export default function HomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Categories />
      <Banners />
      <ProductCardSection category={'laptops'} />
      <ImageGrid />
      <ProductCardSection category={'sports-accessories'} />
    </div>
  );
}
