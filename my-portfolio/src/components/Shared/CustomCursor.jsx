import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const hueRef = useRef(200);
  const lastSpawnRef = useRef(0);
  const moveHandlerRef = useRef(null);
  const downHandlerRef = useRef(null);
  const enabledRef = useRef(true);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Respect prefers-reduced-motion
    const media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedRef.current = !!(media && media.matches);
    // Initialize from app-level override if present, otherwise from system pref
    const appReduced = typeof window !== 'undefined' ? !!window.__reducedMotion : false;
    enabledRef.current = !(prefersReducedRef.current || appReduced);
    const onMediaChange = (e) => {
      prefersReducedRef.current = e.matches;
      // if system now prefers reduced, disable unless app override says otherwise (appReduced=false)
      const currentAppReduced = typeof window !== 'undefined' ? !!window.__reducedMotion : false;
      enabledRef.current = !(e.matches || currentAppReduced);
    };
    if (media && media.addEventListener) media.addEventListener('change', onMediaChange);

    // Listen to in-app reduced-motion toggle
    const onReducedMotionChanged = (ev) => {
      const reduced = ev?.detail?.reduced === true;
      window.__reducedMotion = reduced;
      enabledRef.current = !(reduced || prefersReducedRef.current);
    };
    document.addEventListener('reduced-motion-changed', onReducedMotionChanged);

    const onMove = (e) => {
      // move main cursor (always)
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // early exits
      if (!enabledRef.current) return;
      if (document.hidden) return;

      // strict performance guards
      const trails = document.getElementsByClassName('cursor-trail');
      if (trails && trails.length > 48) return; // cap elements in DOM

      // rate-limit trail element creation (~60fps)
      const now = performance.now();
      if (now - lastSpawnRef.current < 16) return; // ~60fps cap
      lastSpawnRef.current = now;

      // rainbow hue cycle
      hueRef.current = (hueRef.current + 2) % 360;
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      trail.style.background = `radial-gradient(circle, hsla(${hueRef.current}, 95%, 65%, 0.9), hsla(${hueRef.current}, 95%, 65%, 0.0) 60%)`;
      trail.style.boxShadow = `0 0 16px hsla(${hueRef.current}, 95%, 70%, 0.8), 0 0 36px hsla(${hueRef.current}, 95%, 60%, 0.6)`;
      document.body.appendChild(trail);
      // cleanup after animation
      setTimeout(() => trail.remove(), 700);
    };
    moveHandlerRef.current = onMove;
    document.addEventListener("mousemove", onMove, { passive: true });

    const burst = (e) => {
      if (!enabledRef.current || document.hidden) return;
      for (let i = 0; i < 10; i++) {
        const spark = document.createElement("div");
        spark.className = "particle-burst";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.filter = `hue-rotate(${hueRef.current}deg)`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 900);
      }
    };
    downHandlerRef.current = burst;
    document.addEventListener("mousedown", burst);

    // Keyboard toggle: press 'r' to toggle rainbow trail on/off
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'r') {
        enabledRef.current = !enabledRef.current && !prefersReducedRef.current;
      }
    };
    document.addEventListener('keydown', onKey);

    // Pause when tab is hidden (handled in handlers via document.hidden check)

    return () => {
      if (moveHandlerRef.current) document.removeEventListener("mousemove", moveHandlerRef.current);
      if (downHandlerRef.current) document.removeEventListener("mousedown", downHandlerRef.current);
      document.removeEventListener('keydown', onKey);
      if (media && media.removeEventListener) media.removeEventListener('change', onMediaChange);
      document.removeEventListener('reduced-motion-changed', onReducedMotionChanged);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
