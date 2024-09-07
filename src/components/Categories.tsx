"use client"

import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchCategoryImageBySlug } from "../services/operations/productAPI";  // Import your API functions
import { useRouter } from "next/navigation";

export default function CategoriesWithImages() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadCategoriesWithImages = async () => {
      try {
        // Fetch categories
        const categoryNames = await fetchAllCategories();
        const res = categoryNames.data;
        // console.log("printing category names: ", res);

        // Fetch images for each category
        const categoriesWithImages = await Promise.all(res.map(async (category: any) => {
          const imageUrl = await fetchCategoryImageBySlug(category.slug);
          return { name: category.name, slug: category.slug, imageUrl };
        }));

        console.log("Printing category images response: ", categoriesWithImages);

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error("Error loading categories with images:", error);
      }
    };

    loadCategoriesWithImages();
  }, []);

  return (
    <div className="bg-white py-4 mx-auto w-[95vw] mt-5">
      <div className="mx-12 flex overflow-x-auto space-x-4 py-2 px-4 scrollbar-hide">
        {categories.length > 0 ? categories.map((category, index) => (
          <div onClick={() => {
              const cleanCategory = category.slug.replace(/[{}]/g, ""); // Removes { and } if present
              router.push(`/category/${cleanCategory}`);
          }} key={index} className="flex-shrink-0 bg-white p-2 text-center cursor-pointer">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-28 h-28 object-cover mx-auto mb-2 rounded-full"
            />
            <span className="text-gray-800 text-md font-bold">{category.name}</span>
          </div>
        )) : (
          <div className="flex w-full justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
