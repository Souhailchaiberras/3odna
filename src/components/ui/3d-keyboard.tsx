import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

interface Key3D {
  id: string
  label: string
  color: string
  x: number
  y: number
  z: number
  size?: 'normal' | 'small'
}

const mainKeys: Key3D[] = [
  // Row 1 (Top)
  { id: 'vue', label: '✓', color: '#4FC08D', x: 0, y: 0, z: 0 },
  { id: 'settings', label: '⚙️', color: '#8B5CF6', x: 1, y: 0, z: 0 },
  { id: 'express', label: 'E', color: '#000000', x: 2, y: 0, z: 0 },
  { id: 'node', label: '🍃', color: '#339933', x: 3, y: 0, z: 0 },
  { id: 'wp', label: 'W', color: '#21759B', x: 4, y: 0, z: 0 },
  
  // Row 2 (Middle)
  { id: 'js', label: 'JS', color: '#F7DF1E', x: 0, y: 1, z: 1 },
  { id: 'ts', label: 'TS', color: '#3178C6', x: 1, y: 1, z: 1 },
  { id: 'express2', label: 'ex', color: '#404040', x: 2, y: 1, z: 1 },
  { id: 'laravel', label: '💧', color: '#FF2D20', x: 3, y: 1, z: 1 },
  { id: 'vite', label: 'V', color: '#646CFF', x: 4, y: 1, z: 1 },
  
  // Row 3 (Bottom)
  { id: 'js2', label: 'JS', color: '#339933', x: 0, y: 2, z: 2 },
  { id: 'framework', label: '1', color: '#FF0000', x: 1, y: 2, z: 2 },
  { id: 'aws', label: 'aws', color: '#FF9900', x: 2, y: 2, z: 2 },
  { id: 'empty1', label: '', color: '#404040', x: 3, y: 2, z: 2 },
  { id: 'empty2', label: '', color: '#404040', x: 4, y: 2, z: 2 },
]

const secondaryKeys: Key3D[] = [
  // Row 1 (Top)
  { id: 'nginx', label: 'N', color: '#009639', x: 0, y: 0, z: 0, size: 'small' },
  { id: 'github', label: '👻', color: '#404040', x: 1, y: 0, z: 0, size: 'small' },
  { id: 'cloud', label: '☁️', color: '#60A5FA', x: 2, y: 0, z: 0, size: 'small' },
  { id: 'node2', label: 'N', color: '#339933', x: 3, y: 0, z: 0, size: 'small' },
  { id: 'play', label: '▶', color: '#8B4513', x: 4, y: 0, z: 0, size: 'small' },
  
  // Row 2 (Bottom)
  { id: 'php', label: 'P', color: '#777BB4', x: 0, y: 1, z: 1, size: 'small' },
  { id: 'linux', label: '👤', color: '#404040', x: 1, y: 1, z: 1, size: 'small' },
  { id: 'k8s', label: '❄️', color: '#326CE5', x: 2, y: 1, z: 1, size: 'small' },
  { id: 'empty3', label: '', color: '#404040', x: 3, y: 1, z: 1, size: 'small' },
  { id: 'empty4', label: '', color: '#404040', x: 4, y: 1, z: 1, size: 'small' },
]

function Key3D({ key3d, index }: { key3d: Key3D; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  const isSmall = key3d.size === 'small'
  const keySize = isSmall ? 12 : 16 // Smaller keys for secondary keyboard
  
  // Skip empty keys
  if (key3d.label === '') {
    return <div className={`w-${keySize} h-${keySize}`} />
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotateX: 90 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        x: key3d.x * (isSmall ? 60 : 80),
        y: key3d.y * (isSmall ? 60 : 80),
        z: key3d.z * 15
      }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ 
        scale: 1.05,
        z: key3d.z * 15 + 20,
        rotateY: 3,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="absolute"
      style={{
        transformStyle: 'preserve-3d',
        transform: `translate3d(${key3d.x * (isSmall ? 60 : 80)}px, ${key3d.y * (isSmall ? 60 : 80)}px, ${key3d.z * 15}px)`
      }}
    >
      {/* 3D Key with proper depth */}
      <div 
        className={`relative ${isSmall ? 'w-12 h-12' : 'w-16 h-16'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Key face (top) */}
        <motion.div 
          className={`absolute inset-0 rounded-lg flex items-center justify-center text-white font-bold ${isSmall ? 'text-xs' : 'text-sm'}`}
          style={{ 
            backgroundColor: key3d.color,
            transform: 'translateZ(8px)',
            boxShadow: isHovered 
              ? `0 8px 25px ${key3d.color}40, 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)`
              : `0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 8px 25px ${key3d.color}40, 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)`
              : `0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ 
              color: key3d.id === 'js' ? '#000000' : '#FFFFFF',
              fontWeight: key3d.id === 'js' ? 'bold' : 'normal'
            }}
          >
            {key3d.label}
          </motion.div>
        </motion.div>
        
        {/* Key edges for 3D effect */}
        <div 
          className={`absolute top-0 left-0 right-0 ${isSmall ? 'h-2' : 'h-2'} rounded-t-lg`}
          style={{
            backgroundColor: key3d.color,
            transform: 'translateZ(8px) rotateX(-90deg)',
            transformOrigin: 'bottom',
            filter: 'brightness(1.3)',
            background: `linear-gradient(to bottom, ${key3d.color}, ${key3d.color}cc)`
          }}
        />
        <div 
          className={`absolute top-0 left-0 bottom-0 ${isSmall ? 'w-2' : 'w-2'} rounded-l-lg`}
          style={{
            backgroundColor: key3d.color,
            transform: 'translateZ(8px) rotateY(90deg)',
            transformOrigin: 'right',
            filter: 'brightness(0.9)',
            background: `linear-gradient(to right, ${key3d.color}dd, ${key3d.color})`
          }}
        />
        <div 
          className={`absolute top-0 right-0 bottom-0 ${isSmall ? 'w-2' : 'w-2'} rounded-r-lg`}
          style={{
            backgroundColor: key3d.color,
            transform: 'translateZ(8px) rotateY(-90deg)',
            transformOrigin: 'left',
            filter: 'brightness(0.6)',
            background: `linear-gradient(to left, ${key3d.color}66, ${key3d.color})`
          }}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 ${isSmall ? 'h-2' : 'h-2'} rounded-b-lg`}
          style={{
            backgroundColor: key3d.color,
            transform: 'translateZ(8px) rotateX(90deg)',
            transformOrigin: 'top',
            filter: 'brightness(0.4)',
            background: `linear-gradient(to top, ${key3d.color}33, ${key3d.color})`
          }}
        />
        
        {/* Key shadow */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            transform: 'translateZ(-2px) scale(1.05)',
            filter: 'blur(4px)'
          }}
        />
      </div>
    </motion.div>
  )
}

export function Keyboard3D() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* Main 3D Keyboard */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transform: 'rotateX(25deg) rotateY(-20deg)',
            transformStyle: 'preserve-3d',
            width: '400px',
            height: '240px'
          }}
        >
          {/* Main keyboard base */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              width: '400px',
              height: '240px',
              backgroundColor: '#1a1a1a',
              transform: 'translateZ(-15px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.1)',
              border: '2px solid #333',
              background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)'
            }}
          />
          
          {/* Main keyboard base edges */}
          <div 
            className="absolute top-0 left-0 right-0 h-2 rounded-t-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-15px) rotateX(-90deg)',
              transformOrigin: 'bottom',
              background: 'linear-gradient(to bottom, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 left-0 bottom-0 w-2 rounded-l-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-15px) rotateY(90deg)',
              transformOrigin: 'right',
              background: 'linear-gradient(to right, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 right-0 bottom-0 w-2 rounded-r-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-15px) rotateY(-90deg)',
              transformOrigin: 'left',
              background: 'linear-gradient(to left, #2a2a2a, #1a1a1a)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-15px) rotateX(90deg)',
              transformOrigin: 'top',
              background: 'linear-gradient(to top, #1a1a1a, #2a2a2a)'
            }}
          />
          
          {/* Main keys */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {mainKeys.map((key3d, index) => (
              <Key3D key={key3d.id} key3d={key3d} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Secondary 3D Keyboard */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          style={{
            transform: 'rotateX(25deg) rotateY(-20deg)',
            transformStyle: 'preserve-3d',
            width: '300px',
            height: '120px'
          }}
        >
          {/* Secondary keyboard base */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              width: '300px',
              height: '120px',
              backgroundColor: '#1a1a1a',
              transform: 'translateZ(-10px)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)',
              border: '2px solid #333',
              background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)'
            }}
          />
          
          {/* Secondary keyboard base edges */}
          <div 
            className="absolute top-0 left-0 right-0 h-2 rounded-t-lg"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-10px) rotateX(-90deg)',
              transformOrigin: 'bottom',
              background: 'linear-gradient(to bottom, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 left-0 bottom-0 w-2 rounded-l-lg"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-10px) rotateY(90deg)',
              transformOrigin: 'right',
              background: 'linear-gradient(to right, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 right-0 bottom-0 w-2 rounded-r-lg"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-10px) rotateY(-90deg)',
              transformOrigin: 'left',
              background: 'linear-gradient(to left, #2a2a2a, #1a1a1a)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-2 rounded-b-lg"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-10px) rotateX(90deg)',
              transformOrigin: 'top',
              background: 'linear-gradient(to top, #1a1a1a, #2a2a2a)'
            }}
          />
          
          {/* Secondary keys */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {secondaryKeys.map((key3d, index) => (
              <Key3D key={key3d.id} key3d={key3d} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Floating JavaScript text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute -left-40 top-1/2 transform -translate-y-1/2"
          style={{
            transform: 'rotate(-15deg) translateY(-50%)',
            zIndex: 10
          }}
        >
          <h3 className="text-5xl font-bold text-white mb-2" style={{ 
            textShadow: '0 0 20px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.3)'
          }}>
            JavaScript
          </h3>
          <p className="text-sm text-white/80 font-medium" style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            yeeting code into the DOM since '95, no cap!
          </p>
        </motion.div>
      </div>
    </div>
  )
} 