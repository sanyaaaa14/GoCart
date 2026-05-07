'use client'
import React, { useEffect, useRef } from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const OurSpecs = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards when section scrolls into view
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className='px-6 my-20 max-w-6xl mx-auto  -mt-10'>
      {/* Title with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title
          visibleButton={false}
          title='Our Specifications'
          description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
        />
      </motion.div>

      {/* Specs Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-20'>
        {ourSpecsData.map((spec, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className='relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group'
            style={{
              backgroundColor: spec.accent + 10,
              borderColor: spec.accent + 30,
            }}
          >
            <h3 className='text-slate-800 font-medium'>{spec.title}</h3>
            <p className='text-sm text-slate-600 mt-3'>{spec.description}</p>
            <div
              className='absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition'
              style={{ backgroundColor: spec.accent }}
            >
              <spec.icon size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurSpecs
