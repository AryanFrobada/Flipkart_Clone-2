// "use client";

// import React, { useEffect, useState } from "react";

// // Sample banners
// const banners = [
//   "https://via.placeholder.com/1600x600.jpg?text=Banner+1",
//   "https://via.placeholder.com/1600x600.jpg?text=Banner+2",
//   "https://via.placeholder.com/1600x600.jpg?text=Banner+3",
//   "https://via.placeholder.com/1600x600.jpg?text=Banner+4",
//   "https://via.placeholder.com/1600x600.jpg?text=Banner+5",
// ];

// export default function Banners() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const totalBanners = banners.length;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
//     }, 3000); // Change banner every 3 seconds

//     return () => clearInterval(interval);
//   }, [totalBanners]);

//   const goToNextBanner = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
//   };

//   const goToPreviousBanner = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + totalBanners) % totalBanners);
//   };

//   return (
//     <div className="relative w-[95vw] mx-auto overflow-hidden my-5">
//       <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {banners.map((banner, index) => (
//           <div key={index} className="flex-shrink-0 w-screen h-auto">
//             <img
//               src={banner}
//               alt={`Banner ${index + 1}`}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Controls */}
//       <button
//         onClick={goToPreviousBanner}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full z-10"
//       >
//         &lt;
//       </button>
//       <button
//         onClick={goToNextBanner}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full z-10"
//       >
//         &gt;
//       </button>
//     </div>
//   );
// }


"use client"
import React, { useEffect, useState } from "react";

const Banners = () => {
  // List of banner image URLs
  const banners = [
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/2152c9d0afe3352d.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/614c92ccb25152fe.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/e7554fcdb3042316.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/50ba00cc44d3fa70.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/2152c9d0afe3352d.jpg?q=20",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next banner
  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Function to handle previous banner
  const prevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Automatically change banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextBanner, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-[95vw] mx-auto my-5">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={banner}
              alt={`Banner ${index}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevBanner}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9664;
      </button>
      <button
        onClick={nextBanner}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Banners;
