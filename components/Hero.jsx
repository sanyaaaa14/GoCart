// 'use client'
// import { assets } from '@/assets/assets'
// import { ArrowRightIcon } from 'lucide-react'
// import Image from 'next/image'
// import React, { useEffect, useRef } from 'react'
// import CategoriesMarquee from './CategoriesMarquee'
// import gsap from 'gsap'
// import HeaderSlider from './HeaderSlider'

// const Hero = () => {
//   const containerRef = useRef(null)
//   const cardsRef = useRef([])

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(containerRef.current, {
//         opacity: 0,
//         y: 20,
//         duration: 1,
//         ease: 'power3.out',
//       })

//       gsap.from(cardsRef.current, {
//         opacity: 0,
//         y: 20,
//         duration: 0.6,
//         stagger: 0.2,
//         ease: 'power2.out',
//       })
//     })

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div className='mx-4 my-6 overflow-hidden' ref={containerRef}>
//       {/* Main container */}
//       <div className='flex flex-col xl:flex-row gap-4 max-w-6xl mx-auto'>

//         {/* Left Hero Slider */}
//         <div className='flex-1 h-[420px] sm:h-[480px] md:h-[450px] xl:h-auto'>
//           <HeaderSlider />
//         </div>

//         {/* Right Side Cards */}
//         <div className='flex flex-col md:flex-row xl:flex-col gap-4 w-full xl:max-w-xs text-sm text-slate-600'>
//           {[assets.hero_product_img1, assets.hero_product_img2].map((img, i) => (
//             <div
//               key={i}
//               ref={(el) => (cardsRef.current[i] = el)}
//               className={`flex-1 flex items-center justify-between min-h-[200px] sm:min-h-[150px] sm:max-h-[140px] p-4 rounded-2xl group ${
//                 i === 0 ? 'bg-orange-200' : 'bg-blue-200'
//               }`}
//             >
//               <div>
//                 <p
//                   className={`text-lg font-medium bg-gradient-to-r from-slate-800 ${
//                     i === 0 ? 'to-[#FFAD51]' : 'to-[#78B2FF]'
//                   } bg-clip-text text-transparent max-w-[120px]`}
//                 >
//                   {i === 0 ? 'Best products' : '20% discounts'}
//                 </p>
//                 <p className='flex items-center gap-1 mt-1'>
//                   View more{' '}
//                   <ArrowRightIcon className='group-hover:ml-1 transition-all' size={14} />
//                 </p>
//               </div>
//               <Image
//                 className='w-24 h-auto object-contain'
//                 src={img}
//                 alt='product'
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Categories Marquee */}
//       <div className='mt-3'>
//         <CategoriesMarquee />
//       </div>
//     </div>
//   )
// }

// export default Hero

'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import gsap from 'gsap'
import HeaderSlider from './HeaderSlider'

const Hero = () => {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='mx-4 my-6 overflow-hidden' ref={containerRef}>
      {/* Main container */}
      <div className='flex flex-col xl:flex-row gap-4 max-w-6xl mx-auto'>

        {/* Left Hero Slider */}
        <div className='flex-1 h-[420px] sm:h-[480px] md:h-[450px] xl:h-auto'>
          <HeaderSlider />
        </div>

        {/* Right Side Cards */}
        <div className='flex flex-col md:flex-row xl:flex-col gap-4 w-full xl:max-w-xs text-sm text-slate-600'>
          {[assets.hero_product_img1, assets.hero_product_img2].map((img, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`flex-1 flex items-center justify-between min-h-[200px] sm:min-h-[150px] sm:max-h-[140px] p-4 rounded-2xl group ${
                i === 0 ? 'bg-orange-200' : 'bg-blue-200'
              }`}
            >
              <div>
                <p
                  className={`text-lg font-medium bg-gradient-to-r from-slate-800 ${
                    i === 0 ? 'to-[#FFAD51]' : 'to-[#78B2FF]'
                  } bg-clip-text text-transparent max-w-[120px]`}
                >
                  {i === 0 ? 'Best products' : '20% discounts'}
                </p>
                <p className="mt-1">
                  <Link href="/shop" className="flex items-center gap-1 group">
                    View more
                    <ArrowRightIcon
                      className="group-hover:ml-1 transition-all"
                      size={14}
                    />
                  </Link>
                </p>
              </div>
              <Image
                className='w-24 h-auto object-contain'
                src={img}
                alt='product'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Categories Marquee */}
      <div className='mt-3'>
        <CategoriesMarquee />
      </div>
    </div>
  )
}

export default Hero
