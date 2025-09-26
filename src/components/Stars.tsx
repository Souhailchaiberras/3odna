import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  duration: number
}

const Stars = () => {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 100; i++) { // Reduced from 150 to 100 for better performance
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 0.5, // Reduced max size
          opacity: Math.random() * 0.6 + 0.2, // Reduced max opacity
          delay: Math.random() * 4,
          duration: Math.random() * 4 + 3 // Increased duration for smoother motion
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
          animate={{
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.3, 1], // Reduced scale for subtler effect
            boxShadow: [
              '0 0 2px rgba(255, 255, 255, 0.2)',
              '0 0 6px rgba(255, 255, 255, 0.6)',
              '0 0 2px rgba(255, 255, 255, 0.2)'
            ]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: [0.16, 1, 0.3, 1] // Using the same smooth easing
          }}
        />
      ))}

      {/* Shooting stars - reduced count for performance */}
      {[...Array(5)].map((_, i) => ( // Reduced from 8 to 5
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full" // Reduced size
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, 150], // Reduced distance
            y: [0, 150], // Reduced distance
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3, // Increased duration
            repeat: Infinity,
            delay: i * 4 + Math.random() * 6, // Increased delays
            ease: [0.16, 1, 0.3, 1] // Smooth easing
          }}
        />
      ))}

      {/* Large distant stars - reduced count */}
      {[...Array(15)].map((_, i) => ( // Reduced from 20 to 15
        <motion.div
          key={`distant-${i}`}
          className="absolute bg-white/20 rounded-full" // Reduced opacity
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 1.5 + 0.5}px`, // Reduced size
            height: `${Math.random() * 1.5 + 0.5}px` // Reduced size
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2], // Reduced opacity range
            scale: [1, 1.3, 1] // Reduced scale
          }}
          transition={{
            duration: 5 + Math.random() * 3, // Increased duration
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: [0.16, 1, 0.3, 1] // Smooth easing
          }}
        />
      ))}

      {/* Nebula effect - optimized */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-5" // Reduced size and opacity
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
            left: '20%',
            top: '30%'
          }}
          animate={{
            scale: [1, 1.1, 1], // Reduced scale
            opacity: [0.05, 0.1, 0.05] // Reduced opacity
          }}
          transition={{
            duration: 10, // Increased duration
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1] // Smooth easing
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-5" // Reduced size and opacity
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            right: '25%',
            bottom: '20%'
          }}
          animate={{
            scale: [1, 1.2, 1], // Reduced scale
            opacity: [0.05, 0.08, 0.05] // Reduced opacity
          }}
          transition={{
            duration: 12, // Increased duration
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1] // Smooth easing
          }}
        />
      </div>
    </div>
  )
}

export default Stars 