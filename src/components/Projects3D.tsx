import { motion } from 'framer-motion'
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import DemoComputer from './DemoComputer'
import { myProjects } from '../data/projects'

export default function Projects3D() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const currentProject = myProjects[selectedProjectIndex]

  const handleNavigation = (direction: 'previous' | 'next') => {
    setSelectedProjectIndex(prevIndex => {
      let result
      if (direction === 'previous') {
        result = prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1
      } else {
        result = prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1
      }
      return result
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-30px", amount: 0.1 }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold hologram-text mb-4">
            Projets en Vedette
          </h2>
          <p className="text-xl text-foreground/70 font-inter">
            Découvrez mes réalisations les plus récentes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 mt-12 w-full">
          {/* Project Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200"
          >
            {/* Project Image */}
            <div className="absolute top-0 right-0">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl"></div>
            </div>

            {/* Project Logo */}
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg z-10"
              style={currentProject.logoStyle}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">P</span>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>

            {/* Tech Stack and Link */}
            <div className="flex items-center justify-between flex-wrap gap-5 z-10">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{tag.name.charAt(0)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 cursor-pointer text-white-600"
              >
                <p>Voir le projet</p>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-7 z-10">
              <button
                className="arrow-btn"
                onClick={() => handleNavigation('previous')}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                className="arrow-btn"
                onClick={() => handleNavigation('next')}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* 3D Computer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full"
          >
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />

              <Center>
                <Suspense fallback={null}>
                  <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>

              <OrbitControls
                maxPolarAngle={Math.PI / 2}
                enableZoom={false}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}