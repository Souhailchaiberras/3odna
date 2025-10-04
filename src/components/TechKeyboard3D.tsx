import { motion } from 'framer-motion'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

interface TimelineItem {
  type: 'education' | 'experience'
  title: string
  subtitle?: string
  institution: string
  year: string
  description?: string
  mention?: string
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: "Baccalauréat Sciences Mathématiques",
    institution: "Lycée Ambition, Casablanca",
    year: "2021",
    mention: ""
  },
  {
    type: 'education',
    title: "Cycle Préparatoire Intégré",
    institution: "ENSA Tanger",
    year: "2021 - 2023"
  },
  {
    type: 'education',
    title: "Cycle d'Ingénieur",
    subtitle: "Génie Informatique",
    institution: "ENSA Tanger",
    year: "2023 - Présent"
  },
  {
    type: 'experience',
    title: "Stage d'initiation",
    subtitle: "Développement d'une application web avec React.js pour la gestion des engins. Création d'API RESTful avec Laravel et gestion de PostgreSQL. Sécurisation des accès avec un système d'authentification et gestion des rôles.",
    institution: "Marsa Maroc",
    year: "2023 – 2024"
  },
  {
    type: 'experience',
    title: "Stagiaire Full-Stack",
    subtitle: "Développement d'une plateforme d'apprentissage similaire à Coursera, avec une feuille de route guidée, système de réservation de professeurs, et intégration d'un modèle IA pour aider les étudiants à apprendre plus efficacement.",
    institution: "Axilog Rabat",
    year: "2025"
  }
]

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isEducation = item.type === 'education'
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(29, 24, 54, 0.8)",
        color: "#fff",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
      date={item.year}
      iconStyle={{ 
        background: isEducation 
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        boxShadow: isEducation 
          ? "0 0 20px rgba(102, 126, 234, 0.5)"
          : "0 0 20px rgba(245, 87, 108, 0.5)"
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <span className="text-white font-bold text-lg">
            {isEducation ? "🎓" : "💼"}
        </span>
      </div>
      }
      position={index % 2 === 0 ? "left" : "right"}
    >
      <div>
        <h3 className="text-white text-[24px] font-bold font-orbitron">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className={`text-[16px] font-semibold mb-2 ${
            isEducation ? 'text-blue-300' : 'text-purple-300'
          }`}>
            {item.subtitle}
          </p>
        )}
        <p className="text-gray-300 text-[16px] font-semibold">
          {item.institution}
        </p>
        {item.mention && (
          <p className="text-green-400 text-[14px] font-medium mt-1">
            Mention: {item.mention}
          </p>
        )}
        {item.description && (
          <p className="text-gray-300 text-[14px] leading-relaxed mt-3">
            {item.description}
          </p>
        )}
      </div>
    </VerticalTimelineElement>
  )
}

export default function TechKeyboard3D() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-30px", amount: 0.1 }}
      className="py-20 relative overflow-hidden"
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
            Formation & Expérience
          </h2>
          <p className="text-xl text-foreground/70 font-inter">
            Mon parcours à travers le temps
          </p>
        </motion.div>
        
        <div className="mt-20 flex flex-col">
          <VerticalTimeline>
            {timelineData.map((item, index) => (
              <motion.div
                key={`timeline-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              >
                <TimelineCard item={item} index={index} />
              </motion.div>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </motion.section>
  )
}