import React, { useEffect, useRef, useCallback } from "react";

// Optimized DOM-based particle trail with throttling and pooling
export default function PointerBubblesDOM({
  density = 12,             // reduced from 24 - fewer particles per move
  maxParticles = 800,       // reduced from 1400
  sizeMin = 1,
  sizeMax = 3,
  drift = 40,
  duration = 900,
  throttleMs = 16,          // ~60fps throttling
}) {
  const containerRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const particlePool = useRef([]);
  const activeParticles = useRef(new Set());

  // Create reusable particle element
  const createParticleElement = useCallback(() => {
    const el = document.createElement("span");
    el.style.position = "absolute";
    el.style.borderRadius = "9999px";
    el.style.pointerEvents = "none";
    el.style.transform = "translate3d(0,0,0)";
    el.style.willChange = "transform, opacity";
    return el;
  }, []);

  // Get particle from pool or create new one
  const getParticle = useCallback(() => {
    if (particlePool.current.length > 0) {
      return particlePool.current.pop();
    }
    return createParticleElement();
  }, [createParticleElement]);

  // Return particle to pool
  const releaseParticle = useCallback((particle) => {
    if (particlePool.current.length < 100) { // limit pool size
      particle.style.transition = "";
      particle.style.transform = "translate3d(0,0,0)";
      particle.style.opacity = "0";
      particlePool.current.push(particle);
    }
  }, []);

  const spawnAt = useCallback((clientX, clientY) => {
    const container = containerRef.current;
    if (!container) return;
    // Only active in dark mode for a cleaner light theme
    const isDark = document.documentElement.classList.contains('dark');
    if (!isDark) return;

    // Throttle spawning
    const now = performance.now();
    if (now - lastSpawnTime.current < throttleMs) return;
    lastSpawnTime.current = now;

    // Limit active particles
    if (activeParticles.current.size >= maxParticles) return;

    // Spawn fewer particles but with better distribution
    const spawnCount = Math.min(density, maxParticles - activeParticles.current.size);
    
    for (let i = 0; i < spawnCount; i++) {
      const el = getParticle();
      
      // Occasional bigger bubble for visual variety
      const big = Math.random() < 0.15; // reduced from 20%
      const baseSize = sizeMin + Math.random() * (sizeMax - sizeMin);
      const size = big ? baseSize * (1.5 + Math.random() * 1.2) : baseSize;
      const gray = Math.floor(170 + Math.random() * 55);

      // Set particle properties
      el.style.left = `${clientX - size / 2}px`;
      el.style.top = `${clientY - size / 2}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = `rgba(${gray},${gray},${gray},0.8)`;
      el.style.opacity = "0.85";

      container.appendChild(el);
      activeParticles.current.add(el);

      // Animate out with slight delay to batch DOM updates
      const dx = (Math.random() * 2 - 1) * drift;
      const dy = (Math.random() * 2 - 1) * drift;
      const dBase = duration * (0.85 + Math.random() * 0.3);
      const d = big ? dBase * 1.4 : dBase;

      // Use timeout instead of rAF for better batching
      setTimeout(() => {
        if (activeParticles.current.has(el)) {
          el.style.transition = `transform ${d}ms ease-out, opacity ${d}ms ease-out`;
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
          el.style.opacity = "0";
        }
      }, Math.random() * 16); // small random delay to prevent lockstep

      // Clean up after animation
      setTimeout(() => {
        if (activeParticles.current.has(el) && el.parentNode === container) {
          container.removeChild(el);
          activeParticles.current.delete(el);
          releaseParticle(el);
        }
      }, d + 50);
    }
  }, [density, maxParticles, sizeMin, sizeMax, drift, duration, throttleMs, getParticle, releaseParticle]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // capture the active set reference for cleanup to satisfy eslint
    const activeSet = activeParticles.current;

    // Use passive listeners and throttle events
    let animationFrameId;
    let pendingSpawn = null;

    const scheduleSpawn = (clientX, clientY) => {
      pendingSpawn = { clientX, clientY };
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          if (pendingSpawn) {
            spawnAt(pendingSpawn.clientX, pendingSpawn.clientY);
            pendingSpawn = null;
          }
          animationFrameId = null;
        });
      }
    };

    const onPointerMove = (e) => scheduleSpawn(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches.length) {
        const t = e.touches[0];
        scheduleSpawn(t.clientX, t.clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Clean up active particles using captured refs
      activeSet.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
      activeSet.clear();
    };
  }, [spawnAt]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[20000] hidden dark:block"
      style={{ 
        contain: "layout style paint", 
        overflow: "hidden",
        transform: "translateZ(0)" // force hardware acceleration
      }}
    />
  );
}