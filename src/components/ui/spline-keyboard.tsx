import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  label: string
  shortDescription: string
  color: string
  icon: string
}

const skills: Skill[] = [
  { name: 'vue', label: 'Vue.js', shortDescription: 'Progressive JavaScript framework', color: '#4FC08D', icon: '✓' },
  { name: 'settings', label: 'Settings', shortDescription: 'Configuration management', color: '#8B5CF6', icon: '⚙️' },
  { name: 'express', label: 'Express', shortDescription: 'Node.js web framework', color: '#000000', icon: 'E' },
  { name: 'node', label: 'Node.js', shortDescription: 'JavaScript runtime', color: '#339933', icon: '🍃' },
  { name: 'wp', label: 'WordPress', shortDescription: 'Content management system', color: '#21759B', icon: 'W' },
  { name: 'js', label: 'JavaScript', shortDescription: 'Programming language', color: '#F7DF1E', icon: 'JS' },
  { name: 'ts', label: 'TypeScript', shortDescription: 'Typed JavaScript', color: '#3178C6', icon: 'TS' },
  { name: 'express2', label: 'Express', shortDescription: 'Backend framework', color: '#404040', icon: 'ex' },
  { name: 'laravel', label: 'Laravel', shortDescription: 'PHP web framework', color: '#FF2D20', icon: '💧' },
  { name: 'vite', label: 'Vite', shortDescription: 'Build tool', color: '#646CFF', icon: 'V' },
  { name: 'js2', label: 'JavaScript', shortDescription: 'Frontend development', color: '#339933', icon: 'JS' },
  { name: 'framework', label: 'Framework', shortDescription: 'Development framework', color: '#FF0000', icon: '1' },
  { name: 'aws', label: 'AWS', shortDescription: 'Cloud services', color: '#FF9900', icon: 'aws' },
  { name: 'nginx', label: 'Nginx', shortDescription: 'Web server', color: '#009639', icon: 'N' },
  { name: 'github', label: 'GitHub', shortDescription: 'Version control', color: '#404040', icon: '👻' },
  { name: 'cloud', label: 'Cloud', shortDescription: 'Cloud computing', color: '#60A5FA', icon: '☁️' },
  { name: 'node2', label: 'Node.js', shortDescription: 'Server-side JavaScript', color: '#339933', icon: 'N' },
  { name: 'play', label: 'Play', shortDescription: 'Development tools', color: '#8B4513', icon: '▶' },
  { name: 'php', label: 'PHP', shortDescription: 'Server-side language', color: '#777BB4', icon: 'P' },
  { name: 'linux', label: 'Linux', shortDescription: 'Operating system', color: '#404040', icon: '👤' },
  { name: 'k8s', label: 'Kubernetes', shortDescription: 'Container orchestration', color: '#326CE5', icon: '❄️' },
]

function InteractiveKey({ skill, index, onHover, onPress }: { 
  skill: Skill; 
  index: number; 
  onHover: (skill: Skill | null) => void;
  onPress: (skill: Skill) => void;
}) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(skill)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(null)
  }

  const handleMouseDown = () => {
    setIsPressed(true)
    onPress(skill)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateX: 90 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        y: isPressed ? 2 : 0
      }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ 
        scale: 1.05,
        z: 20,
        rotateY: 3,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Key */}
      <div className="relative w-16 h-16" style={{ transformStyle: 'preserve-3d' }}>
        {/* Key face (top) */}
        <motion.div 
          className="absolute inset-0 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ 
            backgroundColor: skill.color,
            transform: 'translateZ(8px)',
            boxShadow: isHovered 
              ? `0 8px 25px ${skill.color}40, 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)`
              : `0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 8px 25px ${skill.color}40, 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)`
              : `0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ 
              color: skill.name === 'js' ? '#000000' : '#FFFFFF',
              fontWeight: skill.name === 'js' ? 'bold' : 'normal'
            }}
          >
            {skill.icon}
          </motion.div>
        </motion.div>
        
        {/* Key edges for 3D effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-2 rounded-t-lg"
          style={{
            backgroundColor: skill.color,
            transform: 'translateZ(8px) rotateX(-90deg)',
            transformOrigin: 'bottom',
            filter: 'brightness(1.3)',
            background: `linear-gradient(to bottom, ${skill.color}, ${skill.color}cc)`
          }}
        />
        <div 
          className="absolute top-0 left-0 bottom-0 w-2 rounded-l-lg"
          style={{
            backgroundColor: skill.color,
            transform: 'translateZ(8px) rotateY(90deg)',
            transformOrigin: 'right',
            filter: 'brightness(0.9)',
            background: `linear-gradient(to right, ${skill.color}dd, ${skill.color})`
          }}
        />
        <div 
          className="absolute top-0 right-0 bottom-0 w-2 rounded-r-lg"
          style={{
            backgroundColor: skill.color,
            transform: 'translateZ(8px) rotateY(-90deg)',
            transformOrigin: 'left',
            filter: 'brightness(0.6)',
            background: `linear-gradient(to left, ${skill.color}66, ${skill.color})`
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-2 rounded-b-lg"
          style={{
            backgroundColor: skill.color,
            transform: 'translateZ(8px) rotateX(90deg)',
            transformOrigin: 'top',
            filter: 'brightness(0.4)',
            background: `linear-gradient(to top, ${skill.color}33, ${skill.color})`
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

export function SplineKeyboard() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [pressedSkill, setPressedSkill] = useState<Skill | null>(null)

  const handleHover = (skill: Skill | null) => {
    setSelectedSkill(skill)
  }

  const handlePress = (skill: Skill) => {
    setPressedSkill(skill)
    // Reset after a short delay
    setTimeout(() => setPressedSkill(null), 200)
  }

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
          
          {/* Main keys grid */}
          <div className="grid grid-cols-5 gap-3 relative" style={{ width: '400px', height: '240px', padding: '20px', transform: 'translateZ(5px)' }}>
            {skills.slice(0, 15).map((skill, index) => (
              <InteractiveKey 
                key={skill.name} 
                skill={skill} 
                index={index}
                onHover={handleHover}
                onPress={handlePress}
              />
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
          
          {/* Secondary keys grid */}
          <div className="grid grid-cols-5 gap-2 relative" style={{ width: '300px', height: '120px', padding: '15px', transform: 'translateZ(5px)' }}>
            {skills.slice(15).map((skill, index) => (
              <InteractiveKey 
                key={skill.name} 
                skill={skill} 
                index={index + 15}
                onHover={handleHover}
                onPress={handlePress}
              />
            ))}
          </div>
        </motion.div>

        {/* Skill Info Tooltip */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-50"
          >
            <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
              <p className="text-sm font-medium text-white whitespace-nowrap">
                {selectedSkill.label}
              </p>
              <p className="text-xs text-white/70 mt-1">
                {selectedSkill.shortDescription}
              </p>
            </div>
          </motion.div>
        )}

        {/* Pressed Skill Animation */}
        {pressedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
          >
            <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
              <p className="text-lg font-bold text-white text-center">
                {pressedSkill.label}
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Floating JavaScript text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute -left-48 top-1/2 transform -translate-y-1/2"
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