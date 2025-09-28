import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Box, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Strategy Building Blocks
function StrategyBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  
  const blocks = useMemo(() => {
    const blockData = [];
    for (let i = 0; i < 25; i++) {
      blockData.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.3 + Math.random() * 0.5,
        color: ["#4466ff", "#00ff88", "#ff6644", "#ffaa00", "#aa44ff"][Math.floor(Math.random() * 5)],
      });
    }
    return blockData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      groupRef.current.children.forEach((block, index) => {
        const time = state.clock.elapsedTime;
        block.rotation.x = time * (0.2 + index * 0.01);
        block.rotation.z = time * (0.15 + index * 0.005);
        
        // Floating animation
        const originalY = blocks[index].position[1];
        block.position.y = originalY + Math.sin(time + index) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((block, index) => (
        <Box
          key={index}
          args={[block.scale, block.scale, block.scale]}
          position={block.position as [number, number, number]}
        >
          <meshStandardMaterial
            color={block.color}
            transparent
            opacity={0.8}
            emissive={block.color}
            emissiveIntensity={0.1}
          />
        </Box>
      ))}
    </group>
  );
}

// Algorithm Flow Particles
function AlgoFlowParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Create flowing pattern
      const angle = (i / 2000) * Math.PI * 4;
      const radius = 3 + (i % 20) * 0.5;
      
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (i / 100) - 10 + Math.sin(angle * 2) * 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      
      // Strategy colors
      const t = i / 2000;
      colors[i * 3] = 0.2 + t * 0.6; // R
      colors[i * 3 + 1] = 0.4 + Math.sin(t * Math.PI) * 0.4; // G
      colors[i * 3 + 2] = 1.0 - t * 0.3; // B
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.y = time * 0.05;
      
      // Animate colors
      const colors = ref.current.geometry.attributes.color.array;
      for (let i = 0; i < colors.length; i += 3) {
        const wave = Math.sin(time + i * 0.01);
        colors[i + 1] = 0.4 + wave * 0.3; // Animate green channel
      }
      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Strategy Labels
function StrategyLabels() {
  const groupRef = useRef<THREE.Group>(null);
  
  const labels = useMemo(() => [
    { text: "IF", position: [-6, 3, 2], color: "#4466ff" },
    { text: "THEN", position: [4, 1, -3], color: "#00ff88" },
    { text: "ELSE", position: [-2, -2, 4], color: "#ff6644" },
    { text: "RSI", position: [6, -1, 1], color: "#ffaa00" },
    { text: "MACD", position: [-4, 2, -5], color: "#aa44ff" },
    { text: "SMA", position: [2, 4, 3], color: "#44ffaa" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.02;
      
      labels.forEach((_, index) => {
        const label = groupRef.current?.children[index];
        if (label) {
          label.position.y += Math.sin(time + index * 2) * 0.002;
          label.rotation.y = time + index;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {labels.map((label, index) => (
        <Text
          key={index}
          position={label.position as [number, number, number]}
          fontSize={0.8}
          color={label.color}
          anchorX="center"
          anchorY="middle"
        >
          {label.text}
        </Text>
      ))}
    </group>
  );
}

const StrategyVisualization3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4466ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00ff88" />
        <directionalLight position={[0, 5, 5]} intensity={0.4} color="#ffffff" />
        
        <AlgoFlowParticles />
        <StrategyBlocks />
        <StrategyLabels />
        
        {/* Central Processing Unit */}
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#4466ff"
            transparent
            opacity={0.3}
            emissive="#4466ff"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default StrategyVisualization3D;