"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 400, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 500, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  },
};

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const AnimatedBackground = () => {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const splineContainer = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Enhanced responsive states
  const keyboardStates = (section: Section) => {
    if (isMobile) return STATES[section].mobile;
    if (isTablet) {
      // Enhanced tablet states for better scaling
      const tabletStates = {
        hero: {
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          position: { x: 200, y: -180, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
        },
        about: {
          scale: { x: 0.35, y: 0.35, z: 0.35 },
          position: { x: 0, y: -30, z: 0 },
          rotation: { x: 0, y: Math.PI / 10, z: 0 },
        },
        skills: {
          scale: { x: 0.35, y: 0.35, z: 0.35 },
          position: { x: 0, y: -30, z: 0 },
          rotation: { x: 0, y: Math.PI / 10, z: 0 },
        },
        projects: {
          scale: { x: 0.25, y: 0.25, z: 0.25 },
          position: { x: 0, y: 100, z: 0 },
          rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
        },
        contact: {
          scale: { x: 0.25, y: 0.25, z: 0.25 },
          position: { x: 300, y: -220, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
        },
      };
      return tabletStates[section];
    }
    return STATES[section].desktop;
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        setSelectedSkill(skill);
      }
    }
  };

  // Handle keyboard press interaction
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // Handle keyboard heading and desc visibility
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");
    
    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;
    
    if (activeSection !== "skills") {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
      return;
    }
    
    // Responsive text visibility
    if (isMobile) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = true;
    } else if (isTablet) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = true;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    } else {
      textDesktopDark.visible = false;
      textDesktopLight.visible = true;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    }
  }, [splineApp, isMobile, isTablet, activeSection]);

  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    handleGsapAnimations();
  }, [splineApp]);

  useEffect(() => {
    if (!splineApp || isLoading) return;
    revealKeyCaps();
  }, [splineApp, isLoading, activeSection, isMobile, isTablet]);

  const revealKeyCaps = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    
    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    
    const currentState = keyboardStates(activeSection);
    
    gsap.fromTo(
      kbd?.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        x: currentState.scale.x,
        y: currentState.scale.y,
        z: currentState.scale.z,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    
    await sleep(900);
    
    if (isMobile) {
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile"
      );
      mobileKeyCaps.forEach((keycap, idx) => {
        keycap.visible = true;
      });
    } else {
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop"
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }
    
    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;
    
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        if (selectedSkill?.name === skill.name) {
          setSelectedSkill(null);
          splineApp.setVariable("heading", "");
          splineApp.setVariable("desc", "");
        } else {
          setSelectedSkill(skill);
          splineApp.setVariable("heading", skill.label);
          splineApp.setVariable("desc", skill.shortDescription);
        }
      }
    });
    
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const handleGsapAnimations = () => {
    if (!splineApp) return;
    const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;
    
    const currentState = keyboardStates(activeSection);
    
    gsap.set(kbd.scale, {
      ...currentState.scale,
    });
    gsap.set(kbd.position, {
      ...currentState.position,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          setActiveSection("skills");
          const skillsState = keyboardStates("skills");
          gsap.to(kbd.scale, {
            ...skillsState.scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...skillsState.position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...skillsState.rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("hero");
          const heroState = keyboardStates("hero");
          gsap.to(kbd.scale, { ...heroState.scale, duration: 1 });
          gsap.to(kbd.position, {
            ...heroState.position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...heroState.rotation,
            duration: 1,
          });
        },
      },
    });
  };

  return (
    <>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white text-lg">
          Loading 3D Keyboard...
        </div>
      }>
        <div 
          ref={splineContainer}
          className="w-full h-full"
          style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '500px',
            overflow: 'hidden'
          }}
        >
          <Spline
            onLoad={(app: Application) => {
              setSplineApp(app);
              setIsLoading(false);
            }}
            scene="/assets/skills-keyboard.spline"
            style={{
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />
        </div>
      </Suspense>
    </>
  );
};

export default AnimatedBackground;