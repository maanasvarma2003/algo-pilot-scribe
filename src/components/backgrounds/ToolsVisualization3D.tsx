import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Box, Sphere, Cone, Text } from "@react-three/drei";
import * as THREE from "three";

// Trading Tools Array
function TradingToolsArray() {
  const groupRef = useRef<THREE.Group>(null);
  
  const tools = useMemo(() => {
    const toolTypes = [
      { shape: 'box', color: '#4466ff' },
      { shape: 'sphere', color: '#00ff88' },
      { shape: 'cone', color: '#ff6644' },
      { shape: 'cylinder', color: '#ffaa00' },
    ];
    
    const toolsData = [];
    for (let i = 0; i < 30; i++) {
      const tool = toolTypes[Math.floor(Math.random() * toolTypes.length)];
      toolsData.push({
        ...tool,
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 25,
        ],
        scale: 0.4 + Math.random() * 0.6,
        rotationSpeed: 0.01 + Math.random() * 0.02,
      });
    }
    return toolsData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.005;
      
      groupRef.current.children.forEach((tool, index) => {
        tool.rotation.x += tools[index].rotationSpeed;
        tool.rotation.y += tools[index].rotationSpeed * 0.7;
        tool.position.y += Math.sin(time + index * 0.5) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {tools.map((tool, index) => {
        const ToolComponent = tool.shape === 'box' ? Box : 
                              tool.shape === 'sphere' ? Sphere :
                              tool.shape === 'cone' ? Cone : Box;
        
        const args = tool.shape === 'box' ? [tool.scale, tool.scale, tool.scale] :
                     tool.shape === 'sphere' ? [tool.scale] :
                     tool.shape === 'cone' ? [tool.scale * 0.5, tool.scale] :
                     [tool.scale];

        return (
          <ToolComponent
            key={index}
            args={args as any}
            position={tool.position as [number, number, number]}
          >
            <meshStandardMaterial
              color={tool.color}
              transparent
              opacity={0.7}
              emissive={tool.color}
              emissiveIntensity={0.15}
              roughness={0.3}
              metalness={0.7}
            />
          </ToolComponent>
        );
      })}
    </group>
  );
}

// Tool Connection Network
function ToolNetwork() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2200 * 3);
    const colors = new Float32Array(2200 * 3);
    
    for (let i = 0; i < 2200; i++) {
      // Create network-like distribution
      const cluster = Math.floor(i / 100);
      const centerX = (cluster % 5 - 2) * 8;
      const centerZ = (Math.floor(cluster / 5) - 2) * 8;
      
      positions[i * 3] = centerX + (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = centerZ + (Math.random() - 0.5) * 6;
      
      // Tool network colors
      const hue = (cluster / 22) * 360;
      colors[i * 3] = Math.sin(hue * Math.PI / 180) * 0.5 + 0.5; // R
      colors[i * 3 + 1] = Math.sin((hue + 120) * Math.PI / 180) * 0.5 + 0.5; // G
      colors[i * 3 + 2] = Math.sin((hue + 240) * Math.PI / 180) * 0.5 + 0.5; // B
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      
      // Pulse effect
      const time = state.clock.elapsedTime;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Tool Labels
function ToolLabels() {
  const groupRef = useRef<THREE.Group>(null);
  
  const labels = useMemo(() => [
    { text: "CALC", position: [-8, 3, 2], color: "#4466ff" },
    { text: "CHART", position: [6, 1, -4], color: "#00ff88" },
    { text: "SCAN", position: [-2, -3, 5], color: "#ff6644" },
    { text: "ALERT", position: [8, -1, 1], color: "#ffaa00" },
    { text: "BOT", position: [-6, 2, -3], color: "#aa44ff" },
    { text: "API", position: [2, 4, 2], color: "#44ffaa" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.01;
      
      labels.forEach((_, index) => {
        const label = groupRef.current?.children[index];
        if (label) {
          label.position.y += Math.sin(time * 1.5 + index * 2) * 0.001;
          label.rotation.z = Math.sin(time + index) * 0.1;
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
          fontSize={0.7}
          color={label.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {label.text}
        </Text>
      ))}
    </group>
  );
}

// Central Hub
function CentralHub() {
  const hubRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (hubRef.current) {
      const time = state.clock.elapsedTime;
      hubRef.current.rotation.x = time * 0.2;
      hubRef.current.rotation.y = time * 0.3;
      
      // Breathing effect
      const scale = 1 + Math.sin(time * 1.5) * 0.1;
      hubRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={hubRef} position={[0, 0, 0]}>
      <Sphere args={[1.2]}>
        <meshStandardMaterial
          color="#6644aa"
          transparent
          opacity={0.3}
          emissive="#6644aa"
          emissiveIntensity={0.4}
          wireframe
        />
      </Sphere>
      <Sphere args={[0.8]}>
        <meshStandardMaterial
          color="#4466ff"
          transparent
          opacity={0.6}
          emissive="#4466ff"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
}

const ToolsVisualization3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 16], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 10, 10]} intensity={0.9} color="#4466ff" />
        <pointLight position={[-15, -10, -10]} intensity={0.7} color="#00ff88" />
        <pointLight position={[0, 15, 5]} intensity={0.5} color="#ff6644" />
        
        <ToolNetwork />
        <TradingToolsArray />
        <ToolLabels />
        <CentralHub />
      </Canvas>
    </div>
  );
};

export default ToolsVisualization3D;