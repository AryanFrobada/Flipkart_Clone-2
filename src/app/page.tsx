import React from "react";
import Navbar from "../components/navbar"; // Adjust the import path as needed
import Categories from "../components/Categories"// Adjust the import path as needed
import Banners from "../components/Banners";

export default function HomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Navbar />
      <Categories />
      <Banners />
    </div>
  );
}
