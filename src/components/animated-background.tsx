"use client";

import { useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

type Section = "hero" | "about" | "skills" | "projects" | "contact";

interface Skill {
  name: string;
  label: string;
  shortDescription: string;
}

const PROJECT_SKILLS = {
  vue: {
    name: "vue",
    label: "Vue.js",
    shortDescription: "Progressive JavaScript framework",
  },
  settings: {
    name: "settings",
    label: "Settings",
    shortDescription: "Configuration management",
  },
  express: {
    name: "express",
    label: "Express",
    shortDescription: "Node.js web framework",
  },
  node: {
    name: "node",
    label: "Node.js",
    shortDescription: "JavaScript runtime",
  },
  wp: {
    name: "wp",
    label: "WordPress",
    shortDescription: "Content management system",
  },
  js: {
    name: "js",
    label: "JavaScript",
    shortDescription: "Programming language",
  },
  ts: {
    name: "ts",
    label: "TypeScript",
    shortDescription: "Typed JavaScript",
  },
  express2: {
    name: "express2",
    label: "Express",
    shortDescription: "Backend framework",
  },
  laravel: {
    name: "laravel",
    label: "Laravel",
    shortDescription: "PHP web framework",
  },
  vite: {
    name: "vite",
    label: "Vite",
    shortDescription: "Build tool",
  },
  js2: {
    name: "js2",
    label: "JavaScript",
    shortDescription: "Frontend development",
  },
  framework: {
    name: "framework",
    label: "Framework",
    shortDescription: "Development framework",
  },
  aws: {
    name: "aws",
    label: "AWS",
    shortDescription: "Cloud services",
  },
  nginx: {
    name: "nginx",
    label: "Nginx",
    shortDescription: "Web server",
  },
  github: {
    name: "github",
    label: "GitHub",
    shortDescription: "Version control",
  },
  cloud: {
    name: "cloud",
    label: "Cloud",
    shortDescription: "Cloud computing",
  },
  node2: {
    name: "node2",
    label: "Node.js",
    shortDescription: "Server-side JavaScript",
  },
  play: {
    name: "play",
    label: "Play",
    shortDescription: "Development tools",
  },
  php: {
    name: "php",
    label: "PHP",
    shortDescription: "Server-side language",
  },
  linux: {
    name: "linux",
    label: "Linux",
    shortDescription: "Operating system",
  },
  k8s: {
    name: "k8s",
    label: "Kubernetes",
    shortDescription: "Container orchestration",
  },
};

const skills = Object.values(PROJECT_SKILLS);

const keyboardStates = (section: Section) => {
  switch (section) {
    case "hero":
      return {
        scale: { x: 0.8, y: 0.8, z: 0.8 },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
    case "skills":
      return {
        scale: { x: 1, y: 1, z: 1 },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
    case "projects":
      return {
        scale: { x: 0.6, y: 0.6, z: 0.6 },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
    case "contact":
      return {
        scale: { x: 0.4, y: 0.4, z: 0.4 },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
    default:
      return {
        scale: { x: 0.8, y: 0.8, z: 0.8 },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
  }
};

export default function AnimatedBackground() {
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("skills");
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;

    const skill = skills.find((s) => s.name === e.target.name);
    if (skill) {
      setSelectedSkill(skill);
    }

    if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    }
  };

  const handleKeyDown = (e: SplineEvent) => {
    if (!splineApp) return;
    const skill = skills.find((s) => s.name === e.target.name);
    if (skill) {
      splineApp.setVariable("heading", skill.label);
      splineApp.setVariable("desc", skill.shortDescription);
    }
  };

  const handleKeyUp = (e: SplineEvent) => {
    if (!splineApp) return;
    splineApp.setVariable("heading", "");
    splineApp.setVariable("desc", "");
  };

  const handleSplineLoad = (app: Application) => {
    setSplineApp(app);
    setIsLoading(false);

    // Set up event listeners
    app.addEventListener("mouseHover", handleMouseHover);
    app.addEventListener("keyDown", handleKeyDown);
    app.addEventListener("keyUp", handleKeyUp);

    // Initialize keyboard state
    const kbd: SPEObject | undefined = app.findObjectByName("keyboard");
    if (kbd) {
      gsap.set(kbd.scale, keyboardStates("skills").scale);
      gsap.set(kbd.position, keyboardStates("skills").position);
      gsap.set(kbd.rotation, keyboardStates("skills").rotation);
    }
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

  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        {/* Spline 3D Keyboard */}
        <motion.div
          ref={splineContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
          style={{ width: '600px', height: '400px' }}
        >
          <React.Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-xl">
              <div className="text-white text-lg">Loading 3D Keyboard...</div>
            </div>
          }>
            <Spline
              ref={splineContainer}
              onLoad={handleSplineLoad}
              scene="/assets/skills-keyboard.spline"
              style={{ width: '100%', height: '100%' }}
            />
          </React.Suspense>
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
  );
} 