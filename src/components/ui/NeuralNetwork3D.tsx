"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";
const NUM_NODES = 120;
const CONNECTION_DISTANCE = 3.2;
const CONNECTION_DISTANCE_SQ =
  CONNECTION_DISTANCE * CONNECTION_DISTANCE;

function Network() {
  const pointsRef =
    useRef<
      THREE.Points<
        THREE.BufferGeometry,
        THREE.PointsMaterial
      >
    >(null!);

  const linesRef =
    useRef<
      THREE.LineSegments<
        THREE.BufferGeometry,
        THREE.LineBasicMaterial
      >
    >(null!);

  const { mouse } = useThree();

  const dataRef = useRef<{
    positions: Float32Array;
    velocities: Float32Array;
    linePositions: Float32Array;
    lineColors: Float32Array;
  } | null>(null);

  // Initialize once
  if (!dataRef.current) {
    const positions = new Float32Array(NUM_NODES * 3);
    const velocities = new Float32Array(NUM_NODES * 3);

    const maxLines = NUM_NODES * NUM_NODES;

    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    for (let i = 0; i < NUM_NODES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] =
        (Math.random() - 0.5) * 0.01;

      velocities[i * 3 + 1] =
        (Math.random() - 0.5) * 0.01;

      velocities[i * 3 + 2] =
        (Math.random() - 0.5) * 0.01;
    }

    dataRef.current = {
      positions,
      velocities,
      linePositions,
      lineColors,
    };
  }

  const {
    positions,
    velocities,
    linePositions,
    lineColors,
  } = dataRef.current;

  useFrame((state) => {
    let lineIndex = 0;

    // Smooth camera movement
    state.camera.position.x +=
      (mouse.x * 2 -
        state.camera.position.x) *
      0.02;

    state.camera.position.y +=
      (mouse.y * 2 -
        state.camera.position.y) *
      0.02;

    state.camera.lookAt(0, 0, 0);

    for (let i = 0; i < NUM_NODES; i++) {
      // Update positions
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] +=
        velocities[i * 3 + 1];
      positions[i * 3 + 2] +=
        velocities[i * 3 + 2];

      // Bounce boundaries
      if (Math.abs(positions[i * 3]) > 10)
        velocities[i * 3] *= -1;

      if (
        Math.abs(positions[i * 3 + 1]) > 10
      )
        velocities[i * 3 + 1] *= -1;

      if (
        Math.abs(positions[i * 3 + 2]) > 5
      )
        velocities[i * 3 + 2] *= -1;

      // Mouse interaction
      const mouseX = mouse.x * 10;
      const mouseY = mouse.y * 10;

      const dxMouse =
        mouseX - positions[i * 3];

      const dyMouse =
        mouseY - positions[i * 3 + 1];

      const mouseDistSq =
        dxMouse * dxMouse +
        dyMouse * dyMouse;

      if (mouseDistSq < 16) {
        positions[i * 3] += dxMouse * 0.002;
        positions[i * 3 + 1] +=
          dyMouse * 0.002;
      }

      // Connections
      for (let j = i + 1; j < NUM_NODES; j++) {
        const dx =
          positions[i * 3] -
          positions[j * 3];

        const dy =
          positions[i * 3 + 1] -
          positions[j * 3 + 1];

        const dz =
          positions[i * 3 + 2] -
          positions[j * 3 + 2];

        const distSq =
          dx * dx + dy * dy + dz * dz;

        if (
          distSq < CONNECTION_DISTANCE_SQ
        ) {
          const alpha =
            1 -
            distSq /
            CONNECTION_DISTANCE_SQ;

          // Line positions
          linePositions[lineIndex * 6] =
            positions[i * 3];

          linePositions[
            lineIndex * 6 + 1
          ] = positions[i * 3 + 1];

          linePositions[
            lineIndex * 6 + 2
          ] = positions[i * 3 + 2];

          linePositions[
            lineIndex * 6 + 3
          ] = positions[j * 3];

          linePositions[
            lineIndex * 6 + 4
          ] = positions[j * 3 + 1];

          linePositions[
            lineIndex * 6 + 5
          ] = positions[j * 3 + 2];

          // Colors
          const r = 0.13;
          const g = 0.83;
          const b = 0.93;

          lineColors[lineIndex * 6] =
            r * alpha;

          lineColors[
            lineIndex * 6 + 1
          ] = g * alpha;

          lineColors[
            lineIndex * 6 + 2
          ] = b * alpha;

          lineColors[
            lineIndex * 6 + 3
          ] = r * alpha;

          lineColors[
            lineIndex * 6 + 4
          ] = g * alpha;

          lineColors[
            lineIndex * 6 + 5
          ] = b * alpha;

          lineIndex++;
        }
      }
    }

    // Update particles
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate =
        true;
    }

    // Update lines
    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(
        0,
        lineIndex * 2
      );

      linesRef.current.geometry.attributes.position.needsUpdate =
        true;

      linesRef.current.geometry.attributes.color.needsUpdate =
        true;
    }
  });

  return (
    <group>
      {/* PARTICLES */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.08}
          color="#22d3ee"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* CONNECTION LINES */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />

          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>

        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 12],
          fov: 60,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
      >
        {/* Fog */}
        <fog
          attach="fog"
          args={["#020617", 8, 22]}
        />

        {/* Neural Network */}
        <Network />

        {/* Glow */}
        <EffectComposer multisampling={2}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.3}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}