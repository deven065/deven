"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

export type ShowreelItem = {
  title: string;
  status: string;
  summary: string;
  stack: string[];
};

const SPACING = 7;
const BG = "#050b18";
const ACCENT = "#6ea8ff";
const TEAL = "#5eead4";

const pad = (value: number) => String(value).padStart(2, "0");

function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function makeSoftTexture(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

function makePanelTexture(item: ShowreelItem, index: number, total: number, font: string) {
  const width = 1024;
  const height = 640;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#0d1830");
  background.addColorStop(1, "#13295a");
  ctx.beginPath();
  ctx.roundRect(4, 4, width - 8, height - 8, 36);
  ctx.fillStyle = background;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(110, 168, 255, 0.6)";
  ctx.stroke();

  ctx.fillStyle = ACCENT;
  ctx.font = `600 28px ${font}`;
  ctx.fillText(`${pad(index + 1)} / ${pad(total)}`, 56, 88);

  const label = item.status.toUpperCase();
  ctx.font = `700 21px ${font}`;
  const labelWidth = ctx.measureText(label).width;
  ctx.beginPath();
  ctx.roundRect(width - 56 - labelWidth - 36, 56, labelWidth + 36, 44, 22);
  ctx.fillStyle = "rgba(94, 234, 212, 0.12)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(94, 234, 212, 0.55)";
  ctx.stroke();
  ctx.fillStyle = TEAL;
  ctx.fillText(label, width - 56 - labelWidth - 18, 86);

  ctx.fillStyle = "#f1f5fb";
  ctx.font = `700 58px ${font}`;
  const titleLines = wrapText(ctx, item.title, width - 112).slice(0, 2);
  titleLines.forEach((line, i) => ctx.fillText(line, 56, 196 + i * 68));

  ctx.fillStyle = "#a9b8cf";
  ctx.font = `400 29px ${font}`;
  const summaryTop = 196 + titleLines.length * 68 + 22;
  const allLines = wrapText(ctx, item.summary, width - 112);
  const summaryLines = allLines.slice(0, 4);
  if (allLines.length > 4) summaryLines[3] = `${summaryLines[3].replace(/[.,;:]?$/, "")}…`;
  summaryLines.forEach((line, i) => ctx.fillText(line, 56, summaryTop + i * 42));

  ctx.font = `600 22px ${font}`;
  let x = 56;
  for (const tech of item.stack) {
    const chipWidth = ctx.measureText(tech).width + 32;
    if (x + chipWidth > width - 56) break;
    ctx.beginPath();
    ctx.roundRect(x, height - 104, chipWidth, 46, 23);
    ctx.fillStyle = "rgba(110, 168, 255, 0.14)";
    ctx.fill();
    ctx.fillStyle = "#cfe0ff";
    ctx.fillText(tech, x + 16, height - 73);
    x += chipWidth + 12;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function Flythrough({
  items,
  progress,
  font,
  lite,
}: {
  items: ShowreelItem[];
  progress: RefObject<number>;
  font: string;
  lite: boolean;
}) {
  const size = useThree((state) => state.size);
  const narrow = size.width < size.height;
  const distance = narrow ? 9 : 6;
  const panels = useRef<(THREE.Group | null)[]>([]);
  const glows = useRef<(THREE.Mesh | null)[]>([]);
  const faces = useRef<(THREE.Mesh | null)[]>([]);
  const rings = useRef<THREE.Group>(null);
  const smooth = useRef(0);

  const length = (items.length - 1) * SPACING;

  const textures = useMemo(
    () => items.map((item, index) => makePanelTexture(item, index, items.length, font)),
    [items, font],
  );
  const glowTexture = useMemo(() => makeSoftTexture(256), []);
  const dotTexture = useMemo(() => makeSoftTexture(64), []);

  useEffect(
    () => () => {
      textures.forEach((texture) => texture.dispose());
      glowTexture.dispose();
      dotTexture.dispose();
    },
    [textures, glowTexture, dotTexture],
  );

  const layout = useMemo(
    () =>
      items.map((_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return {
          x: side * (narrow ? 0.3 : 1.7),
          y: ((index % 3) - 1) * 0.22 - (narrow ? 0.7 : 0),
          z: -index * SPACING,
          rotY: side * (narrow ? 0.14 : 0.36),
          side,
        };
      }),
    [items, narrow],
  );

  const ringPositions = useMemo(
    () => Array.from({ length: Math.ceil((length + 20) / 3) }, (_, i) => 8 - i * 3),
    [length],
  );

  const dust = useMemo(() => {
    const random = seededRandom(11);
    const count = lite ? 700 : 1600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2;
      const radius = 2.6 + random() * 5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = 10 - random() * (length + 26);
    }
    return positions;
  }, [length, lite]);

  useFrame((state, delta) => {
    smooth.current += ((progress.current ?? 0) - smooth.current) * Math.min(delta * 4, 1);
    const travel = smooth.current * length;
    const cameraZ = distance - travel;
    const focus = travel / SPACING;
    const current = Math.min(Math.floor(focus), items.length - 1);
    const next = Math.min(current + 1, items.length - 1);
    const blend = smoothstep(Math.min(focus - current, 1));
    const sideX = THREE.MathUtils.lerp(layout[current].x, layout[next].x, blend);
    const t = state.clock.elapsedTime;
    const camera = state.camera;

    camera.position.x += (sideX * 0.28 - camera.position.x) * Math.min(delta * 3, 1);
    camera.position.y = Math.sin(t * 0.4) * 0.06;
    camera.position.z = cameraZ;
    camera.lookAt(sideX * 0.6, 0, cameraZ - distance);

    layout.forEach((slot, index) => {
      const group = panels.current[index];
      if (!group) return;
      const nearness = Math.min(Math.abs(focus - index), 1);
      // Once the camera passes a panel, it slides out of the flight path and fades
      const away = smoothstep(Math.min(Math.max(focus - index, 0), 1));
      group.position.x = slot.x + slot.side * away * (narrow ? 3.6 : 2.4);
      group.position.y = slot.y + Math.sin(t * 0.6 + index) * 0.06;
      group.rotation.y = slot.rotY + slot.side * away * 0.5 + Math.sin(t * 0.3 + index) * 0.03;
      group.scale.setScalar(1 - nearness * 0.08);
      const face = faces.current[index];
      if (face) (face.material as THREE.MeshBasicMaterial).opacity = 1 - away * 0.85;
      const glow = glows.current[index];
      if (glow) {
        (glow.material as THREE.MeshBasicMaterial).opacity = (0.12 + (1 - nearness) * 0.4) * (1 - away);
      }
    });

    rings.current?.children.forEach((ring, index) => {
      const z = ringPositions[index];
      const closeness = 1 - Math.min(Math.abs(z - (cameraZ - 4)) / 14, 1);
      const material = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = 0.05 + closeness * 0.4;
      ring.rotation.z = t * 0.05 * (index % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 6, 26]} />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={ACCENT}
          size={0.045}
          map={dotTexture}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <group ref={rings}>
        {ringPositions.map((z, index) => (
          <mesh key={z} position={[0, 0, z]} rotation={[0, 0, index * 0.4]}>
            <torusGeometry args={[3.5, 0.008, 8, 6 + (index % 2) * 194]} />
            <meshBasicMaterial
              color={index % 4 === 0 ? TEAL : ACCENT}
              transparent
              opacity={0.2}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <gridHelper
        args={[Math.max(80, length + 40), 80, ACCENT, "#16264a"]}
        position={[0, -2.4, -length / 2]}
        onUpdate={(grid) => {
          const material = grid.material as THREE.Material;
          material.transparent = true;
          material.opacity = 0.35;
        }}
      />

      {layout.map((slot, index) => (
        <group
          key={index}
          position={[slot.x, slot.y, slot.z]}
          rotation={[0, slot.rotY, 0]}
          ref={(group) => {
            panels.current[index] = group;
          }}
        >
          <mesh
            position={[0, 0, -0.08]}
            ref={(mesh) => {
              glows.current[index] = mesh;
            }}
          >
            <planeGeometry args={[5.4, 3.8]} />
            <meshBasicMaterial
              map={glowTexture}
              color={index % 3 === 0 ? TEAL : ACCENT}
              transparent
              opacity={0.2}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh
            ref={(mesh) => {
              faces.current[index] = mesh;
            }}
          >
            <planeGeometry args={[3.2, 2]} />
            <meshBasicMaterial map={textures[index]} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function ShowreelScene({
  items,
  progress,
  active,
}: {
  items: ShowreelItem[];
  progress: RefObject<number>;
  active: boolean;
}) {
  const [font, setFont] = useState<string | null>(null);
  const [lite] = useState(() => window.innerWidth < 700);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFont(getComputedStyle(document.body).fontFamily);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const [contextKey, setContextKey] = useState(0);

  if (!font) return null;

  return (
    <Canvas
      key={contextKey}
      camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 60 }}
      dpr={lite ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={({ gl }) => {
        // Browsers can drop the GPU context (backgrounded tabs, low memory); rebuild the scene when that happens
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            window.setTimeout(() => setContextKey((key) => key + 1), 300);
          },
          { once: true },
        );
      }}
    >
      <Flythrough items={items} progress={progress} font={font} lite={lite} />
    </Canvas>
  );
}
