"use client";

import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const NUM_NODES = 100;
const MAX_LINES = (NUM_NODES * (NUM_NODES - 1)) / 2;
const CONNECTION_DISTANCE = 3.5;

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const [positions, velocities, linesPositions, linesColors] = useMemo(() => {
    const positions = new Float32Array(NUM_NODES * 3);
    const velocities = new Float32Array(NUM_NODES * 3);
    const linesPositions = new Float32Array(MAX_LINES * 6);
    const linesColors = new Float32Array(MAX_LINES * 6);

    for (let i = 0; i < NUM_NODES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    return [positions, velocities, linesPositions, linesColors];
  }, []);

  useFrame((state) => {
    let lineIndex = 0;

    // Smooth camera parallax based on mouse
    state.camera.position.x += (mouse.x * 3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.y * 3 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);

    for (let i = 0; i < NUM_NODES; i++) {
      // Update positions
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off invisible boundaries
      if (Math.abs(positions[i * 3]) > 12) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 12) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 6) velocities[i * 3 + 2] *= -1;

      // Subtle mouse attraction/repulsion for interactivity
      // Map mouse from normalized device coordinates to world roughly
      const mouseWorldX = mouse.x * 12;
      const mouseWorldY = mouse.y * 12;
      const dx = mouseWorldX - positions[i * 3];
      const dy = mouseWorldY - positions[i * 3 + 1];
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distToMouse < 4) {
        positions[i * 3] += dx * 0.005;
        positions[i * 3 + 1] += dy * 0.005;
      }

      // Calculate connections
      for (let j = i + 1; j < NUM_NODES; j++) {
        const dxLine = positions[i * 3] - positions[j * 3];
        const dyLine = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dzLine = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distLine = Math.sqrt(dxLine * dxLine + dyLine * dyLine + dzLine * dzLine);

        if (distLine < CONNECTION_DISTANCE) {
          const alpha = 1.0 - distLine / CONNECTION_DISTANCE;
          
          linesPositions[lineIndex * 6] = positions[i * 3];
          linesPositions[lineIndex * 6 + 1] = positions[i * 3 + 1];
          linesPositions[lineIndex * 6 + 2] = positions[i * 3 + 2];
          
          linesPositions[lineIndex * 6 + 3] = positions[j * 3];
          linesPositions[lineIndex * 6 + 4] = positions[j * 3 + 1];
          linesPositions[lineIndex * 6 + 5] = positions[j * 3 + 2];

          // Cyan color: RGB (0.13, 0.83, 0.93) - mapped to glow with AdditiveBlending
          const r = 0.13, g = 0.83, b = 0.93;
          // By multiplying the color by alpha and using AdditiveBlending, 
          // we simulate opacity fading out into the dark background naturally.
          linesColors[lineIndex * 6] = r * alpha;
          linesColors[lineIndex * 6 + 1] = g * alpha;
          linesColors[lineIndex * 6 + 2] = b * alpha;
          
          linesColors[lineIndex * 6 + 3] = r * alpha;
          linesColors[lineIndex * 6 + 4] = g * alpha;
          linesColors[lineIndex * 6 + 5] = b * alpha;

          lineIndex++;
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NUM_NODES}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#22d3ee"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_LINES * 2}
            array={linesPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={MAX_LINES * 2}
            array={linesColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        <fog attach="fog" args={["#020617", 8, 25]} />
        <Network />
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
