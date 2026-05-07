'use client'
import React, { useEffect, useRef } from 'react'
import Title from './Title'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import toast, { Toaster } from 'react-hot-toast'

gsap.registerPlugin(ScrollTrigger)

const Newsletter = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Animate input
      gsap.from(inputRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle button click
  const handleSubscribe = () => {
    if (!inputRef.current?.value.trim()) {
      toast.error('Please enter your email!')
    } else {
      toast.success('✅ Thanks for joining GoCart!')
      inputRef.current.value = '' // clear input
    }
  }

  return (
    <div ref={sectionRef} className="flex flex-col items-center mx-4 my-36 -mt-10">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div ref={titleRef}>
        <Title
          title="Join Newsletter"
          description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
          visibleButton={false}
        />
      </div>

      <div className="flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200">
        <input
          ref={inputRef}
          className="flex-1 pl-4 outline-none bg-transparent text-sm sm:text-base"
          type="email"
          placeholder="Enter your email address"
        />
        <button
          onClick={handleSubscribe}
          className="font-medium bg-green-500 text-white 
                     px-4 py-2 sm:px-7 sm:py-3 
                     rounded-full transition hover:bg-green-600 
                     text-sm sm:text-base"
        >
          Get Updates
        </button>
      </div>
    </div>
  )
}

export default Newsletter
