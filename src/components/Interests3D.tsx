import { motion } from 'framer-motion'

interface Interest {
  name: string
  icon: string
  description: string
  color: string
}

const interests: Interest[] = [
  {
    name: "Swimming",
    icon: "🏊",
    description: "Staying fit and pushing physical limits",
    color: "#06b6d4"
  },
  {
    name: "Football",
    icon: "⚽",
    description: "Team strategy and competitive spirit",
    color: "#0891b2"
  },
  {
    name: "Traveling",
    icon: "🌍",
    description: "Exploring cultures and broadening perspectives",
    color: "#67e8f9"
  },
  {
    name: "Photography",
    icon: "📸",
    description: "Capturing moments and visual storytelling",
    color: "#0ea5e9"
  },
  {
    name: "Design",
    icon: "🎨",
    description: "Creating beautiful and functional interfaces",
    color: "#38bdf8"
  }
]

function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotateY: 360 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.2,
        duration: 1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div 
        className="glass p-6 rounded-lg neon-glow-subtle hover:neon-glow transition-all duration-300 text-center h-full min-h-[180px] flex flex-col justify-center"
        style={{ borderColor: `${interest.color}40` }}
      >
        <div className="text-5xl mb-4">{interest.icon}</div>
        <h3 
          className="text-xl font-orbitron font-bold mb-2"
          style={{ color: interest.color }}
        >
          {interest.name}
        </h3>
        <p className="text-sm text-foreground/80">
          {interest.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Interests3D() {
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
            Personal Interests
          </h2>
          <p className="text-xl text-foreground/70 font-inter">
            My passions beyond technology
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {interests.map((interest, index) => (
            <InterestCard key={interest.name} interest={interest} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}