"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { BlurIn, BoxReveal } from '../3d/reveal-animations'
import AnimatedBackground from '../3d/animated-background'

const Skills3D = () => {
  return (
    <section id="skills" className="w-full h-screen md:h-[150dvh] relative overflow-hidden">
      <div className="h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-4 pt-20" // Reduced margin and added padding
        >
          <BoxReveal width="100%">
            <h2 className="bg-clip-text text-4xl text-center text-transparent md:text-7xl font-orbitron font-bold bg-gradient-to-b from-white/80 to-white/20">
              SKILLS
            </h2>
          </BoxReveal>
          <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-neutral-300">
            (hint: press a key)
          </p>
        </motion.div>
        
        {/* The REAL 3D Spline keyboard - Give it more space */}
        <div className="flex-1 min-h-[60vh] relative"> {/* Added wrapper with flex-1 */}
          <AnimatedBackground />
        </div>
      </div>
    </section>
  )
}

export default Skills3D