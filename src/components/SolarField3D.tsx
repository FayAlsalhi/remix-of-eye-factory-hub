import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// ============ Single Solar Panel ============
const SolarPanel = ({ position }: { position: [number, number, number] }) => {
  // Create a panel with subtle cell grid using a canvas texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 384;
    const ctx = canvas.getContext('2d')!;

    // Dark blue panel base
    const grad = ctx.createLinearGradient(0, 0, 256, 384);
    grad.addColorStop(0, '#0a2540');
    grad.addColorStop(0.5, '#0d1f3a');
    grad.addColorStop(1, '#08182d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 384);

    // 6 x 9 cells
    const cols = 6;
    const rows = 9;
    const cw = 256 / cols;
    const ch = 384 / rows;

    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.lineWidth = 2;
    for (let i = 1; i < cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cw, 0);
      ctx.lineTo(i * cw, 384);
      ctx.stroke();
    }
    for (let j = 1; j < rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * ch);
      ctx.lineTo(256, j * ch);
      ctx.stroke();
    }

    // Cell highlights (subtle teal sheen)
    ctx.strokeStyle = 'rgba(80, 200, 220, 0.18)';
    ctx.lineWidth = 1;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(i * cw + 4, j * ch + 4);
        ctx.lineTo(i * cw + cw - 4, j * ch + 4);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group position={position}>
      {/* Panel surface */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2, 0.05, 3]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.7}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[2.05, 0.02, 3.05]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.9} roughness={0.4} />
      </mesh>
      {/* Support post */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#2a3a4a" metalness={0.8} roughness={0.5} />
      </mesh>
    </group>
  );
};

// ============ Pulsing Inspection Node ============
const InspectionNode = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    if (ref.current) {
      const s = 1 + Math.sin(t * 2) * 0.15;
      ref.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      const s = 1 + ((t * 0.5) % 1) * 2;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - ((t * 0.5) % 1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#5ee9ff" />
      </mesh>
      <pointLight color="#5ee9ff" intensity={2} distance={3} />
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[0.1, 0.12, 32]} />
        <meshBasicMaterial color="#5ee9ff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// ============ Drone (small flying marker) ============
const Drone = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.3;
    if (ref.current) {
      ref.current.position.x = Math.sin(t) * 6;
      ref.current.position.z = Math.cos(t) * 4 - 2;
      ref.current.position.y = 3 + Math.sin(t * 2) * 0.2;
      ref.current.rotation.y = -t + Math.PI / 2;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
      </mesh>
      <pointLight color="#f59e42" intensity={1.5} distance={2} />
    </group>
  );
};

// ============ Field of panels ============
const PanelField = () => {
  const panels: [number, number, number][] = [];
  const cols = 7;
  const rows = 5;
  const spacingX = 2.4;
  const spacingZ = 3.6;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      panels.push([
        (c - (cols - 1) / 2) * spacingX,
        0,
        (r - (rows - 1) / 2) * spacingZ,
      ]);
    }
  }
  return (
    <>
      {panels.map((p, i) => (
        <SolarPanel key={i} position={p} />
      ))}
    </>
  );
};

// ============ Scene ============
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle rotation for life
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.6}
        color="#88c0ff"
      />
      <directionalLight
        position={[-5, 6, -5]}
        intensity={0.3}
        color="#5ee9ff"
      />
      {/* Ground fog/glow */}
      <fog attach="fog" args={['#050d1a', 12, 32]} />

      <group ref={groupRef}>
        {/* Tilt panels slightly toward sun */}
        <group rotation={[-0.25, 0, 0]} position={[0, 0.2, 0]}>
          <PanelField />
        </group>

        {/* Inspection nodes hovering above some panels */}
        <InspectionNode position={[-3, 1.2, -3]} delay={0} />
        <InspectionNode position={[2, 1.2, -1]} delay={0.5} />
        <InspectionNode position={[-1, 1.2, 2]} delay={1} />
        <InspectionNode position={[4, 1.2, 3]} delay={1.5} />
        <InspectionNode position={[-4, 1.2, 4]} delay={0.8} />

        {/* Roaming drone */}
        <Drone />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#040a14" roughness={1} metalness={0} />
        </mesh>
      </group>
    </>
  );
};

const SolarField3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 5, 11], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
};

export default SolarField3D;
