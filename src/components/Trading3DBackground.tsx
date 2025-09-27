import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Trading Chart Particles Component
function TradingParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Create a trading chart-like distribution
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color based on position (green for positive, red for negative, blue for neutral)
      if (y > 0) {
        colors[i * 3] = 0.2; // R
        colors[i * 3 + 1] = 0.8; // G
        colors[i * 3 + 2] = 0.3; // B
      } else if (y < -2) {
        colors[i * 3] = 0.9; // R
        colors[i * 3 + 1] = 0.2; // G
        colors[i * 3 + 2] = 0.2; // B
      } else {
        colors[i * 3] = 0.3; // R
        colors[i * 3 + 1] = 0.6; // G
        colors[i * 3 + 2] = 1.0; // B
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating Trading Cubes
function TradingCubes() {
  const cubesRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => {
    const cubesData = [];
    for (let i = 0; i < 50; i++) {
      cubesData.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 25,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.1 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? "#00ff88" : "#ff4444",
      });
    }
    return cubesData;
  }, []);

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      cubesRef.current.children.forEach((cube, index) => {
        cube.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.01);
        cube.rotation.z = state.clock.elapsedTime * (0.3 + index * 0.01);
        cube.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001;
      });
    }
  });

  return (
    <group ref={cubesRef}>
      {cubes.map((cube, index) => (
        <mesh key={index} position={cube.position as [number, number, number]} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            transparent
            opacity={0.6}
            emissive={cube.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Chart Lines Component
function ChartLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const linesData = [];
    for (let i = 0; i < 20; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 10;
      const startZ = (Math.random() - 0.5) * 20;
      
      for (let j = 0; j < 10; j++) {
        points.push(new THREE.Vector3(
          startX + j * 0.5,
          startY + (Math.random() - 0.5) * 2,
          startZ
        ));
      }
      
      linesData.push({
        points,
        color: Math.random() > 0.5 ? "#00ff88" : "#ff4444",
      });
    }
    return linesData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={line.points.length}
              array={new Float32Array(line.points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={line.color} transparent opacity={0.8} />
        </line>
      ))}
    </group>
  );
}

// Main 3D Background Component
const Trading3DBackground = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#4466ff" />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#ff4444" />
        
        <TradingParticles />
        <TradingCubes />
        <ChartLines />
        
        {/* Central Glowing Sphere */}
        <Sphere args={[0.5]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#4466ff"
            transparent
            opacity={0.3}
            emissive="#4466ff"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default Trading3DBackground;