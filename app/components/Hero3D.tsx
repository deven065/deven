"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, OrbitControls, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function StylizedArtBoy() {
  const leftArm = useRef<THREE.Group>(null!);
  const rightArm = useRef<THREE.Group>(null!);
  const leftLeg = useRef<THREE.Group>(null!);
  const rightLeg = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    
    if (leftArm.current && rightArm.current && leftLeg.current && rightLeg.current && head.current) {
      // Smooth idle floating and breathing animation
      leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.15;
      rightArm.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.15;
      leftLeg.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.1;
      rightLeg.current.rotation.x = Math.sin(t * 1.5) * 0.1;
      
      // Head looking around gently
      head.current.rotation.y = Math.sin(t * 0.8) * 0.2;
      head.current.rotation.z = Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group position={[0, -0.5, 0]} scale={1.2}>
        
        {/* Head Group */}
        <group ref={head} position={[0, 2.2, 0]}>
          {/* Main Head */}
          <RoundedBox args={[1.2, 1.1, 1.2]} radius={0.3} smoothness={4}>
            <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          {/* Cyber Visor / Glasses */}
          <RoundedBox args={[1.3, 0.4, 0.4]} radius={0.1} smoothness={4} position={[0, 0.1, 0.5]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} toneMapped={false} />
          </RoundedBox>
          {/* Headphones / Ears */}
          <RoundedBox args={[0.2, 0.5, 0.5]} radius={0.1} smoothness={4} position={[-0.65, 0, 0]}>
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.8} />
          </RoundedBox>
          <RoundedBox args={[0.2, 0.5, 0.5]} radius={0.1} smoothness={4} position={[0.65, 0, 0]}>
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.8} />
          </RoundedBox>
        </group>

        {/* Torso */}
        <RoundedBox args={[1.4, 1.6, 0.8]} radius={0.2} smoothness={4} position={[0, 0.8, 0]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.5}
            temporalDistortion={0.0}
            color="#ffffff"
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Inner Glowing Core inside the Torso */}
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} smoothness={4} position={[0, 0.8, 0]}>
           <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
        </RoundedBox>

        {/* Left Arm */}
        <group position={[-0.9, 1.4, 0]}>
          <group ref={leftArm} position={[0, 0, 0]}>
            <RoundedBox args={[0.3, 1.2, 0.3]} radius={0.1} smoothness={4} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
            </RoundedBox>
          </group>
        </group>

        {/* Right Arm */}
        <group position={[0.9, 1.4, 0]}>
          <group ref={rightArm} position={[0, 0, 0]}>
            <RoundedBox args={[0.3, 1.2, 0.3]} radius={0.1} smoothness={4} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
            </RoundedBox>
          </group>
        </group>

        {/* Left Leg */}
        <group position={[-0.4, 0, 0]}>
          <group ref={leftLeg}>
            <RoundedBox args={[0.4, 1.2, 0.4]} radius={0.1} smoothness={4} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#333333" roughness={0.6} metalness={0.2} />
            </RoundedBox>
            {/* Sneaker */}
            <RoundedBox args={[0.5, 0.3, 0.7]} radius={0.1} smoothness={4} position={[0, -1.0, 0.1]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </RoundedBox>
          </group>
        </group>

        {/* Right Leg */}
        <group position={[0.4, 0, 0]}>
          <group ref={rightLeg}>
            <RoundedBox args={[0.4, 1.2, 0.4]} radius={0.1} smoothness={4} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#333333" roughness={0.6} metalness={0.2} />
            </RoundedBox>
            {/* Sneaker */}
            <RoundedBox args={[0.5, 0.3, 0.7]} radius={0.1} smoothness={4} position={[0, -1.0, 0.1]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </RoundedBox>
          </group>
        </group>

      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing bg-black/40 rounded-3xl">
      <Canvas camera={{ position: [0, 1.5, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-5, 5, -5]} intensity={2} color="#10b981" />
        
        <StylizedArtBoy />
        
        {/* Environment map for highly realistic reflections on the glass and metal */}
        <Environment preset="city" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3} 
        />
      </Canvas>
    </div>
  );
}
