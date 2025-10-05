"use client";

import { useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import { motion } from "framer-motion";
import React from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

interface Skill {
  name: string;
  label: string;
  shortDescription: string;
}

const PROJECT_SKILLS = {
  vue: { name: "vue", label: "Vue.js", shortDescription: "Progressive JavaScript framework" },
  settings: { name: "settings", label: "Settings", shortDescription: "Configuration management" },
  express: { name: "express", label: "Express", shortDescription: "Node.js web framework" },
  node: { name: "node", label: "Node.js", shortDescription: "JavaScript runtime" },
  wp: { name: "wp", label: "WordPress", shortDescription: "Content management system" },
  js: { name: "js", label: "JavaScript", shortDescription: "Programming language" },
  ts: { name: "ts", label: "TypeScript", shortDescription: "Typed JavaScript" },
  express2: { name: "express2", label: "Express", shortDescription: "Backend framework" },
  laravel: { name: "laravel", label: "Laravel", shortDescription: "PHP web framework" },
  vite: { name: "vite", label: "Vite", shortDescription: "Build tool" },
  js2: { name: "js2", label: "JavaScript", shortDescription: "Frontend development" },
  framework: { name: "framework", label: "Framework", shortDescription: "Development framework" },
  aws: { name: "aws", label: "AWS", shortDescription: "Cloud services" },
  nginx: { name: "nginx", label: "Nginx", shortDescription: "Web server" },
  github: { name: "github", label: "GitHub", shortDescription: "Version control" },
  cloud: { name: "cloud", label: "Cloud", shortDescription: "Cloud computing" },
  node2: { name: "node2", label: "Node.js", shortDescription: "Server-side JavaScript" },
  play: { name: "play", label: "Play", shortDescription: "Development tools" },
  php: { name: "php", label: "PHP", shortDescription: "Server-side language" },
  linux: { name: "linux", label: "Linux", shortDescription: "Operating system" },
  k8s: { name: "k8s", label: "Kubernetes", shortDescription: "Container orchestration" },
};

const skills = Object.values(PROJECT_SKILLS);

export default function AnimatedBackground() {
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkill?.name === e.target.name || isMobile) return;
    const skill = skills.find((s) => s.name === e.target.name);
    if (skill) setSelectedSkill(skill);
  };

  const handleKeyDown = (e: SplineEvent) => {
    if (!splineApp) return;
    const skill = skills.find((s) => s.name === e.target.name);
    if (skill) {
      setSelectedSkill(skill);
      if (isMobile) {
        setTimeout(() => setSelectedSkill(null), 2000);
      }
    }
  };

  const handleKeyUp = (e: SplineEvent) => {
    if (!splineApp || isMobile) return;
    setSelectedSkill(null);
  };

  const handleSplineLoad = (app: Application) => {
    console.log("Spline loaded successfully");
    setSplineApp(app);
    setIsLoading(false);
    setSplineError(false);

    app.addEventListener("mouseHover", handleMouseHover);
    app.addEventListener("keyDown", handleKeyDown);
    app.addEventListener("keyUp", handleKeyUp);
  };

  const handleSplineError = () => {
    console.error("Spline failed to load");
    setSplineError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (splineApp) {
        splineApp.removeEventListener("mouseHover", handleMouseHover);
        splineApp.removeEventListener("keyDown", handleKeyDown);
        splineApp.removeEventListener("keyUp", handleKeyUp);
      }
    };
  }, [splineApp]);

  // Fallback if Spline fails
  if (splineError) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                onClick={() => setSelectedSkill(skill)}
                className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform active:scale-95"
              >
                <p className="text-white text-xs font-bold text-center px-2">{skill.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-0 py-8 overflow-visible">
      <div className="relative w-full max-w-7xl mx-auto overflow-visible">
        
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12">
          
          {/* Left Side - JavaScript Text (Desktop) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="lg:w-1/3 text-center lg:text-left"
            >
              <h3 className="text-4xl xl:text-5xl font-bold text-white mb-4">
                JavaScript
              </h3>
              <p className="text-lg text-white/80 font-medium">
                yeeting code into the DOM since '95, no cap!
              </p>
            </motion.div>
          )}

          {/* Center - Spline Keyboard with INCREASED HEIGHT */}
          <div className="flex-1 relative overflow-visible">
            <motion.div
              ref={splineContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto overflow-visible"
              style={{
                width: isMobile ? '140vw' : '800px',
                height: isMobile ? '800px' : '700px',  // INCREASED HEIGHT: Mobile 800px, Desktop 700px
                maxWidth: isMobile ? '140vw' : '800px',
                margin: isMobile ? '0 0 0 -20vw' : '0 auto',
              }}
            >
              <React.Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded-2xl border border-cyan-500/20">
                  <div className="text-white text-sm animate-pulse">
                    Loading 3D Keyboard...
                  </div>
                </div>
              }>
                <Spline
                  onLoad={handleSplineLoad}
                  onError={handleSplineError}
                  scene="/assets/skills-keyboard.spline"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    minWidth: '100%',
                    minHeight: '100%',
                  }}
                />
              </React.Suspense>
            </motion.div>

            {/* Skill Info Tooltip */}
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute ${
                  isMobile 
                    ? 'top-4 left-1/2 transform -translate-x-1/2 -translate-y-full' 
                    : '-top-20 left-1/2 transform -translate-x-1/2'
                } pointer-events-none z-50`}
              >
                <div className="bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-cyan-500/30 shadow-2xl">
                  <p className="text-sm font-bold text-cyan-400 text-center">
                    {selectedSkill.label}
                  </p>
                  <p className="text-xs text-white/80 mt-1 text-center">
                    {selectedSkill.shortDescription}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Side - Empty for balance (Desktop) */}
          {!isMobile && (
            <div className="lg:w-1/3"></div>
          )}
        </div>

        {/* Mobile Content Below Keyboard - Adjusted for taller keyboard */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center mt-12 w-full max-w-md mx-auto px-4"  // Increased margin-top
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              JavaScript
            </h3>
            <p className="text-sm text-white/80 font-medium mb-4">
              yeeting code into the DOM since '95, no cap!
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="text-cyan-400/70 text-xs font-medium"
            >
              Tap on keys to explore skills
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}