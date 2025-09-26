import { motion } from 'framer-motion'
import { useRef } from 'react'

function AboutVisual() {
  const containerRef = useRef(null);

  return (
    <div className="relative h-96 flex items-center justify-center">
      {/* Central SC */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-2xl flex items-center justify-center">
        <span className="text-2xl font-orbitron font-bold text-white">SC</span>
      </div>
      
      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-80 h-80 border border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 border border-primary/15 rounded-full"
        />
        
        {/* Orbiting elements */}
        {[
          { text: "ENSA Tanger", color: "#67e8f9", delay: 0, radius: 160, ring: "inner" },
          { text: "Backend", color: "#0891b2", delay: 0.25, radius: 160, ring: "inner" },
          { text: "DevOps", color: "#06b6d4", delay: 0.5, radius: 160, ring: "inner" },
          { text: "Automation", color: "#67e8f9", delay: 0.75, radius: 160, ring: "inner" },
          { text: "React", color: "#0891b2", delay: 0.125, radius: 192, ring: "outer" },
          { text: "Node.js", color: "#06b6d4", delay: 0.375, radius: 192, ring: "outer" },
          { text: "Docker", color: "#67e8f9", delay: 0.625, radius: 192, ring: "outer" },
          { text: "Git", color: "#0891b2", delay: 0.875, radius: 192, ring: "outer" }
        ].map((item, index) => (
          <motion.div
            key={item.text}
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ 
              duration: item.ring === "inner" ? 20 : 30, 
              repeat: Infinity, 
              ease: "linear",
              delay: item.delay * (item.ring === "inner" ? 20 : 30)
            }}
            style={{
              width: `${item.radius * 2}px`,
              height: `${item.radius * 2}px`,
              left: `calc(50% - ${item.radius}px)`,
              top: `calc(50% - ${item.radius}px)`
            }}
          >
            <div 
              className={`absolute glass px-3 py-1 rounded-lg neon-glow-subtle text-sm font-inter ${
                item.ring === "outer" ? "transform -rotate-12" : ""
              }`}
              style={{ 
                color: item.color,
                top: 0,
                left: '50%',
                transform: `translateX(-50%) ${item.ring === "outer" ? "rotate(-12deg)" : ""}`
              }}
            >
              {item.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function AboutMe3D() {
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
            À Propos de Moi
          </h2>
          <p className="text-xl text-foreground/70 font-inter">
            Système d'information orbital présentant mon parcours
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AboutVisual />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg neon-glow-subtle"
            >
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
                🎓 Formation
              </h3>
              <p className="text-foreground/80 font-inter">
                Actuellement étudiant en <span className="text-primary">Génie Informatique</span> à 
                l'ENSA Tanger, je me spécialise dans le développement backend avec un intérêt 
                particulier pour les pratiques DevOps et l'automatisation des processus.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.9, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg neon-glow-subtle"
            >
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
                💻 Spécialisation
              </h3>
              <p className="text-foreground/80 font-inter">
                Développeur backend en formation avec une passion pour <span className="text-primary">DevOps</span>. 
                Je m'intéresse particulièrement à la conteneurisation, aux pipelines CI/CD, 
                et à l'automatisation de l'infrastructure pour optimiser le déploiement logiciel.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg neon-glow-subtle"
            >
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
                🌍 Travail à Distance
              </h3>
              <p className="text-foreground/80 font-inter">
                Basé au <span className="text-primary">Maroc</span>, je travaille à distance et suis disponible 
                pour collaborer sur des projets internationaux. Passionné par la résolution 
                de problèmes et l'automatisation des processus.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}