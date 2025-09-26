import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS, Skill, SkillNames } from '@/data/constants'

interface KeyProps {
  color: string
  icon: string
  label: string
  description: string
  onHover: (skill: Skill | null) => void
  onPress: (skill: Skill) => void
}

function Key({ color, icon, label, description, onHover, onPress }: KeyProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover({ name: label, label, shortDescription: description } as Skill)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(null)
  }

  const handleClick = () => {
    onPress({ name: label, label, shortDescription: description } as Skill)
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05, z: 10 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        width: '60px',
        height: '60px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Key top face */}
      <div
        className="absolute inset-0 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{
          backgroundColor: color,
          transform: 'translateZ(6px)',
          boxShadow: isHovered 
            ? `0 6px 20px ${color}40, 0 3px 8px rgba(0,0,0,0.3)`
            : '0 3px 10px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          {icon}
        </span>
      </div>

      {/* Key edges for 3D effect */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-lg"
        style={{
          backgroundColor: color,
          transform: 'translateZ(6px) rotateX(-90deg)',
          transformOrigin: 'bottom',
          filter: 'brightness(1.2)'
        }}
      />
      <div
        className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-lg"
        style={{
          backgroundColor: color,
          transform: 'translateZ(6px) rotateY(90deg)',
          transformOrigin: 'right',
          filter: 'brightness(0.9)'
        }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-1.5 rounded-r-lg"
        style={{
          backgroundColor: color,
          transform: 'translateZ(6px) rotateY(-90deg)',
          transformOrigin: 'left',
          filter: 'brightness(0.6)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-lg"
        style={{
          backgroundColor: color,
          transform: 'translateZ(6px) rotateX(90deg)',
          transformOrigin: 'top',
          filter: 'brightness(0.4)'
        }}
      />

      {/* Key shadow */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          transform: 'translateZ(-2px) scale(1.05)',
          filter: 'blur(3px)'
        }}
      />
    </motion.div>
  )
}

export function InteractiveKeyboard3D() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [pressedSkill, setPressedSkill] = useState<Skill | null>(null)

  // Exact layout from the image
  const keyboardLayout = [
    // Row 1
    [
      { color: '#4CAF50', icon: '✓', label: 'HTML', description: 'the internet\'s granddad, still bussin\' fr fr! 💀🔥' },
      { color: '#2196F3', icon: '⚛️', label: 'React', description: '"use using" using use = useUsing("use")' },
      { color: '#9C27B0', icon: 'B', label: 'Bootstrap', description: 'utility classes hitting different fr fr 🌪️🔥' },
      { color: '#00BCD4', icon: 'ex', label: 'Express', description: 'middlewares go dummy hard, no cap! 🚂💨' },
      { color: '#4CAF50', icon: '🍃', label: 'Vue', description: 'the chill pill for your frontend, it hits different! 🟢😌' }
    ],
    // Row 2
    [
      { color: '#FF9800', icon: 'S', label: 'Svelte', description: 'the drama queen of front-end frameworks, and we stan! 👑📜' },
      { color: '#2196F3', icon: 'TS', label: 'TypeScript', description: 'JavaScript\'s overachieving cousin who\'s always flexing 💯🔒' },
      { color: '#4CAF50', icon: 'JS', label: 'JavaScript', description: 'yeeting code into the DOM since \'95, no cap! 💯🚀' },
      { color: '#F44336', icon: 'E', label: 'Ember', description: 'the OG workhorse that still runs a zillion enterprise apps' },
      { color: '#FF9800', icon: 'aws', label: 'AWS', description: 'always extra, making everything more complicated, period! 🌐👨‍💻' }
    ],
    // Row 3
    [
      { color: '#FF9800', icon: 'N', label: 'Next.js', description: 'the drama queen of front-end frameworks, and we stan! 👑📜' },
      { color: '#2196F3', icon: '🌊', label: 'Tailwind', description: 'utility classes hitting different fr fr 🌪️🔥' },
      { color: '#424242', icon: '📊', label: 'Analytics', description: 'data\'s personal diary — secure, organized, and occasionally moody' },
      { color: '#4CAF50', icon: 'W', label: 'WordPress', description: 'the grandpa of CMS, still rocking that cane 🧓👴' },
      { color: '#4CAF50', icon: 'V', label: 'Vercel', description: 'The triangle company, helps you deploy and go touch grass! 🚀🌿' }
    ],
    // Row 4
    [
      { color: '#F44336', icon: '🐙', label: 'Git', description: 'the code\'s personal bodyguard, no cap! 🕵️‍♂️🔄' },
      { color: '#000000', icon: '🐧', label: 'Linux', description: 'where \'chmod 777\' is the ultimate flex 🔓🙌' },
      { color: '#2196F3', icon: '🐳', label: 'Docker', description: 'The best containerization! 🐳🔥' },
      { color: '#4CAF50', icon: 'N', label: 'Node.js', description: 'JavaScript said \'sike, I\'m backend now\', deadass! 🔙🔚' },
      { color: '#000000', icon: '▶', label: 'NPM', description: 'package manager said \'I gotchu fam\', period! 📦💯' }
    ],
    // Row 5
    [
      { color: '#FF9800', icon: 'JS', label: 'JavaScript', description: 'yeeting code into the DOM since \'95, no cap! 💯🚀' },
      { color: '#000000', icon: 'N', label: 'Nginx', description: 'reverse proxy go zoom zoom, sheesh! 🚗💨' },
      { color: '#F44336', icon: '🗄️', label: 'PostgreSQL', description: 'SQL but make it fashion, purr 💅🐘' },
      { color: '#2196F3', icon: '☁️', label: 'Firebase', description: 'your app\'s ultimate wingman, but watch out, vendor lock-in vibes! 🔥👌' },
      { color: '#000000', icon: 'C', label: 'C++', description: 'exit? In this economy? Ight, imma head out! 🚪🏃' }
    ]
  ]

  const handleHover = (skill: Skill | null) => {
    setSelectedSkill(skill)
  }

  const handlePress = (skill: Skill) => {
    setPressedSkill(skill)
    setTimeout(() => setPressedSkill(null), 200)
  }

  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* 3D Keyboard Container */}
        <div
          className="relative"
          style={{
            transform: 'rotateX(35deg) rotateY(-35deg)',
            transformStyle: 'preserve-3d',
            width: '350px',
            height: '350px'
          }}
        >
          {/* Keyboard Base */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundColor: '#2a2a2a',
              transform: 'translateZ(-15px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '2px solid #333'
            }}
          />

          {/* Keys Grid */}
          <div className="relative" style={{ transform: 'translateZ(5px)' }}>
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                {row.map((key, colIndex) => (
                  <Key
                    key={`${rowIndex}-${colIndex}`}
                    color={key.color}
                    icon={key.icon}
                    label={key.label}
                    description={key.description}
                    onHover={handleHover}
                    onPress={handlePress}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Info Tooltip */}
        <AnimatePresence>
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
        </AnimatePresence>

        {/* Pressed Skill Animation */}
        <AnimatePresence>
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
        </AnimatePresence>
        
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
            {selectedSkill ? selectedSkill.label : 'JavaScript'}
          </h3>
          <p className="text-sm text-white/80 font-medium" style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {selectedSkill ? selectedSkill.shortDescription : "yeeting code into the DOM since '95, no cap!"}
          </p>
        </motion.div>
      </div>
    </div>
  )
} 