'use client';
import React from "react";
import { FaSearch, FaUserAlt, FaShoppingCart, FaStore, FaEllipsisV } from "react-icons/fa";
import FlipkartLogo from "../assets/flipkart-logo-39907.png"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  return (
    <div className="bg-white shadow-md w-full">
      <div className="mx-12 flex items-center justify-between p-4 space-x-6">
        {/* Logo */}
        <div className="">
          <Image src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" 
            alt="" className="" width={156} height={40} />
        </div>


        {/* Search Bar */}
        <div className="flex-grow ml-8 max-w-md relative">
          <input
            type="text"
            placeholder="Search for products, Brands and More"
            className="w-full pl-12 pr-4 py-2 text-lg rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute h-5 w-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push('/sign-in')}
           className="flex items-center space-x-2.5 text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-2.5 rounded-xl transition-colors duration-200">
            <FaUserAlt />
            <span>Login</span>
          </button>

          <button className="flex items-center space-x-2.5 text-gray-700 px-3 py-2.5">
            <FaShoppingCart />
            <span>Cart</span>
          </button>

          <button className="flex items-center space-x-2.5 text-gray-700 px-3 py-2.5">
            <FaStore />
            <span>Become a Seller</span>
          </button>
        </div>

        {/* Last Button */}
        <button className="text-gray-700 ml-auto">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
}
