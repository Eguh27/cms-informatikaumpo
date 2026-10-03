import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function useHeroScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<0 | 1>(0);
  const currentStep = useRef<0 | 1>(0);
  const isLocked = useRef(false);

  // Transition: Step 0 (Opening) -> Step 1 (Zoomed + Visi Keilmuan)
  const goToStep1 = useCallback(() => {
    if (isLocked.current || currentStep.current === 1) return;
    isLocked.current = true;
    currentStep.current = 1;
    setStep(1);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // Buffer timeout after animation completes so user can read text comfortably without accidental skip
        setTimeout(() => {
          isLocked.current = false;
        }, 1500);
      },
    });

    // 1. Clouds part outward smoothly and steadily
    tl.to(".hero-clouds-one", { x: -170, y: -45, scale: 1.15, duration: 1.5, ease: "power2.inOut" }, 0);
    tl.to(".hero-clouds-two", { x: 170, y: -35, scale: 1.15, duration: 1.5, ease: "power2.inOut" }, 0);

    // 2. Building zooms in smoothly (transformOrigin: "center 22%" keeps dome/roof clearly visible)
    tl.to(
      "[data-hero-building]",
      { scale: 1.34, transformOrigin: "center 22%", duration: 1.6, ease: "power2.out" },
      0
    );
    // Parallax background placeholder translates and scales subtly
    tl.to(
      "[data-hero-backdrop]",
      { scale: 1.12, y: -25, duration: 1.6, ease: "power2.out" },
      0
    );
    // Foreground garden moves slightly for depth
    tl.to(
      "[data-hero-foreground]",
      { scale: 1.06, y: 12, duration: 1.5, ease: "power2.out" },
      0
    );

    // 3. Primary text & stats animate out gently
    tl.to(
      "[data-hero-content-primary]",
      { y: -30, opacity: 0, pointerEvents: "none", duration: 0.6, ease: "power2.inOut" },
      0
    );
    tl.to(
      "[data-hero-stats]",
      { y: -20, opacity: 0, pointerEvents: "none", duration: 0.55, ease: "power2.inOut" },
      0
    );

    // 4. Secondary text (Visi Keilmuan) animates in with clear staggered rhythm for great readability
    tl.set("[data-hero-content-second]", { pointerEvents: "auto", opacity: 1 }, 0.4);
    tl.fromTo(
      ".hero-second-glass",
      { y: 45, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: "power3.out" },
      0.45
    );
    tl.fromTo(
      ".hero-content-second .hero-eyebrow",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      0.6
    );
    tl.fromTo(
      ".hero-second-title",
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      0.7
    );
    tl.fromTo(
      ".hero-second-desc",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.85
    );
    tl.fromTo(
      ".hero-content-second .feature-pill",
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" },
      0.95
    );
    tl.fromTo(
      ".hero-content-second .hero-actions",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      1.1
    );
  }, []);

  // Transition: Step 1 (Zoomed + Visi) -> Step 0 (Opening)
  const goToStep0 = useCallback(() => {
    if (isLocked.current || currentStep.current === 0) return;
    isLocked.current = true;
    currentStep.current = 0;
    setStep(0);

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setTimeout(() => {
          isLocked.current = false;
        }, 600);
      },
    });

    // 1. Clouds return to center
    tl.to(".hero-clouds-one", { x: 0, y: 0, scale: 1, duration: 1.2 }, 0);
    tl.to(".hero-clouds-two", { x: 0, y: 0, scale: 1, duration: 1.2 }, 0);

    // 2. Building and layers return to initial scale
    tl.to("[data-hero-building]", { scale: 1.0, duration: 1.2 }, 0);
    tl.to("[data-hero-backdrop]", { scale: 1.0, y: 0, duration: 1.2 }, 0);
    tl.to("[data-hero-foreground]", { scale: 1.0, y: 0, duration: 1.2 }, 0);

    // 3. Secondary text animates out
    tl.to(
      ".hero-second-glass",
      { y: 30, opacity: 0, scale: 0.97, duration: 0.5 },
      0
    );
    tl.set("[data-hero-content-second]", { pointerEvents: "none" }, 0.5);

    // 4. Primary text & stats return
    tl.to(
      "[data-hero-content-primary]",
      { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.7, ease: "power2.out" },
      0.4
    );
    tl.to(
      "[data-hero-stats]",
      { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.65, ease: "power2.out" },
      0.45
    );
  }, []);

  // Intro animation on load
  useGSAP(
    () => {
      if (!heroRef.current) return;
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.fromTo("[data-hero-backdrop]", { scale: 1.06, opacity: 0 }, { scale: 1.0, opacity: 1, duration: 1.2 }, 0);
      intro.fromTo("[data-hero-building]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.05);
      intro.fromTo("[data-hero-foreground]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.1);
      intro.fromTo(".hero-clouds-one", { x: -60, opacity: 0 }, { x: 0, opacity: 0.65, duration: 1.1 }, 0.15);
      intro.fromTo(".hero-clouds-two", { x: 60, opacity: 0 }, { x: 0, opacity: 0.45, duration: 1.1 }, 0.2);
      intro.fromTo(".hero-content-primary .hero-content-glass", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.25);
      intro.fromTo("[data-hero-title]", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.3);
      intro.fromTo("[data-hero-subtitle]", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.55);
      intro.fromTo("[data-hero-cta] > *", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0.65);
      intro.fromTo("[data-hero-icon]", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05 }, 0.6);
      intro.fromTo("[data-hero-stats]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.75);
      intro.fromTo("[data-hero-scroll-indicator]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.95);

      // Initial state: Step 2 hidden
      gsap.set("[data-hero-content-second]", { opacity: 0, y: 35, pointerEvents: "none" });
      gsap.set("[data-hero-building]", { transformOrigin: "center 22%" });

      // Cloud idle drift
      gsap.to(".hero-clouds-one", {
        x: "+=12", y: "-=4",
        duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".hero-clouds-two", {
        x: "-=10", y: "-=3",
        duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Scroll indicator pulse
      gsap.to("[data-hero-scroll-indicator] b", {
        y: 5, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    },
    { scope: heroRef, dependencies: [] }
  );

  // Wheel and touch listeners for true 3D Product Showcase interaction:
  // Scroll 1 -> Only triggers text transition & zoom in Section 1 (requires deliberate scroll)
  // Scroll 2 -> Allows moving to Section 2 (Profil) after reading buffer
  useEffect(() => {
    let accumulatedDelta = 0;
    let deltaResetTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      // If user has already scrolled down into content sections, allow natural scroll
      if (window.scrollY > 20) {
        return;
      }

      // If transition animation or lock buffer is running, absorb all wheel input
      if (isLocked.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        // User scrolling DOWN
        if (currentStep.current === 0) {
          // FIRST SCROLL: Intercept, require deliberate scroll (accumulated delta >= 60)
          e.preventDefault();
          accumulatedDelta += e.deltaY;

          if (deltaResetTimer) clearTimeout(deltaResetTimer);
          deltaResetTimer = setTimeout(() => {
            accumulatedDelta = 0;
          }, 350);

          if (accumulatedDelta >= 60) {
            accumulatedDelta = 0;
            goToStep1();
          }
        } else {
          // SECOND SCROLL: In Step 1, after cooldown buffer expires, deliberate scroll glides to Section 2
          accumulatedDelta += e.deltaY;
          if (deltaResetTimer) clearTimeout(deltaResetTimer);
          deltaResetTimer = setTimeout(() => {
            accumulatedDelta = 0;
          }, 350);

          if (accumulatedDelta >= 50) {
            accumulatedDelta = 0;
            document.getElementById("profil")?.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (e.deltaY < 0) {
        // User scrolling UP
        if (currentStep.current === 1) {
          // Revert back from Step 1 to Step 0 deliberately
          e.preventDefault();
          accumulatedDelta += Math.abs(e.deltaY);

          if (deltaResetTimer) clearTimeout(deltaResetTimer);
          deltaResetTimer = setTimeout(() => {
            accumulatedDelta = 0;
          }, 350);

          if (accumulatedDelta >= 50) {
            accumulatedDelta = 0;
            goToStep0();
          }
        } else {
          accumulatedDelta = 0;
        }
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (window.scrollY > 20) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 45) return;

      if (isLocked.current) return;

      if (deltaY > 0) {
        // Swipe UP (scroll down)
        if (currentStep.current === 0) {
          goToStep1();
        } else {
          document.getElementById("profil")?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Swipe DOWN (scroll up)
        if (currentStep.current === 1) {
          goToStep0();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 20) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentStep.current === 0) {
          e.preventDefault();
          goToStep1();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (currentStep.current === 1) {
          e.preventDefault();
          goToStep0();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (deltaResetTimer) clearTimeout(deltaResetTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goToStep0, goToStep1]);

  return { heroRef, step, goToStep0, goToStep1 };
}
