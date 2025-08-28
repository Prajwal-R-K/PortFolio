import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Mouse-driven bubble trail with timed emission and graceful fade-out
export default function BubbleTrail({
  maxBubbles = 90,
  spawnEveryMs = 24,
  size = [5, 12],
  rise = [70, 140],
  spreadX = [-28, 28],
  opacity = 0.7,
  reducedMotion: reducedMotionProp = null,
  onBubblePos,
}) {
  const [bubbles, setBubbles] = useState([]);
  const lastSpawnRef = useRef(0);
  const idRef = useRef(0);
  const [reduced, setReduced] = useState(false);
  const followerRef = useRef({ x: 0, y: 0, init: false });

  useEffect(() => {
    // Detect reduced motion from prop, OS preference, or localStorage flag
    const mql = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const fromStorage = typeof window !== 'undefined' && localStorage.getItem('reducedMotion');
    const dataMotionOff = typeof document !== 'undefined' && document.documentElement?.dataset?.motion === 'off';
    const initial = (reducedMotionProp ?? null) !== null
      ? !!reducedMotionProp
      : ((mql && mql.matches) || fromStorage === 'true' || dataMotionOff);
    setReduced(initial);

    const onMql = (e) => setReduced((prev) => (reducedMotionProp ?? null) !== null ? !!reducedMotionProp : e.matches);
    if (mql && mql.addEventListener) mql.addEventListener('change', onMql);
    else if (mql && mql.addListener) mql.addListener(onMql);

    const onStorage = (e) => {
      if (e.key === 'reducedMotion' && (reducedMotionProp ?? null) === null) {
        setReduced(e.newValue === 'true');
      }
    };
    const onDataMotion = () => {
      if ((reducedMotionProp ?? null) === null) {
        const off = document.documentElement?.dataset?.motion === 'off';
        setReduced(off || (mql && mql.matches) || (localStorage.getItem('reducedMotion') === 'true'));
      }
    };
    window.addEventListener('storage', onStorage);
    const mo = new MutationObserver(onDataMotion);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });

    return () => {
      if (mql && mql.removeEventListener) mql.removeEventListener('change', onMql);
      else if (mql && mql.removeListener) mql.removeListener(onMql);
      window.removeEventListener('storage', onStorage);
      mo.disconnect();
    };
  }, [reducedMotionProp]);

  useEffect(() => {
    const onMove = (e) => {
      if (reduced) return; // respect reduced motion
      const now = performance.now();
      const interval = reduced ? spawnEveryMs * 3 : spawnEveryMs;
      if (now - lastSpawnRef.current < interval) return;
      lastSpawnRef.current = now;

      const rect = document.body.getBoundingClientRect();
      const tx = e.clientX - rect.left;
      const ty = e.clientY - rect.top + window.scrollY;
      // follower with slight lag
      const f = followerRef.current;
      if (!f.init) {
        f.x = tx; f.y = ty; f.init = true;
      } else {
        const k = 0.35; // lag factor
        f.x = f.x + (tx - f.x) * k;
        f.y = f.y + (ty - f.y) * k;
      }
      const x = f.x;
      const y = f.y;

      const n = reduced ? 1 : 2 + Math.floor(Math.random() * 2); // 2-3 bubbles per tick when moving
      setBubbles((prev) => {
        const next = [...prev];
        for (let i = 0; i < n; i++) {
          next.push({
            id: idRef.current++,
            x,
            y,
            r: rand(size[0], size[1]),
            dy: rand(rise[0], rise[1]),
            dx: rand(spreadX[0], spreadX[1]),
            dur: rand(1.0, 1.5),
          });
          // notify consumer so letters can react (use client coords)
          if (onBubblePos) onBubblePos({ x: e.clientX, y: e.clientY });
        }
        // trim
        const cap = reduced ? Math.min(30, maxBubbles) : maxBubbles;
        if (next.length > cap) next.splice(0, next.length - cap);
        return next;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [maxBubbles, spawnEveryMs, size, rise, spreadX, reduced, onBubblePos]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden dark:block">
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          initial={{ opacity, x: b.x, y: b.y, scale: 0.9 }}
          animate={{
            opacity: 0,
            x: b.x + b.dx,
            y: b.y - b.dy,
            scale: 0.85,
          }}
          transition={{ duration: b.dur, ease: "easeOut" }}
          onAnimationComplete={() => {
            setBubbles((prev) => prev.filter((p) => p.id !== b.id));
          }}
          className="absolute rounded-full bg-white/70 dark:bg-white/50 shadow-sm"
          style={{ width: b.r, height: b.r, filter: "blur(0.5px)" }}
        />
      ))}
    </div>
  );
}

function rand(a, b) {
  return a + Math.random() * (b - a);
}
