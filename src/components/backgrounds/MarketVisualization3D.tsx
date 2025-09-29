import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

// Stock Price Chart Lines
function StockChartLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  const chartData = useMemo(() => {
    const charts = [];
    for (let i = 0; i < 15; i++) {
      const points = [];
      const basePrice = 100 + Math.random() * 200;
      
      for (let j = 0; j < 20; j++) {
        const x = (j - 10) * 0.8;
        const y = basePrice + (Math.random() - 0.5) * 20 + Math.sin(j * 0.3) * 10;
        const z = (i - 7) * 2;
        points.push(new THREE.Vector3(x, y / 50 - 3, z));
      }
      
      charts.push({
        points,
        color: Math.random() > 0.6 ? "#00ff88" : Math.random() > 0.3 ? "#ff4444" : "#4466ff",
      });
    }
    return charts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {chartData.map((chart, index) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(chart.points);
        
        return (
          <line key={index}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial 
              color={chart.color} 
              transparent 
              opacity={0.8}
            />
          </line>
        );
      })}
    </group>
  );
}

// Floating Market Indicators
function MarketIndicators() {
  const groupRef = useRef<THREE.Group>(null);
  
  const indicators = useMemo(() => [
    { symbol: "₹", position: [-8, 2, -3], color: "#00ff88" },
    { symbol: "$", position: [6, -1, 2], color: "#4466ff" },
    { symbol: "€", position: [-4, -3, 5], color: "#ff6644" },
    { symbol: "¥", position: [8, 3, -2], color: "#ffaa00" },
    { symbol: "₿", position: [0, 4, -6], color: "#ff9900" },
    { symbol: "📈", position: [-6, 0, 4], color: "#00ff88" },
    { symbol: "📊", position: [4, -2, -4], color: "#8844ff" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      indicators.forEach((_, index) => {
        const indicator = groupRef.current?.children[index];
        if (indicator) {
          const time = state.clock.elapsedTime;
          indicator.position.y += Math.sin(time + index) * 0.001;
          indicator.rotation.y = time * (0.5 + index * 0.1);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {indicators.map((indicator, index) => (
        <Text
          key={index}
          position={indicator.position as [number, number, number]}
          fontSize={1.2}
          color={indicator.color}
          anchorX="center"
          anchorY="middle"
        >
          {indicator.symbol}
        </Text>
      ))}
    </group>
  );
}

// Market Data Particles
function MarketDataParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    const colors = new Float32Array(1500 * 3);
    
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Market themed colors
      const colorType = Math.random();
      if (colorType > 0.7) {
        colors[i * 3] = 0.2; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.5; // Green
      } else if (colorType > 0.4) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.3; // Red
      } else {
        colors[i * 3] = 0.3; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1.0; // Blue
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const MarketVisualization3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={1.0} color="#00ff88" />
        <pointLight position={[-15, -10, -15]} intensity={0.8} color="#4466ff" />
        <spotLight position={[0, 20, 0]} intensity={0.6} color="#ffffff" />
        
        <MarketDataParticles />
        <StockChartLines />
        <MarketIndicators />
        
        {/* Central Market Globe */}
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={0.2}
            wireframe
            emissive="#4466ff"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default MarketVisualization3D;