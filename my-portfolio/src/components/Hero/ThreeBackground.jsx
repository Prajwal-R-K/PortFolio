import React, { useMemo } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function FloatingBox({ position = [0,0,0], color = '#22d3ee', speed = 1 }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
      </mesh>
      <pointLight position={[1.5, 1, 2]} intensity={0.8} color={color} />
    </group>
  );
}

function Particles({ count = 400 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 14; // x
      arr[i3 + 1] = (Math.random() - 0.5) * 8;  // y
      arr[i3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return arr;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#93c5fd" sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 2]} intensity={0.8} />
        <Particles />
        <group position={[0, 0, 0]}>
          <FloatingBox position={[-2.2, 0.8, -1]} color="#22d3ee" />
          <FloatingBox position={[2.1, -0.3, -0.8]} color="#6366f1" />
          <FloatingBox position={[0.2, 1.1, 0.2]} color="#06b6d4" />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
