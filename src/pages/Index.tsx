import Hero3D from '../components/Hero3D'
import AboutMe3D from '../components/AboutMe3D'
import Skills3D from '../components/Skills3D'
import Projects3D from '../components/Projects3D'
import TechKeyboard3D from '../components/TechKeyboard3D'
import Interests3D from '../components/Interests3D'
import Contact3D from '../components/Contact3D'
import ChatBot from '../components/ChatBot'
import Stars from '../components/Stars'

const Index = () => {
  return (
    <div className="relative bg-gradient-space min-h-screen scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      {/* Universe stars background */}
      <Stars />

      {/* Background grid overlay for all sections */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Cyber gradient overlay */}
      <div className="fixed inset-0 bg-gradient-cyber pointer-events-none z-0" />

      {/* Content sections */}
      <div className="relative z-10" style={{ scrollBehavior: 'smooth' }}>
        <Hero3D />
        <AboutMe3D />
        <Skills3D />
        <Projects3D />
        <TechKeyboard3D />
        <Interests3D />
        <Contact3D />
        <ChatBot />
      </div>
    </div>
  )
}

export default Index