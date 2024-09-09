'use client'
import React from "react";
import Categories from "../components/Categories"// Adjust the import path as needed
import Banners from "../components/Banners";
import ProductCardSection from "../components/ProductCardSection";
import ImageGrid from "../components/ImageGrid";
import { useSession } from "next-auth/react";


export default function HomePage() {
  const {data: session} = useSession();

  if (session) {
    // The user is logged in, and you can access the user details here
    const userId = session.user.id; // Get the user's ID (this could be Google ID or DB ID depending on your configuration)
    console.log("Logged in user ID: ", userId);

    // Use this user ID for performing specific user operations (like fetching their cart)
  }
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
