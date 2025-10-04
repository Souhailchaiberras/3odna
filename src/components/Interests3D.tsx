import { motion } from 'framer-motion'

interface Interest {
  name: string
  icon: string
  description: string
  color: string
}

const interests: Interest[] = [
  {
    name: "Backend Development using ASP.Net",
    icon: "/assets/aspnet-certificate.png",
    description: "Board Infinity • oct. 2025",
    color: "#06b6d4"
  },
  {
    name: "C# for .NET Developers",
    icon: "/assets/csharp-certificate.png", 
    description: "Board Infinity • août 2025",
    color: "#0891b2"
  },
  {
    name: "Node.js & Express Backend",
    icon: "/assets/nodejs-certificate.png",
    description: "IBM • août 2025",
    color: "#67e8f9"
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
        className="glass p-6 rounded-lg neon-glow-subtle hover:neon-glow transition-all duration-300 text-center h-full min-h-[200px] flex flex-col justify-center"
        style={{ borderColor: `${interest.color}40` }}
      >
        <div className="mb-4 flex justify-center">
          <img 
            src={interest.icon} 
            alt={interest.name}
            className="w-20 h-20 object-contain rounded-lg"
          />
        </div>
        <h3 
          className="text-lg font-orbitron font-bold mb-3 leading-tight"
          style={{ color: interest.color }}
        >
          {interest.name}
        </h3>
        <p className="text-sm text-foreground/80 font-inter">
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
            Certifications
          </h2>
          <p className="text-xl text-foreground/70 font-inter">
            Professional qualifications and achievements
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {interests.map((interest, index) => (
            <InterestCard key={interest.name} interest={interest} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}