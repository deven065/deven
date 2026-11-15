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

    // Split section headings into words that rotate into place
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading h2, .contact-inner h2",
      ),
    );
    headings.forEach((heading) => {
      if (heading.dataset.split) return;
      const words = (heading.textContent ?? "").trim().split(/\s+/);
      heading.setAttribute("aria-label", words.join(" "));
      heading.textContent = "";
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--w", String(index));
        span.textContent = word;
        heading.append(span, index < words.length - 1 ? " " : "");
      });
      heading.dataset.split = "true";
      heading.classList.add("split-words");
    });
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          headingObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    headings.forEach((heading) => headingObserver.observe(heading));

    // Magnetic buttons that lean toward the cursor
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>(".button, .nav-cta"),
    );
    const onMagnetMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const button = event.currentTarget as HTMLElement;
      const bounds = button.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + bounds.height / 2);
      button.style.setProperty("--tx", `${dx * 0.18}px`);
      button.style.setProperty("--ty", `${dy * 0.28}px`);
    };
    const onMagnetLeave = (event: PointerEvent) => {
      const button = event.currentTarget as HTMLElement;
      button.style.setProperty("--tx", "0px");
      button.style.setProperty("--ty", "0px");
    };
    magnets.forEach((button) => {
      button.addEventListener("pointermove", onMagnetMove);
      button.addEventListener("pointerleave", onMagnetLeave);
    });

    // Animated number counters
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    counters.forEach((el) => {
      el.textContent = "0";
    });
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          counterObserver.unobserve(el);
          const target = Number(el.dataset.count ?? 0);
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) window.requestAnimationFrame(tick);
          };
          window.requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => counterObserver.observe(el));

    // Cursor spotlight on cards
    const spotlightCards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-card, .skill-group, .education-list article",
      ),
    );
    const onCardMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const card = event.currentTarget as HTMLElement;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--rx", `${y * -6}deg`);
      card.style.setProperty("--ry", `${x * 7}deg`);
    };
    const onCardLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    spotlightCards.forEach((card) => {
      card.addEventListener("pointermove", onCardMove);
      card.addEventListener("pointerleave", onCardLeave);
    });

    // Highlight the nav link for the section in view
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav-links a"),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href") ?? "");
      if (section) sectionObserver.observe(section);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    profile?.addEventListener("pointermove", onPointerMove);
    profile?.addEventListener("pointerleave", resetTilt);
    updateProgress();

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      headingObserver.disconnect();
      magnets.forEach((button) => {
        button.removeEventListener("pointermove", onMagnetMove);
        button.removeEventListener("pointerleave", onMagnetLeave);
      });
      sectionObserver.disconnect();
      spotlightCards.forEach((card) => {
        card.removeEventListener("pointermove", onCardMove);
        card.removeEventListener("pointerleave", onCardLeave);
      });
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
