import { motion } from 'framer-motion'
import { useState } from 'react'

function FloatingCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative perspective-container"
    >
      <div 
        className={`glass rounded-lg p-8 transition-all duration-0 ${
          hovered ? 'neon-glow' : 'neon-glow-subtle'
        } rotate-3d`}
        style={{
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative z-10 text-center">
          <div className="text-6xl font-orbitron font-black hologram-text mb-2">
            SC
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />
          <div className="text-2xl text-primary font-inter">
            Portfolio Numérique
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: 0,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero3D() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.98 }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <FloatingCard />
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold hologram-text mb-4">
            Souhail Chaiberras
          </h1>
          <p className="text-xl md:text-2xl text-primary font-inter mb-2">
            Développeur Backend 
          </p>
          <p className="text-lg md:text-xl text-accent font-inter">
            Passionné DevOps
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-foreground/80 font-inter mb-6">
            Bienvenue dans mon univers numérique
          </p>
          
          {/* Resume Button */}
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1G8JSJDAey1VGlsFaUcjjq4CeIt7Ht2sj"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-8 py-3 rounded-lg neon-glow-subtle hover:neon-glow transition-all duration-300 mb-6 inline-block"
          >
            <span className="text-primary font-inter font-semibold">
              📄 Télécharger Mon CV
            </span>
          </motion.a>
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-6">
            <motion.a
              href="https://www.linkedin.com/in/chaiberrassouhail12/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-3 rounded-full neon-glow-subtle hover:neon-glow transition-all duration-300"
            >
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            
            <motion.a
              href="https://github.com/Souhailchaiberras"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-3 rounded-full neon-glow-subtle hover:neon-glow transition-all duration-300"
            >
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
          </div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center mx-auto mt-8"
          >
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}