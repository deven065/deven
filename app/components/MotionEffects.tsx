"use client";

import { useEffect, useRef } from "react";

export default function MotionEffects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      root.classList.add("motion-reduced");
      return;
    }

    root.classList.add("motion-enabled");

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const revealTimers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-visible");
          observer.unobserve(entry.target);

          const delay = Number(element.dataset.delay ?? 0) * 80;
          revealTimers.push(
            window.setTimeout(() => {
              element.removeAttribute("data-reveal");
              element.classList.remove("is-visible");
            }, 760 + delay),
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));

    let frame = 0;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const profile = document.querySelector<HTMLElement>(".profile-card");
    const onPointerMove = (event: PointerEvent) => {
      if (!profile || event.pointerType === "touch") return;
      const bounds = profile.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      profile.style.setProperty("--tilt-x", `${y * -4}deg`);
      profile.style.setProperty("--tilt-y", `${x * 5}deg`);
    };
    const resetTilt = () => {
      profile?.style.setProperty("--tilt-x", "0deg");
      profile?.style.setProperty("--tilt-y", "0deg");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    profile?.addEventListener("pointermove", onPointerMove);
    profile?.addEventListener("pointerleave", resetTilt);
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      profile?.removeEventListener("pointermove", onPointerMove);
      profile?.removeEventListener("pointerleave", resetTilt);
      revealTimers.forEach((timer) => window.clearTimeout(timer));
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}
