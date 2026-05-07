'use client'
import React, { useEffect, useRef } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const LatestProducts = () => {
  const displayQuantity = 4
  const products = useSelector((state) => state.product.list)

  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
   
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      })

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
        stagger: 0.2,
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className='px-6 my-30 max-w-6xl mx-auto -mt-10'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title
          title='Latest Products'
          description={`Showing ${
            products.length < displayQuantity ? products.length : displayQuantity
          } of ${products.length} products`}
          href='/shop'
        />
      </motion.div>

      <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className='w-full sm:w-auto'
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default LatestProducts
