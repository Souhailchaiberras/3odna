import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SkillKey {
  name: string;
  icon: string;
  color: string;
  description: string;
  isSelected?: boolean;
}

const skillKeys: SkillKey[] = [
  // Row 1 - Exact from image
  { name: 'HTML', icon: '✓', color: '#4CAF50', description: 'the internet\'s granddad, still bussin\' fr fr! 💀🔥' },
  { name: 'React', icon: '⚛️', color: '#2196F3', description: '"use using" using use = useUsing("use")' },
  { name: 'Bootstrap', icon: 'B', color: '#9C27B0', description: 'utility classes hitting different fr fr 🌪️🔥' },
  { name: 'Express', icon: 'ex', color: '#00BCD4', description: 'middlewares go dummy hard, no cap! 🚂💨' },
  { name: 'Vue', icon: '🍃', color: '#4CAF50', description: 'the chill pill for your frontend, it hits different! 🟢😌' },
  
  // Row 2 - Exact from image
  { name: 'Svelte', icon: 'S', color: '#FF9800', description: 'the drama queen of front-end frameworks, and we stan! 👑📜' },
  { name: 'TypeScript', icon: 'TS', color: '#2196F3', description: 'JavaScript\'s overachieving cousin who\'s always flexing 💯🔒' },
  { name: 'JavaScript', icon: 'JS', color: '#4CAF50', description: 'yeeting code into the DOM since \'95, no cap! 💯🚀' },
  { name: 'Ember', icon: 'E', color: '#F44336', description: 'the OG workhorse that still runs a zillion enterprise apps' },
  { name: 'AWS', icon: 'aws', color: '#FF9800', description: 'always extra, making everything more complicated, period! 🌐👨‍💻' },
  
  // Row 3 - Exact from image
  { name: 'Next.js', icon: 'N', color: '#FF9800', description: 'the drama queen of front-end frameworks, and we stan! 👑📜' },
  { name: 'Tailwind', icon: '🌊', color: '#2196F3', description: 'utility classes hitting different fr fr 🌪️🔥' },
  { name: 'Analytics', icon: '📊', color: '#424242', description: 'data\'s personal diary — secure, organized, and occasionally moody' },
  { name: 'WordPress', icon: 'W', color: '#4CAF50', description: 'the grandpa of CMS, still rocking that cane 🧓👴' },
  { name: 'Vercel', icon: 'V', color: '#4CAF50', description: 'The triangle company, helps you deploy and go touch grass! 🚀🌿' },
  
  // Row 4 - Exact from image
  { name: 'Git', icon: '🐙', color: '#F44336', description: 'the code\'s personal bodyguard, no cap! 🕵️‍♂️🔄' },
  { name: 'Linux', icon: '🐧', color: '#000000', description: 'where \'chmod 777\' is the ultimate flex 🔓🙌' },
  { name: 'Docker', icon: '🐳', color: '#2196F3', description: 'The best containerization! 🐳🔥' },
  { name: 'Node.js', icon: 'N', color: '#4CAF50', description: 'JavaScript said \'sike, I\'m backend now\', deadass! 🔙🔚' },
  { name: 'NPM', icon: '▶', color: '#000000', description: 'package manager said \'I gotchu fam\', period! 📦💯' },
  
  // Row 5 - Exact from image (JavaScript is selected)
  { name: 'JavaScript', icon: 'JS', color: '#FF9800', description: 'yeeting code into the DOM since \'95, no cap! 💯🚀', isSelected: true },
  { name: 'Nginx', icon: 'N', color: '#000000', description: 'reverse proxy go zoom zoom, sheesh! 🚗💨' },
  { name: 'PostgreSQL', icon: '🗄️', color: '#F44336', description: 'SQL but make it fashion, purr 💅🐘' },
  { name: 'Firebase', icon: '☁️', color: '#2196F3', description: 'your app\'s ultimate wingman, but watch out, vendor lock-in vibes! 🔥👌' },
  { name: 'C++', icon: 'C', color: '#000000', description: 'exit? In this economy? Ight, imma head out! 🚪🏃' },
]

function SkillKey({ skill, index }: { skill: SkillKey; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const keyRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (keyRef.current) {
      gsap.fromTo(keyRef.current, 
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 20,
          rotationX: 90 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotationX: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: "elastic.out(1, 0.6)"
        }
      )
    }
  }, [index])

  return (
    <div
      ref={keyRef}
      className="group relative cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Key with isometric depth */}
      <div 
        className="relative w-16 h-16"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Key face (top) */}
        <div 
          className="absolute inset-0 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ 
            backgroundColor: skill.color,
            transform: 'translateZ(8px)',
            boxShadow: isHovered 
              ? `0 8px 25px ${skill.color}40, 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)`
              : `0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`
          }}
        >
          <div
            style={{ 
              color: skill.name === 'JavaScript' ? '#000000' : '#FFFFFF',
              fontWeight: skill.name === 'JavaScript' ? 'bold' : 'normal'
            }}
          >
            {skill.icon}
          </div>
          
          {/* Selection indicator for JavaScript */}
          {skill.isSelected && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: '#2196F3' }}
            />
          )}
        </div>
        
        {/* Key top edge */}
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
        
        {/* Key left edge */}
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
        
        {/* Key right edge */}
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
        
        {/* Key bottom edge */}
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
      
      {/* Tooltip */}
      <div
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 pointer-events-none z-50"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${isHovered ? 0 : 10}px)`,
          transition: 'all 0.2s ease'
        }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
          <p className="text-sm font-medium text-white whitespace-nowrap">
            {skill.name}
          </p>
          <p className="text-xs text-white/70">
            {skill.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function SkillsKeyboard() {
  const [selectedSkill, setSelectedSkill] = useState<SkillKey | null>(
    skillKeys.find(skill => skill.isSelected) || null
  )
  const keyboardRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (keyboardRef.current) {
      // Initial keyboard animation
      gsap.fromTo(keyboardRef.current, 
        { 
          opacity: 0, 
          scale: 0.9,
          rotationX: 45,
          rotationY: -45
        },
        { 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          rotationY: Math.PI / 12, // Exact from original
          duration: 1.2,
          ease: "easeOut"
        }
      )

      // Scroll-triggered animations like the original
      gsap.timeline({
        scrollTrigger: {
          trigger: "#skills",
          start: "top 50%",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            gsap.to(keyboardRef.current, {
              rotationX: 0,
              rotationY: Math.PI / 12,
              scale: 0.4,
              duration: 1,
              ease: "easeOut"
            })
          },
          onLeaveBack: () => {
            gsap.to(keyboardRef.current, {
              rotationX: 0,
              rotationY: 0,
              scale: 0.25,
              duration: 1,
              ease: "easeOut"
            })
          }
        }
      })
    }

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, delay: 1.5, duration: 0.8, ease: "easeOut" }
      )
    }
  }, [])

  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* 3D Keyboard container with exact rotation from original */}
        <div 
          ref={keyboardRef}
          className="relative"
          style={{
            transform: 'rotateX(0deg) rotateY(0deg)',
            transformStyle: 'preserve-3d',
            width: '440px',
            height: '300px'
          }}
        >
          {/* Keyboard base with 3D depth */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              width: '440px',
              height: '300px',
              backgroundColor: '#2a2a2a',
              transform: 'translateZ(-20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.1)',
              border: '2px solid #333',
              background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)'
            }}
          />
          
          {/* Keyboard base edges for 3D effect */}
          <div 
            className="absolute top-0 left-0 right-0 h-2 rounded-t-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-20px) rotateX(-90deg)',
              transformOrigin: 'bottom',
              background: 'linear-gradient(to bottom, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 left-0 bottom-0 w-2 rounded-l-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-20px) rotateY(90deg)',
              transformOrigin: 'right',
              background: 'linear-gradient(to right, #4a4a4a, #2a2a2a)'
            }}
          />
          <div 
            className="absolute top-0 right-0 bottom-0 w-2 rounded-r-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-20px) rotateY(-90deg)',
              transformOrigin: 'left',
              background: 'linear-gradient(to left, #2a2a2a, #1a1a1a)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl"
            style={{
              backgroundColor: '#3a3a3a',
              transform: 'translateZ(-20px) rotateX(90deg)',
              transformOrigin: 'top',
              background: 'linear-gradient(to top, #1a1a1a, #2a2a2a)'
            }}
          />
          
          {/* Keys grid */}
          <div 
            className="grid grid-cols-5 gap-3 relative"
            style={{
              width: '420px',
              height: '280px',
              padding: '25px',
              transform: 'translateZ(5px)'
            }}
          >
            {skillKeys.map((skill, index) => (
              <SkillKey key={`${skill.name}-${index}`} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        {/* Floating JavaScript text block - Exact from image */}
        <div
          ref={textRef}
          className="absolute -left-48 top-1/2 transform -translate-y-1/2"
          style={{
            transform: 'rotate(-15deg) translateY(-50%)',
            zIndex: 10
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
            <h3 className="text-5xl font-bold text-white mb-2" style={{ 
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.3)',
              transform: 'translateZ(10px)'
            }}>
              JavaScript
            </h3>
            <p className="text-sm text-white/80 font-medium mb-1" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              yeeting code into the DOM
            </p>
            <p className="text-sm text-white/80 font-medium" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              since '95, no cap!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 