import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';

const CompassBody = () => {
  const meshRef = useRef();
  const needleRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;
    }
    if (needleRef.current) {
      // Needle jitters like it's seeking north
      needleRef.current.rotation.y = time * 0.5 + Math.sin(time * 10) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Casing */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.3, 64]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.15} />
      </mesh>

      {/* Decorative Rim */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[1.05, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#8b6508" metalness={1} roughness={0.1} />
      </mesh>

      {/* Faces/Dial */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.02, 32]} />
        <meshStandardMaterial color="#f5deb3" roughness={0.8} />
      </mesh>

      {/* Needle Group */}
      <group ref={needleRef} position={[0, 0.18, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.04, 0.08]} />
          <meshStandardMaterial color="#8b0000" emissive="#ff0000" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.3, 4]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>

      {/* Protective Glass */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.05, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} metalness={1} roughness={0} />
      </mesh>
    </group>
  );
};

const SmallCompass3D = () => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32">
      <Canvas alpha={true}>
        <PerspectiveCamera makeDefault position={[0, 2.5, 4]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#d4af37" />
        <spotLight position={[-5, 10, 2]} intensity={1} color="#ffffff" />
        <Environment preset="city" />
        <Float speed={4} rotationIntensity={1.5} floatIntensity={1.2}>
          <CompassBody />
        </Float>
      </Canvas>
    </div>
  );
};

export default SmallCompass3D;
