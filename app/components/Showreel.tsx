"use client";

import dynamic from "next/dynamic";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ShowreelItem } from "./ShowreelScene";

const ShowreelScene = dynamic(() => import("./ShowreelScene"), { ssr: false });

const pad = (value: number) => String(value).padStart(2, "0");

export default function Showreel({ items }: { items: ShowreelItem[] }) {
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const autoplay = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Track how far the visitor has scrolled through the pinned section
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      progress.current = value;
      if (bar.current) bar.current.style.transform = `scaleX(${value})`;
      setIndex(Math.min(Math.round(value * (items.length - 1)), items.length - 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length]);

  // Load the 3D scene shortly before it scrolls into view, and pause it when off screen
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const stop = useCallback(() => {
    if (autoplay.current) window.cancelAnimationFrame(autoplay.current);
    autoplay.current = null;
    setPlaying(false);
  }, []);

  // Autoplay scrolls through the section like a video; any manual input stops it
  const play = useCallback(() => {
    const element = section.current;
    if (!element) return;
    if (autoplay.current) {
      stop();
      return;
    }
    const start = element.getBoundingClientRect().top + window.scrollY;
    const end = start + element.offsetHeight - window.innerHeight;
    const from = progress.current >= 0.99 ? start : Math.max(window.scrollY, start);
    const duration = ((end - from) / Math.max(end - start, 1)) * items.length * 2600;
    const began = performance.now();
    setPlaying(true);

    const step = (now: number) => {
      const t = Math.min((now - began) / Math.max(duration, 1), 1);
      window.scrollTo({ top: from + (end - from) * t, behavior: "instant" });
      if (t < 1) {
        autoplay.current = window.requestAnimationFrame(step);
      } else {
        autoplay.current = null;
        setPlaying(false);
      }
    };
    autoplay.current = window.requestAnimationFrame(step);
  }, [items.length, stop]);

  useEffect(() => {
    const cancel = () => {
      if (autoplay.current) stop();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      if (autoplay.current) window.cancelAnimationFrame(autoplay.current);
    };
  }, [stop]);

  return (
    <section
      ref={section}
      id="showreel"
      className="showreel"
      aria-label="3D showreel of selected projects"
      style={{ height: `calc(100vh + ${items.length * 60}vh)` }}
    >
      <div className="showreel-sticky">
        <div className="showreel-canvas" aria-hidden="true">
          {mounted && <ShowreelScene items={items} progress={progress} active={active} />}
        </div>

        <div className="showreel-overlay section-shell">
          <div className="showreel-head">
            <p className="section-number">Showreel</p>
            <h2>Fly through my work in 3D.</h2>
            <p>Scroll to travel through each project, or press play and watch it run.</p>
            <button type="button" className="showreel-play" onClick={play}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play showreel"}
            </button>
          </div>

          <div className="showreel-foot">
            <span className="showreel-count">
              {pad(index + 1)} <span>/ {pad(items.length)}</span>
            </span>
            <div className="showreel-rail">
              <div ref={bar} className="showreel-bar" />
            </div>
            <span className="showreel-current" aria-live="polite">
              {items[index]?.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
