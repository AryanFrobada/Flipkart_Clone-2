'use client';
import Image from 'next/image';

export default function ImageGrid() {
  const images = [
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/a6d0f473b7056f96.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/b47ff58bcbd7e025.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/d5f388ae842ed200.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/27644891b5a7b6bd.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/706ffe302ef96052.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ba72d2e3a9df48c.jpg?q=20",
  ];

  return (
    <div className="my-12 px-8 bg-white py-2 w-[95vw] max-w-screen-xl mx-auto">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div
            key={index} // Unique key for each image
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={src}
              alt={`Card Image ${index + 1}`}
              width={520}
              height={280}
              className="rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
