import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Cylinder, Text, Torus } from "@react-three/drei";
import * as THREE from "three";

// Recording Signal Waves
function SignalWaves() {
  const groupRef = useRef<THREE.Group>(null);
  
  const waves = useMemo(() => {
    const waveData = [];
    for (let i = 0; i < 8; i++) {
      const points = [];
      for (let j = 0; j < 100; j++) {
        const x = (j - 50) * 0.2;
        const y = Math.sin(j * 0.1 + i) * 2;
        const z = i * 2 - 8;
        points.push(new THREE.Vector3(x, y, z));
      }
      waveData.push({
        points,
        color: `hsl(${120 + i * 30}, 70%, 60%)`,
      });
    }
    return waveData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.02;
      
      // Animate wave points
      waves.forEach((wave, waveIndex) => {
        wave.points.forEach((point, pointIndex) => {
          point.y = Math.sin(pointIndex * 0.1 + time * 2 + waveIndex) * (2 + Math.sin(time) * 0.5);
        });
      });
    }
  });

  return (
    <group ref={groupRef}>
      {waves.map((wave, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={wave.points.length}
              array={new Float32Array(wave.points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={wave.color} transparent opacity={0.8} linewidth={3} />
        </line>
      ))}
    </group>
  );
}

// Recording Microphones/Sensors
function RecordingSensors() {
  const groupRef = useRef<THREE.Group>(null);
  
  const sensors = useMemo(() => [
    { position: [-8, 4, 2], rotation: [0, 0, 0], color: "#ff4466" },
    { position: [6, -2, -4], rotation: [0.5, 0, 0], color: "#44ff66" },
    { position: [-3, -4, 6], rotation: [0, 0.5, 0], color: "#6644ff" },
    { position: [8, 2, -2], rotation: [0.3, 0.3, 0], color: "#ffaa44" },
    { position: [0, 6, 0], rotation: [0, 0, 0.5], color: "#44aaff" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      sensors.forEach((_, index) => {
        const sensor = groupRef.current?.children[index];
        if (sensor) {
          sensor.rotation.y = time * (0.5 + index * 0.2);
          sensor.position.y += Math.sin(time * 2 + index) * 0.003;
          
          // Pulsing effect
          const scale = 1 + Math.sin(time * 3 + index) * 0.1;
          sensor.scale.set(scale, scale, scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {sensors.map((sensor, index) => (
        <group key={index} position={sensor.position as [number, number, number]}>
          <Cylinder args={[0.3, 0.5, 1.5]} rotation={sensor.rotation as [number, number, number]}>
            <meshStandardMaterial
              color={sensor.color}
              transparent
              opacity={0.8}
              emissive={sensor.color}
              emissiveIntensity={0.2}
            />
          </Cylinder>
          <Torus args={[0.6, 0.1]} position={[0, 0.8, 0]}>
            <meshStandardMaterial
              color={sensor.color}
              transparent
              opacity={0.6}
              emissive={sensor.color}
              emissiveIntensity={0.3}
            />
          </Torus>
        </group>
      ))}
    </group>
  );
}

// Data Recording Particles
function RecordingParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1800 * 3);
    const colors = new Float32Array(1800 * 3);
    
    for (let i = 0; i < 1800; i++) {
      // Spiral pattern for data flow
      const angle = (i / 1800) * Math.PI * 8;
      const radius = 1 + (i / 1800) * 10;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (i / 100) - 9;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Recording theme colors
      const intensity = (i / 1800);
      colors[i * 3] = 1.0 - intensity * 0.5; // R
      colors[i * 3 + 1] = 0.2 + intensity * 0.6; // G
      colors[i * 3 + 2] = 0.4 + Math.sin(intensity * Math.PI) * 0.4; // B
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Flowing animation
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02; // Move upward
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10; // Reset position
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
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

// Recording Status Text
function RecordingStatusText() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;
      textRef.current.rotation.y = time * 0.3;
      
      // Pulsing glow effect
      const intensity = 0.3 + Math.sin(time * 4) * 0.2;
      (textRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={1.5}
      color="#ff4466"
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"
    >
      ● REC
    </Text>
  );
}

const RecorderVisualization3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 14], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[12, 8, 8]} intensity={0.9} color="#ff4466" />
        <pointLight position={[-12, -8, -8]} intensity={0.7} color="#44ff66" />
        <spotLight position={[0, 15, 0]} intensity={0.5} color="#ffffff" />
        
        <RecordingParticles />
        <SignalWaves />
        <RecordingSensors />
        <RecordingStatusText />
      </Canvas>
    </div>
  );
};

export default RecorderVisualization3D;