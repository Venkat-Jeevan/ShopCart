import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

// Example category data
const categories = [
  { id: 1, name: "Minutes", img: assets.motorbike }, // local image from assets
  { id: 2, name: "Mobiles & Tablets", img: "https://img.icons8.com/color/96/smartphone-tablet.png" },
  { id: 3, name: "Fashion ▼", img: assets.fashion_image },
  { id: 4, name: "Electronics ▼", img: "https://img.icons8.com/color/96/laptop.png" },
  { id: 5, name: "Home & Furniture ▼", img: "https://img.icons8.com/color/96/armchair.png" },
  { id: 6, name: "TVs & Appliances", img: "https://img.icons8.com/color/96/tv.png" },
  { id: 7, name: "Flight Bookings", img: "https://img.icons8.com/color/96/airplane-take-off.png" },
  { id: 8, name: "Beauty, Food.. ▼", img: "https://img.icons8.com/color/96/teddy-bear.png" },
  { id: 9, name: "Grocery", img: "https://img.icons8.com/color/96/grocery-bag.png" },
];

const CategoryBlocks = () => {
  return (
    <div className="w-full bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between gap-8 overflow-x-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 min-w-[90px]"
          >
            <div className="w-12 h-12 relative mb-2">
              <Image
                src={cat.img}
                alt={cat.name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBlocks;
