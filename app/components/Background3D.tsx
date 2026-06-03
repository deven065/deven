"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function WaveParticles() {
  const ref = useRef<THREE.Points>(null!);
  
  const count = 4000;
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    let i = 0;
    // Create a grid of points
    for (let x = 0; x < 80; x++) {
      for (let z = 0; z < 50; z++) {
        if (i >= count) break;
        positions[i * 3] = (x - 40) * 0.4; // Spread X
        positions[i * 3 + 1] = 0;          // Base Y
        positions[i * 3 + 2] = (z - 25) * 0.4; // Spread Z
        i++;
      }
    }
    return [positions];
  }, [count]);

  const time = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      time.current += delta;
      const t = time.current;
      const positionsAttr = ref.current.geometry.attributes.position;
      
      for (let i = 0; i < count; i++) {
        const x = positionsAttr.getX(i);
        const z = positionsAttr.getZ(i);
        
        // Complex sine wave math for a flowing liquid terrain effect
        const y = Math.sin(x * 0.2 + t * 0.5) * Math.cos(z * 0.2 + t * 0.3) * 1.5
                + Math.sin(x * 0.1 - t * 0.2) * 0.5;
        
        positionsAttr.setY(i, y);
      }
      positionsAttr.needsUpdate = true;
      
      // Slight gentle rocking of the entire field
      ref.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]} position={[0, -2, -8]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3f3f46" // zinc-700
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        <fog attach="fog" args={["#050505", 5, 15]} />
        <WaveParticles />
      </Canvas>
    </div>
  );
}
