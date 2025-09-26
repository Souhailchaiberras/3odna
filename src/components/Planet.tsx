import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Mesh, RingGeometry } from "three";

const Planet = () => {
  const planetRef = useRef<Mesh>(null);
  const ringsRef = useRef<Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group>
      {/* Main Planet */}
      <mesh ref={planetRef} scale={2.5} position-y={0}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          color="#ff6b35"
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Planet Rings - Main Ring */}
      <mesh ref={ringsRef} rotation-x={Math.PI / 2} position-y={0}>
        <ringGeometry args={[1.8, 3.2, 128]} />
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.8}
          side={2}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ringsRef} rotation-x={Math.PI / 2} position-y={0}>
        <ringGeometry args={[1.4, 2.0, 128]} />
        <meshStandardMaterial 
          color="#ff8c42"
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.7}
          side={2}
        />
      </mesh>

      {/* Outer Ring */}
      <mesh ref={ringsRef} rotation-x={Math.PI / 2} position-y={0}>
        <ringGeometry args={[2.5, 4.0, 128]} />
        <meshStandardMaterial 
          color="#ffb347"
          metalness={0.3}
          roughness={0.5}
          transparent
          opacity={0.6}
          side={2}
        />
      </mesh>

      {/* Additional Ring Layer for Depth */}
      <mesh ref={ringsRef} rotation-x={Math.PI / 2 + 0.1} position-y={0}>
        <ringGeometry args={[1.6, 2.8, 128]} />
        <meshStandardMaterial 
          color="#ffa500"
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
    </group>
  );
};

const PlanetCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 35,
        near: 0.1,
        far: 200,
        position: [-6, 4, 8],
      }}
    >
      <Suspense fallback={null}>
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-10, -5, -5]} 
          intensity={0.8}
          color="#ff6b35"
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffd700" />
        
        {/* Stars background */}
        <mesh position={[0, 0, -15]}>
          <sphereGeometry args={[30, 32, 32]} />
          <meshBasicMaterial color="#000000" side={1} />
        </mesh>
        
        <Planet />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PlanetCanvas; 