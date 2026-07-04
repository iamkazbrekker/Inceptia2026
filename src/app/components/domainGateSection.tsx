"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const domains = [
  {
    title: "AI & ML",
    description:
      "Build intelligent machine learning models, neural networks, and self-directing software agents to solve automated challenges.",
    icon: "/emblems/aiml.svg",
    accentColor: "#f87171",
    glowColor: "rgba(239, 68, 68, 0.45)",
  },
  {
    title: "Web3 & Fintech",
    description:
      "Develop decentralized financial protocols, cryptographic ledger applications, custom smart contracts, and secure blockchain code.",
    icon: "/emblems/web3.svg",
    accentColor: "#60a5fa",
    glowColor: "rgba(59, 130, 246, 0.45)",
  },
  {
    title: "Healthcare",
    description:
      "Forge biotech applications, digital diagnostic systems, medical support portals, and assistive technologies to improve patient accessibility.",
    icon: "/emblems/healthcare.svg",
    accentColor: "#facc15",
    glowColor: "rgba(245, 158, 11, 0.45)",
  },
  {
    title: "Education",
    description:
      "Design interactive digital classrooms, game-based learning environments, simulation systems, and training interfaces.",
    icon: "/emblems/education.svg",
    accentColor: "#34d399",
    glowColor: "rgba(16, 185, 129, 0.45)",
  },
  {
    title: "Open Innovation",
    description:
      "A category dedicated to any groundbreaking technology, software solutions, or physical prototype that does not fit into the other four domains.",
    icon: "/emblems/otherinnovation.svg",
    accentColor: "#a78bfa",
    glowColor: "rgba(139, 92, 246, 0.45)",
  },
];

const TOTAL_STEPS = 5;

export default function DomainGateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    step: 0,
    entryDirection: null as "down" | "up" | null, // which way the user scrolled to enter
    animating: false,
    isActive: false,
    locked: false,
    introPlaying: false,
    lastStepTime: 0,
    lastWheelTime: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stage = stageRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const leftContent = leftContentRef.current;
    const rightContent = rightContentRef.current;
    if (!section || !title || !stage || !left || !right) return;

    // ── Update domain content inside a panel ─────────────────────────
    function setDomainContent(contentEl: HTMLDivElement | null, domainIndex: number) {
      if (!contentEl) return;
      const d = domains[domainIndex];
      if (!d) return;
      const img = contentEl.querySelector<HTMLImageElement>(".domain-icon");
      const titleEl = contentEl.querySelector<HTMLElement>(".domain-title");
      const descEl = contentEl.querySelector<HTMLElement>(".domain-desc");
      if (img) { img.src = d.icon; img.alt = d.title; }
      if (titleEl) { titleEl.textContent = d.title; (titleEl as HTMLElement).style.color = d.accentColor; }
      if (descEl) descEl.textContent = d.description;
    }

    const state = stateRef.current;
    const container = document.getElementById("main-scroll-container");

    // ── Scroll helpers ─────────────────────────────────────────────
    function lockScroll() {
      if (container) container.style.overflowY = "hidden";
      state.locked = true;
    }
    function unlockScroll() {
      if (container) container.style.overflowY = "scroll";
      state.locked = false;
    }

    // ── Reset everything to initial hidden state ───────────────────
    function reset() {
      gsap.killTweensOf([left, right, title, stage]);
      state.step = 0;
      state.entryDirection = null;
      state.animating = false;
      state.introPlaying = false;
      state.lastStepTime = 0;
      // Panels off-screen
      gsap.set(left, { x: "-100vw" });
      gsap.set(right, { x: "100vw" });
      // Title and stage hidden
      gsap.set(title, { opacity: 0, y: 24 });
      gsap.set(stage, { opacity: 0 });
    }

    // ── Play entry intro (fade-in), then kick off first panel ──────
    function playIntro() {
      state.introPlaying = true;
      gsap.timeline({
        onComplete: () => {
          state.introPlaying = false;
          runStep(); // first panel slides in right after intro
        }
      })
        .to(title, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" })
        .to(stage, { opacity: 1, duration: 0.35, ease: "none" }, "-=0.25");
    }

    // ── Called when a step animation finishes ──────────────────────
    function onStepComplete(nextStep: number) {
      state.step = nextStep;
      state.animating = false;
    }

    // ── Advance one animation step ─────────────────────────────────
    function runStep() {
      const now = Date.now();
      if (state.animating || state.introPlaying || state.step > TOTAL_STEPS) return;

      // Short cooldown — just enough to prevent double-fires, not enough to feel sluggish
      if (now - state.lastStepTime < 500) return;
      state.lastStepTime = now;

      state.animating = true;

      const step = state.step;

      if (step === TOTAL_STEPS) {
        // All 5 panels shown → exit animation + unlock scroll so the page moves
        unlockScroll();
        const lastWasLeft = (step - 1) % 2 === 0;
        if (lastWasLeft) {
          gsap.to(left, {
            x: "-100vw", duration: 0.35, ease: "power3.in",
            onComplete: () => { state.animating = false; state.step++; },
          });
        } else {
          gsap.to(right, {
            x: "100vw", duration: 0.35, ease: "power3.in",
            onComplete: () => { state.animating = false; state.step++; },
          });
        }
        return;
      }

      const showLeft = step % 2 === 0;

      // Map step → domain index (0-4) and load content before animating
      const domainIndex = step; // step 0=AI&ML, 1=Web3, 2=Healthcare, 3=Education, 4=OpenInnovation
      if (step === 0) {
        // First: left slides in from the left to center (x: 0)
        setDomainContent(leftContent, domainIndex);
        gsap.to(left, {
          x: 0, duration: 0.45, ease: "power3.out",
          onComplete: () => onStepComplete(1),
        });
      } else if (showLeft) {
        // Swap: right exits right, left enters from left — simultaneous
        setDomainContent(leftContent, domainIndex);
        gsap.to(right, { x: "100vw", duration: 0.32, ease: "power3.in" });
        gsap.to(left, {
          x: 0, duration: 0.45, ease: "power3.out", delay: 0.06,
          onComplete: () => onStepComplete(step + 1),
        });
      } else {
        // Swap: left exits left, right enters from right — simultaneous
        setDomainContent(rightContent, domainIndex);
        gsap.to(left, { x: "-100vw", duration: 0.32, ease: "power3.in" });
        gsap.to(right, {
          x: 0, duration: 0.45, ease: "power3.out", delay: 0.06,
          onComplete: () => onStepComplete(step + 1),
        });
      }
    }

    // ── Wheel handler ──────────────────────────────────────────────
    function onWheel(e: WheelEvent) {
      if (!state.isActive || !state.locked) return;
      // Let intro play out undisturbed
      if (state.introPlaying) { e.preventDefault(); e.stopPropagation(); return; }

      const now = Date.now();
      const timeSinceLastWheel = now - state.lastWheelTime;
      state.lastWheelTime = now;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // Record entry direction on first meaningful wheel event
      if (state.entryDirection === null) {
        if (goingDown) state.entryDirection = "down";
        else if (goingUp) state.entryDirection = "up";
        else return;
      }

      // Accept scrolls that match the entry direction (the direction the user
      // was scrolling when they arrived at this section)
      const correctDir =
        (state.entryDirection === "down" && goingDown) ||
        (state.entryDirection === "up" && goingUp);

      // Trackpad inertia guard — shorter cooldowns for snappier feel
      if (timeSinceLastWheel < 150) {
        if (now - state.lastStepTime < 800) {
          if (correctDir) { e.preventDefault(); e.stopPropagation(); }
          return;
        }
      } else {
        if (now - state.lastStepTime < 500) {
          if (correctDir) { e.preventDefault(); e.stopPropagation(); }
          return;
        }
      }

      if (correctDir) {
        e.preventDefault();
        e.stopPropagation();
        runStep();
      }
    }

    // ── IntersectionObserver ───────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowVisible = entry.isIntersecting && entry.intersectionRatio >= 0.8;
          const wasActive = state.isActive;
          state.isActive = nowVisible;

          if (nowVisible && !wasActive) {
            reset();
            lockScroll();
            playIntro(); // fade in, then auto-run step 0
          }

          if (!nowVisible && wasActive && state.locked) {
            unlockScroll();
          }
        });
      },
      { root: container, threshold: 0.8 }
    );

    observer.observe(section);
    container?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      observer.disconnect();
      container?.removeEventListener("wheel", onWheel);
      unlockScroll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="domain-gate"
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden mt-0 pt-0"
    >
      <h1
        ref={titleRef}
        className="text-5xl font-bold text-white font-harry-potter drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-8"
        style={{ opacity: 0 }}
      >
        Choose Your Domain
      </h1>

      {/* Slide stage — overflow:hidden clips off-screen panels */}
      <div
        ref={stageRef}
        className="relative w-full h-[550px] overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Left panel */}
        <div ref={leftRef} className="absolute inset-0 w-full h-full flex items-center justify-start pr-64">
          <svg viewBox="0 0 700 420" className="w-auto h-full object-contain animate-[pulse_6s_ease-in-out_infinite]" style={{ pointerEvents: 'none' }}>
            <defs>
              <clipPath id="left-gate-clip">
                <path d="M 90,95 A 45,45 0 0 1 135,50 L 520,50 C 470,55 330,170 330,340 L 135,340 A 45,45 0 0 1 90,295 Z" />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="700" height="420" clipPath="url(#left-gate-clip)">
              <div className="w-full h-full bg-white/5 backdrop-blur-md" />
            </foreignObject>
            <path
              d="M 90,95 A 45,45 0 0 1 135,50 L 520,50 C 470,55 330,170 330,340 L 135,340 A 45,45 0 0 1 90,295 Z"
              fill="none"
              stroke="rgba(255, 215, 0, 0.4)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right panel ── mirrors left */}
        <div ref={rightRef} className="absolute inset-0 w-full h-full flex items-center justify-end pl-64">
          <svg viewBox="0 0 700 420" className="w-auto h-full object-contain scale-x-[-1] animate-[pulse_6s_ease-in-out_infinite]" style={{ pointerEvents: 'none' }}>
            <defs>
              <clipPath id="right-gate-clip">
                <path d="M 90,95 A 45,45 0 0 1 135,50 L 520,50 C 470,55 330,170 330,340 L 135,340 A 45,45 0 0 1 90,295 Z" />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="700" height="420" clipPath="url(#right-gate-clip)">
              <div className="w-full h-full bg-white/5 backdrop-blur-md" />
            </foreignObject>
            <path
              d="M 90,95 A 45,45 0 0 1 135,50 L 520,50 C 470,55 330,170 330,340 L 135,340 A 45,45 0 0 1 90,295 Z"
              fill="none"
              stroke="rgba(255, 215, 0, 0.4)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
