// 'use client'
// import React, { useState, useEffect } from "react";
// import { assets } from "@/assets/assets";
// import Image from "next/image";
// import { ChevronRightIcon } from "lucide-react";

// const HeaderSlider = () => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

//   const sliderData = [
//     {
//       id: 1,
//       title: "Gadgets you'll love. Prices you'll trust.",
//       offer: "Free Shipping on Orders Above $50!",
//       price: "4.90",
//       imgSrc: assets.hero_model_img,
//       bgColor: "bg-green-200",
//     },
//     {
//       id: 2,
//       title: "Next-Level Sound - Crystal Clear Speakers",
//       offer: "Limited Time Offer 20% OFF",
//       price: "9.99",
//       imgSrc: assets.product_img5,
//       bgColor: "bg-orange-200",
//     },
//     {
//       id: 3,
//       title: "Next-Level Security - Crystal Clear Vision",
//       offer: "Hurry! Only Few Left",
//       price: "12.50",
//       imgSrc: assets.product_img6,
//       bgColor: "bg-blue-200",
//     },
//     {
//       id: 4,
//       title: "SmartPen Collection - Stay Connected",
//       offer: "Special Offer 15% Off",
//       price: "15.00",
//       imgSrc: assets.product_img7,
//       bgColor: "bg-purple-200",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderData.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overflow-hidden relative w-full h-full">
//       <div
//         className="flex transition-transform duration-700 ease-in-out h-full"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {sliderData.map((slide) => (
//           <div
//             key={slide.id}
//             className={`relative flex-1 flex flex-col ${slide.bgColor} rounded-2xl min-w-full h-[520px] sm:h-full`}
//           >
//             <div className="p-4 sm:p-6">
//               {/* Offer bar */}
//               <div className="inline-flex items-center gap-2 bg-green-300 text-green-600 pr-3 p-1 rounded-full text-xs sm:text-sm">
//                 <span className="bg-green-600 px-2 py-0.5 rounded-full text-white text-xs">NEWS</span>
//                 {slide.offer}
//                 <ChevronRightIcon className="group-hover:ml-1 transition-all" size={14} />
//               </div>

//               {/* Heading */}
//               <h2 className="text-xl sm:text-3xl leading-[1.2] my-2 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-sm">
//                 {slide.title}
//               </h2>

//               {/* Price */}
//               <div className="text-slate-800 text-sm font-medium mt-2 sm:mt-3">
//                 <p>Starts from</p>
//                 <p className="text-2xl">{currency}{slide.price}</p>
//               </div>

//               {/* Button */}
//               <button className="bg-slate-800 text-white text-sm py-2 px-6 mt-2 sm:mt-3 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition">
//                 LEARN MORE
//               </button>
//             </div>

//             {/* Image */}
//             <div className="flex items-end flex-1 justify-end sm:absolute bottom-0 right-0 md:right-4 w-full sm:max-w-xs h-[200px] sm:h-[240px]">
//               <Image
//                 className="object-contain w-full h-full"
//                 src={slide.imgSrc}
//                 alt={`Slide ${slide.id}`}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Slider Dots */}
//       <div className="flex items-center justify-center gap-2 mt-4">
//         {sliderData.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 w-2 rounded-full cursor-pointer ${
//               currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeaderSlider;

'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const HeaderSlider = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const sliderData = [
    {
      id: 1,
      title: "Gadgets you'll love. Prices you'll trust.",
      offer: "Free Shipping on Orders Above $50!",
      price: "4.90",
      imgSrc: assets.hero_model_img,
      bgColor: "bg-green-200",
    },
    {
      id: 2,
      title: "Next-Level Sound - Crystal Clear Speakers",
      offer: "Limited Time Offer 20% OFF",
      price: "9.99",
      imgSrc: assets.product_img5,
      bgColor: "bg-orange-200",
    },
    {
      id: 3,
      title: "Next-Level Security - Crystal Clear Vision",
      offer: "Hurry! Only Few Left",
      price: "12.50",
      imgSrc: assets.product_img6,
      bgColor: "bg-blue-200",
    },
    {
      id: 4,
      title: "SmartPen Collection - Stay Connected",
      offer: "Special Offer 15% Off",
      price: "15.00",
      imgSrc: assets.product_img7,
      bgColor: "bg-purple-200",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative w-full h-full">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className={`relative flex-1 flex flex-col ${slide.bgColor} rounded-2xl min-w-full h-[520px] sm:h-full`}
          >
            <div className="p-4 sm:p-6">
              {/* Offer bar */}
              <div className="inline-flex items-center gap-2 bg-green-300 text-green-600 pr-3 p-1 rounded-full text-xs sm:text-sm">
                <span className="bg-green-600 px-2 py-0.5 rounded-full text-white text-xs">NEWS</span>
                {slide.offer}
                <ChevronRightIcon className="group-hover:ml-1 transition-all" size={14} />
              </div>

              {/* Heading */}
              <h2 className="text-xl sm:text-3xl leading-[1.2] my-2 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-sm">
                {slide.title}
              </h2>

              {/* Price */}
              <div className="text-slate-800 text-sm font-medium mt-2 sm:mt-3">
                <p>Starts from</p>
                <p className="text-2xl">{currency}{slide.price}</p>
              </div>

              {/* Learn More Button */}
              <Link
                href="/shop"
                className="inline-block bg-slate-800 text-white text-sm py-2 px-6 mt-2 sm:mt-3 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition"
              >
                LEARN MORE
              </Link>
            </div>

            {/* Image */}
            <div className="flex items-end flex-1 justify-end sm:absolute bottom-0 right-0 md:right-4 w-full sm:max-w-xs h-[200px] sm:h-[240px]">
              <Image
                className="object-contain w-full h-full"
                src={slide.imgSrc}
                alt={`Slide ${slide.id}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
