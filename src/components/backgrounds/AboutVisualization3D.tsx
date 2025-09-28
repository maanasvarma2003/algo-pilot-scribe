import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Text, Torus, Ring } from "@react-three/drei";
import * as THREE from "three";

// Company DNA Helix
function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null);
  
  const helixPoints = useMemo(() => {
    const points1 = [];
    const points2 = [];
    
    for (let i = 0; i < 200; i++) {
      const t = i * 0.1;
      const radius = 3;
      
      // First strand
      points1.push(new THREE.Vector3(
        Math.cos(t) * radius,
        t * 0.3 - 10,
        Math.sin(t) * radius
      ));
      
      // Second strand (opposite)
      points2.push(new THREE.Vector3(
        Math.cos(t + Math.PI) * radius,
        t * 0.3 - 10,
        Math.sin(t + Math.PI) * radius
      ));
    }
    
    return { points1, points2 };
  }, []);

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      helixRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={helixRef}>
      {/* First DNA strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints.points1.length}
            array={new Float32Array(helixPoints.points1.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4466ff" transparent opacity={0.8} linewidth={4} />
      </line>
      
      {/* Second DNA strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints.points2.length}
            array={new Float32Array(helixPoints.points2.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff88" transparent opacity={0.8} linewidth={4} />
      </line>
      
      {/* Connection points */}
      {helixPoints.points1.slice(0, 50).map((point, index) => (
        <Sphere key={index} args={[0.1]} position={[point.x, point.y, point.z]}>
          <meshStandardMaterial
            color="#4466ff"
            emissive="#4466ff"
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Innovation Orbits
function InnovationOrbits() {
  const orbitsRef = useRef<THREE.Group>(null);
  
  const orbits = useMemo(() => [
    { radius: 5, speed: 0.5, color: "#4466ff", count: 8 },
    { radius: 7, speed: -0.3, color: "#00ff88", count: 12 },
    { radius: 9, speed: 0.2, color: "#ff6644", count: 16 },
  ], []);

  useFrame((state) => {
    if (orbitsRef.current) {
      const time = state.clock.elapsedTime;
      
      orbits.forEach((orbit, orbitIndex) => {
        const orbitGroup = orbitsRef.current?.children[orbitIndex] as THREE.Group;
        if (orbitGroup) {
          orbitGroup.rotation.y = time * orbit.speed;
          orbitGroup.rotation.x = Math.sin(time * 0.3) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={orbitsRef}>
      {orbits.map((orbit, orbitIndex) => (
        <group key={orbitIndex}>
          {/* Orbit ring */}
          <Ring args={[orbit.radius - 0.1, orbit.radius + 0.1, 64]}>
            <meshBasicMaterial
              color={orbit.color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </Ring>
          
          {/* Orbiting spheres */}
          {Array.from({ length: orbit.count }, (_, i) => {
            const angle = (i / orbit.count) * Math.PI * 2;
            return (
              <Sphere
                key={i}
                args={[0.15]}
                position={[
                  Math.cos(angle) * orbit.radius,
                  0,
                  Math.sin(angle) * orbit.radius
                ]}
              >
                <meshStandardMaterial
                  color={orbit.color}
                  emissive={orbit.color}
                  emissiveIntensity={0.4}
                />
              </Sphere>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// Company Values Particles
function ValuesParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    const colors = new Float32Array(1500 * 3);
    
    for (let i = 0; i < 1500; i++) {
      // Spherical distribution
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 8 + Math.random() * 6;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Value-based colors
      const intensity = Math.random();
      colors[i * 3] = 0.3 + intensity * 0.4; // R
      colors[i * 3 + 1] = 0.5 + intensity * 0.5; // G
      colors[i * 3 + 2] = 0.8 + intensity * 0.2; // B
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.y = time * 0.02;
      ref.current.rotation.x = time * 0.01;
      
      // Gentle pulsing
      const scale = 1 + Math.sin(time) * 0.05;
      ref.current.scale.set(scale, scale, scale);
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

// Company Mission Text
function MissionText() {
  const textRef = useRef<THREE.Group>(null);
  
  const values = useMemo(() => [
    { text: "INNOVATION", position: [-6, 4, 0], color: "#4466ff" },
    { text: "TRUST", position: [6, 2, 0], color: "#00ff88" },
    { text: "EXCELLENCE", position: [0, -2, 6], color: "#ff6644" },
    { text: "GROWTH", position: [-4, -4, -4], color: "#ffaa00" },
  ], []);

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;
      textRef.current.rotation.y = time * 0.05;
      
      values.forEach((_, index) => {
        const text = textRef.current?.children[index];
        if (text) {
          text.position.y += Math.sin(time + index * Math.PI * 0.5) * 0.002;
          text.rotation.y = Math.sin(time * 0.7 + index) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={textRef}>
      {values.map((value, index) => (
        <Text
          key={index}
          position={value.position as [number, number, number]}
          fontSize={0.8}
          color={value.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {value.text}
        </Text>
      ))}
    </group>
  );
}

// Central Core
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      const time = state.clock.elapsedTime;
      coreRef.current.rotation.x = time * 0.1;
      coreRef.current.rotation.y = time * 0.15;
      
      // Core breathing
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Outer shell */}
      <Sphere args={[1.5]}>
        <meshStandardMaterial
          color="#2a2a4a"
          transparent
          opacity={0.1}
          wireframe
          emissive="#4466ff"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Inner core */}
      <Sphere args={[0.8]}>
        <meshStandardMaterial
          color="#4466ff"
          transparent
          opacity={0.7}
          emissive="#4466ff"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Energy rings */}
      <Torus args={[2, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
        />
      </Torus>
      
      <Torus args={[2.5, 0.05]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial
          color="#ff6644"
          emissive="#ff6644"
          emissiveIntensity={0.5}
        />
      </Torus>
    </group>
  );
}

const AboutVisualization3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4466ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00ff88" />
        <pointLight position={[0, 10, -10]} intensity={0.4} color="#ff6644" />
        
        <ValuesParticles />
        <DNAHelix />
        <InnovationOrbits />
        <MissionText />
        <CentralCore />
      </Canvas>
    </div>
  );
};

export default AboutVisualization3D;