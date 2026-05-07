// 'use client';

// import React, { useMemo } from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '@/components/Navbar';
// import Link from 'next/link';

// const AboutPage = () => {
//   // Generate floating background shapes
//   const shapes = useMemo(() => {
//     return Array.from({ length: 10 }).map(() => ({
//       size: 50 + Math.random() * 100,
//       top: Math.random() * 100,
//       left: Math.random() * 100,
//       delay: Math.random() * 5,
//     }));
//   }, []);

//   return (
//     <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0f1f] via-[#101735] to-[#0a0f1f] overflow-hidden text-white">
//       <Navbar bg="bg-transparent" />

//       {/* Floating shapes */}
//       <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//         {shapes.map((shape, index) => (
//           <motion.div
//             key={index}
//             className="absolute bg-purple-600 rounded-full opacity-20 blur-3xl"
//             style={{
//               width: `${shape.size}px`,
//               height: `${shape.size}px`,
//               top: `${shape.top}%`,
//               left: `${shape.left}%`,
//             }}
//             animate={{ y: [0, 30, 0], x: [0, 30, 0] }}
//             transition={{
//               duration: 12 + Math.random() * 8,
//               repeat: Infinity,
//               repeatType: 'mirror',
//               ease: 'easeInOut',
//               delay: shape.delay,
//             }}
//           />
//         ))}
//       </motion.div>

//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-6xl mx-auto px-6 py-28 text-center relative z-10"
//       >
//         <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//           About <span className="text-pink-400">GoCart</span>
//         </h1>
//         <p className="mt-6 text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
//           Your one-stop e-commerce platform for gadgets, electronics, and more. We make shopping fast, safe, and delightful.
//         </p>
//       </motion.div>

//       {/* Why Choose Us Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20"
//       >
//         {[
//           {
//             title: "Fast & Reliable Delivery",
//             description:
//               "We ensure your products reach you on time with top-notch logistics partners.",
//             color: "from-pink-500 to-purple-500",
//           },
//           {
//             title: "Secure Shopping",
//             description:
//               "Your privacy and security are our top priorities. Shop with confidence.",
//             color: "from-blue-500 to-indigo-500",
//           },
//           {
//             title: "Best Prices",
//             description:
//               "We offer competitive prices on all our products, with regular deals and discounts.",
//             color: "from-green-400 to-teal-500",
//           },
//           {
//             title: "Customer Support",
//             description:
//               "Our support team is available 24/7 to help you with any questions or concerns.",
//             color: "from-yellow-400 to-orange-500",
//           },
//         ].map((item, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
//             className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg cursor-pointer`}
//           >
//             <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
//             <p className="text-gray-100">{item.description}</p>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* CTA Section */}
 
// <motion.div
//   initial={{ opacity: 0, y: 30 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.8 }}
//   className="relative z-10 text-center py-16"
// >
//   <Link href="/shop">
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl"
//     >
//       Explore Products
//     </motion.button>
//   </Link>
// </motion.div>

//     </div>
//   );
// };

// export default AboutPage;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // ✅ use your own footer component
import Link from 'next/link';

const features = [
  {
    title: "Our Mission",
    description:
      "At GoCart, we aim to make online shopping simple, reliable, and accessible for everyone.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Seamless Experience",
    description:
      "From browsing to checkout, we focus on creating a smooth and secure experience for our customers.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // ✅ fixed reliable image
  },
  {
    title: "Community First",
    description:
      "We believe in building a strong community of shoppers and sellers to grow together.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const stats = [
  { number: "1M+", label: "Happy Customers" },
  { number: "50K+", label: "Products Sold" },
  { number: "200+", label: "Global Partners" },
];

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar bg="bg-white shadow-sm" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 py-24 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About GoCart
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            GoCart is redefining e-commerce with speed, trust, and customer
            delight. Learn more about who we are and what drives us.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 text-center gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-6 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 shadow"
            >
              <h2 className="text-4xl font-extrabold text-purple-600">
                {stat.number}
              </h2>
              <p className="text-gray-700 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Clean White with Soft Background */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative bg-gray-50 py-28 overflow-hidden"
>
  {/* Optional subtle background shapes */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply opacity-30 filter blur-3xl -translate-x-1/2"></div>
    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply opacity-30 filter blur-3xl"></div>
  </div>

  <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
    
    {/* Text */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
        Elevate Your Shopping Experience
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-6">
        GoCart brings you the best products with fast delivery and seamless checkout. Join thousands of happy customers today!
      </p>
      <Link href="/shop">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg"
        >
          Explore Products
        </motion.button>
      </Link>
    </div>

    {/* Image */}
    <div className="md:w-1/2">
       <img
        src= "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
        alt="Online shopping illustration"
        className="rounded-2xl shadow-xl w-full object-cover"
      />
    </div>

  </div>
</motion.section>


      {/* ✅ Use your Footer component */}
      <Footer />
    </div>
  );
};

export default AboutPage;
