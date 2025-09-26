import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import { Mesh, CanvasTexture } from "three";

const Moon = () => {
  const moonRef = useRef<Mesh>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  // Create the moon texture
  const moonTexture = createMoonTexture();

  return (
    <mesh ref={moonRef} scale={2.5} position-y={0} rotation-y={0}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial 
        color="#8b8b8b"
        metalness={0.1}
        roughness={0.9}
        bumpScale={0.1}
        displacementScale={0.05}
        map={new CanvasTexture(moonTexture)}
        bumpMap={new CanvasTexture(moonTexture)}
        displacementMap={new CanvasTexture(moonTexture)}
      />
    </mesh>
  );
};

// Create detailed moon texture with craters
const createMoonTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base moon color
  ctx.fillStyle = '#8b8b8b';
  ctx.fillRect(0, 0, 1024, 1024);

  // Add darker basaltic patches
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = Math.random() * 100 + 20;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#6b6b6b');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add craters of varying sizes
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = Math.random() * 80 + 5;
    const depth = Math.random() * 0.8 + 0.2;
    
    // Crater shadow (darker)
    const shadowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    shadowGradient.addColorStop(0, `rgba(50, 50, 50, ${depth})`);
    shadowGradient.addColorStop(0.7, `rgba(100, 100, 100, ${depth * 0.5})`);
    shadowGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = shadowGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Crater rim (lighter)
    const rimGradient = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius);
    rimGradient.addColorStop(0, 'transparent');
    rimGradient.addColorStop(1, `rgba(150, 150, 150, ${depth * 0.3})`);
    
    ctx.fillStyle = rimGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add smaller impact marks
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = Math.random() * 15 + 2;
    
    ctx.fillStyle = `rgba(70, 70, 70, ${Math.random() * 0.6 + 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add surface ridges and lines
  for (let i = 0; i < 30; i++) {
    const x1 = Math.random() * 1024;
    const y1 = Math.random() * 1024;
    const x2 = x1 + (Math.random() - 0.5) * 200;
    const y2 = y1 + (Math.random() - 0.5) * 200;
    const width = Math.random() * 8 + 2;
    
    ctx.strokeStyle = `rgba(100, 100, 100, ${Math.random() * 0.4 + 0.1})`;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return canvas;
};

const MoonCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={null}>
        {/* Main lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Stars background */}
        <mesh position={[0, 0, -10]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#000000" side={1} />
        </mesh>
        
        <Moon />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default MoonCanvas; 