"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Palette = {
  accent: string;
  secondary: string;
  background: string;
};

const RADIUS = 2;
const ARC_COUNT = 16;

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue("--accent").trim() || "#1d4ed8",
    secondary: styles.getPropertyValue("--cyan").trim() || "#0f766e",
    background: styles.getPropertyValue("--bg").trim() || "#fafbfd",
  };
}

// Deterministic random so the scene looks the same on every visit
function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * ring * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * ring * radius;
  }
  return positions;
}

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.95)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

function buildArcs(positions: Float32Array, count: number) {
  const random = seededRandom(42);
  const arcs: { curve: THREE.QuadraticBezierCurve3; speed: number; offset: number }[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  while (arcs.length < ARC_COUNT) {
    const i = Math.floor(random() * count);
    const j = Math.floor(random() * count);
    a.fromArray(positions, i * 3);
    b.fromArray(positions, j * 3);
    const angle = a.angleTo(b);
    if (angle < 0.7 || angle > 2.1) continue;

    const mid = a
      .clone()
      .add(b)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(RADIUS * (1.18 + angle * 0.14));
    arcs.push({
      curve: new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone()),
      speed: 0.12 + random() * 0.14,
      offset: random(),
    });
  }
  return arcs;
}

function Globe({
  palette,
  pointCount,
  reducedMotion,
}: {
  palette: Palette;
  pointCount: number;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const packets = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => fibonacciSphere(pointCount, RADIUS), [pointCount]);
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const arcs = useMemo(() => buildArcs(positions, pointCount), [positions, pointCount]);

  // Pulsing signal rings where each arc lands
  const pings = useMemo(
    () =>
      arcs.map(({ curve }, index) => {
        const end = curve.v2.clone();
        const normal = end.clone().normalize();
        return {
          position: end.multiplyScalar(1.006),
          quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
          offset: (index * 0.137) % 1,
        };
      }),
    [arcs],
  );
  const pingRefs = useRef<(THREE.Mesh | null)[]>([]);

  const arcLines = useMemo(
    () =>
      arcs.map(({ curve }, index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
        const material = new THREE.LineBasicMaterial({
          color: index % 3 === 0 ? palette.secondary : palette.accent,
          transparent: true,
          opacity: 0.45,
        });
        return new THREE.Line(geometry, material);
      }),
    [arcs, palette],
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(
    () => () => {
      dotTexture.dispose();
      arcLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    },
    [dotTexture, arcLines],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (g) {
      const scroll = window.scrollY * 0.0016;
      const targetY = (reducedMotion ? 0.6 : t * 0.07) + scroll + pointer.current.x * 0.5;
      const targetX = 0.32 + pointer.current.y * 0.25;
      const ease = Math.min(delta * 3, 1);
      g.rotation.y += (targetY - g.rotation.y) * ease;
      g.rotation.x += (targetX - g.rotation.x) * ease;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.18;
    if (ringB.current) ringB.current.rotation.z = -t * 0.12;

    arcs.forEach((arc, index) => {
      const packet = packets.current[index];
      if (!packet) return;
      const progress = (t * arc.speed + arc.offset) % 1;
      packet.position.copy(arc.curve.getPoint(progress));
      const fade = Math.sin(progress * Math.PI);
      packet.scale.setScalar(0.4 + fade * 0.9);
    });

    pings.forEach((ping, index) => {
      const mesh = pingRefs.current[index];
      if (!mesh) return;
      const phase = (t * 0.45 + ping.offset) % 1;
      mesh.scale.setScalar(0.3 + phase * 1.6);
      (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.7;
    });
  });

  return (
    <group ref={group} rotation={[0.32, 0.6, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.accent}
          size={0.055}
          map={dotTexture}
          transparent
          alphaTest={0.05}
          depthWrite
          sizeAttenuation
        />
      </points>

      {arcLines.map((line, index) => (
        <primitive key={index} object={line} />
      ))}

      {arcs.map((_, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            packets.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={index % 3 === 0 ? palette.secondary : palette.accent} />
        </mesh>
      ))}

      {pings.map((ping, index) => (
        <mesh
          key={index}
          position={ping.position}
          quaternion={ping.quaternion}
          ref={(mesh) => {
            pingRefs.current[index] = mesh;
          }}
        >
          <ringGeometry args={[0.07, 0.085, 32]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? palette.secondary : palette.accent}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[RADIUS * 1.004, 2]} />
        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={0.07} />
      </mesh>

      {/* Dims everything on the far side of the globe for depth */}
      <mesh renderOrder={10}>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color={palette.background} transparent opacity={0.72} depthWrite={false} />
      </mesh>

      <group rotation={[1.15, 0.2, 0]}>
        <group ref={ringA}>
          <mesh>
            <torusGeometry args={[2.62, 0.005, 8, 200]} />
            <meshBasicMaterial color={palette.accent} transparent opacity={0.35} />
          </mesh>
          <mesh position={[2.62, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={palette.accent} />
          </mesh>
        </group>
      </group>

      <group rotation={[-0.9, -0.5, 0.3]}>
        <group ref={ringB}>
          <mesh>
            <torusGeometry args={[2.86, 0.004, 8, 200]} />
            <meshBasicMaterial color={palette.secondary} transparent opacity={0.28} />
          </mesh>
          <mesh position={[0, 2.86, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={palette.secondary} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Distant drifting particles that move slower than the globe for parallax depth
function Starfield({ palette, count }: { palette: Palette; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const positions = useMemo(() => {
    const random = seededRandom(7);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const direction = new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize();
      direction.multiplyScalar(3.4 + random() * 3.2);
      array.set([direction.x, direction.y, direction.z], i * 3);
    }
    return array;
  }, [count]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      dotTexture.dispose();
    };
  }, [dotTexture]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const ease = Math.min(delta * 2, 1);
    const targetY = state.clock.elapsedTime * 0.015 + pointer.current.x * 0.15;
    const targetX = pointer.current.y * 0.1;
    points.rotation.y += (targetY - points.rotation.y) * ease;
    points.rotation.x += (targetX - points.rotation.x) * ease;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={palette.accent}
        size={0.035}
        map={dotTexture}
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  const container = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<Palette | null>(null);
  const [visible, setVisible] = useState(true);
  const [settings] = useState(() => ({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    pointCount: window.innerWidth < 700 ? 520 : 900,
  }));

  useEffect(() => {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setPalette(readPalette());
    update();
    scheme.addEventListener("change", update);
    return () => scheme.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const [contextKey, setContextKey] = useState(0);
  const frameloop = settings.reducedMotion ? "demand" : visible ? "always" : "never";

  return (
    <div ref={container} className="hero-scene-canvas">
      {palette && (
        <Canvas
          key={contextKey}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
                window.setTimeout(() => setContextKey((key) => key + 1), 300);
              },
              { once: true },
            );
          }}
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          frameloop={frameloop}
        >
          <Starfield palette={palette} count={settings.pointCount < 900 ? 160 : 320} />
          <Globe
            palette={palette}
            pointCount={settings.pointCount}
            reducedMotion={settings.reducedMotion}
          />
        </Canvas>
      )}
    </div>
  );
}
