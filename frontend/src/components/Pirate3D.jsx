import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial, Environment, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StylizedShip = ({ position }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Gentle bobbing on waves
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
      meshRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;

      // Horizontal "Sailing" Movement
      meshRef.current.position.x = position[0] + Math.sin(time * 0.2) * 4;
      // Rotation to face the direction of travel
      meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.5;
    }
  });
  return (
    <group ref={meshRef} position={position} scale={1.2}>
      {/* Hull */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 1, 1.8]} />
        <meshStandardMaterial color="#2d1e14" roughness={0.8} />
      </mesh>
      <mesh position={[2, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.2, 1.2, 1.8]} />
        <meshStandardMaterial color="#2d1e14" />
      </mesh>
      <mesh position={[-2.2, 0, 0]}>
        <boxGeometry args={[0.5, 2, 1.8]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 5, 8]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>

      {/* Sail */}
      <mesh position={[0.1, 2.8, 0]}>
        <planeGeometry args={[3.5, 3]} />
        <MeshWobbleMaterial color="#f5deb3" speed={1.5} factor={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Crow's Nest */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.5, 8]} />
        <meshStandardMaterial color="#2d1e14" />
      </mesh>
    </group>
  );
};

const Doubloon = ({ position, rotationSpeed, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      // Parallax mouse effect
      const targetX = (state.mouse.x * 3);
      const targetY = (state.mouse.y * 3);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + targetX, 0.03);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + targetY, 0.03);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.05}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
        {/* Embossed Detail */}
        <mesh position={[0, 0.06, 0]}>
          <circleGeometry args={[0.75, 32]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#a67c00" metalness={1} roughness={0.1} />
        </mesh>
      </mesh>
    </Float>
  );
};

const ParticleClouds = () => {
  const points = useMemo(() => {
    const p = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, []);

  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
      meshRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <Points ref={meshRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4af37"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.25}
      />
    </Points>
  );
};

const Pirate3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas alpha={true} shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#d4af37" />
        <spotLight position={[-15, 20, 10]} angle={0.2} penumbra={1} intensity={3.5} color="#ffffff" castShadow />

        {/* Fill light for the ship */}
        <pointLight position={[0, 0, -5]} intensity={2} color="#d4af37" />

        <Environment preset="night" />

        {/* Scattered interactive coins */}
        <Doubloon position={[-12, 6, -2]} rotationSpeed={0.015} scale={0.4} />
        <Doubloon position={[15, -8, -5]} rotationSpeed={0.01} scale={0.5} />
        <Doubloon position={[8, 10, -10]} rotationSpeed={0.02} scale={0.3} />
        <Doubloon position={[-5, -12, -8]} rotationSpeed={0.008} scale={0.6} />

        {/* The Ghost Ship - Moved closer */}
        <StylizedShip position={[0, -5, -8]} />

        <ParticleClouds />
      </Canvas>
    </div>
  );
};

export default Pirate3D;
