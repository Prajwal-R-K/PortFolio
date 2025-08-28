import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Animated sine/ECG-like underline using SVG
// Props:
// width, height: SVG viewport
// amplitude: wave height
// frequency: number of peaks across width
// speed: dash flow speed in seconds (lower = faster)
// colors: [start, mid, end]
export default function WavyUnderline({
  width = 360,
  height = 28,
  amplitude = 6,
  frequency = 3.5,
  speed = 2.2,
  strokeWidth = 3,
  colors = ["#ec4899", "#8b5cf6", "#3b82f6"], // pink → violet → blue
  reducedMotion: reducedMotionProp = null,
  period = 6, // seconds for one full wave loop
  onCenterPass,
  onBubblePos,
  ridersEnabled = false,
  onBubbleSpawn,
  riderEmitInterval = 0.6,
  startXRatio = 0, // 0..1 initial position of rider along width
}) {
  const [pathD, setPathD] = useState(() => buildECGPath(width, height, amplitude, frequency, 0, speed));
  const [reduced, setReduced] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const prevPhaseRef = useRef(0);
  const lastBubblePosRef = useRef({ x: 0, y: height / 2 });
  const [particles, setParticles] = useState([]);
  // Cursor steering
  const svgRef = useRef(null);
  const cursorNXRef = useRef(null); // 0..1
  const hasCursorRef = useRef(false);
  const steerXRef = useRef(0); // current steered x in px
  const lastMouseSpawnRef = useRef(0);
  const lastRiderEmitRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const fromStorage = typeof window !== 'undefined' && localStorage.getItem('reducedMotion');
    const dataMotionOff = typeof document !== 'undefined' && document.documentElement?.dataset?.motion === 'off';
    const initial = (reducedMotionProp ?? null) !== null
      ? !!reducedMotionProp
      : ((mql && mql.matches) || fromStorage === 'true' || dataMotionOff);
    setReduced(initial);

    const onMql = (e) => setReduced((reducedMotionProp ?? null) !== null ? !!reducedMotionProp : (e.matches || document.documentElement?.dataset?.motion === 'off' || localStorage.getItem('reducedMotion') === 'true'));
    if (mql && mql.addEventListener) mql.addEventListener('change', onMql);
    else if (mql && mql.addListener) mql.addListener(onMql);
    const onStorage = (e) => {
      if (e.key === 'reducedMotion' && (reducedMotionProp ?? null) === null) {
        setReduced(e.newValue === 'true' || document.documentElement?.dataset?.motion === 'off');
      }
    };
    window.addEventListener('storage', onStorage);
    const mo = new MutationObserver(() => {
      if ((reducedMotionProp ?? null) === null) {
        const off = document.documentElement?.dataset?.motion === 'off';
        setReduced(off || (mql && mql.matches) || (localStorage.getItem('reducedMotion') === 'true'));
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    return () => {
      if (mql && mql.removeEventListener) mql.removeEventListener('change', onMql);
      else if (mql && mql.removeListener) mql.removeListener(onMql);
      window.removeEventListener('storage', onStorage);
      mo.disconnect();
    };
  }, [reducedMotionProp]);

  useEffect(() => {
    if (reduced) return; // no animation when reduced
    const run = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000; // sec
      const phase = ((elapsed % period) / period + Math.max(0, Math.min(1, startXRatio))) % 1; // 0..1, shifted start
      // update path with time-varying segment amplitudes
      setPathD(buildECGPath(width, height, amplitude, frequency, elapsed, speed));
      // fire center pass when crossing 0.5
      const prev = prevPhaseRef.current;
      if (onCenterPass && prev < 0.5 && phase >= 0.5) onCenterPass();
      prevPhaseRef.current = phase;

      // determine surfing bubble x (continuous flow + optional cursor steer)
      const flowX = phase * width;
      if (hasCursorRef.current && cursorNXRef.current != null) {
        const target = Math.max(0, Math.min(1, cursorNXRef.current)) * width;
        // Smoothly steer towards cursor while preserving flow
        steerXRef.current = flowX * 0.6 + target * 0.4;
      } else {
        steerXRef.current = flowX;
      }

      // compute y on wave
      const xWave = steerXRef.current;
      const midY = height / 2;
      const tk = xWave / width;
      const phaseShift = Math.PI * 2 * (frequency * (tk + elapsed * (0.15 + 0.35 * speed)));
      const yWave = midY + amplitude * ecgWave(phaseShift);

      const bubblePos = { x: xWave, y: yWave };
      lastBubblePosRef.current = bubblePos;
      if (onBubblePos && svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        onBubblePos({ x: rect.left + bubblePos.x, y: rect.top + bubblePos.y });
      }

      // rider-driven emission (independent of cursor) to create rising bubbles
      if (ridersEnabled && elapsed - lastRiderEmitRef.current > riderEmitInterval) {
        lastRiderEmitRef.current = elapsed;
        const x = xWave;
        const y = yWave;
        const r = 3 + Math.random() * 2.2;
        const vy = -24 - Math.random() * 18;
        const life = 1.0 + Math.random() * 0.5;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        setParticles((prev) => [
          ...prev.filter((p) => p.t < p.life),
          { id, x, y, r, vy, t: 0, life },
        ].slice(-90));
        if (onBubbleSpawn && svgRef.current) {
          const rect = svgRef.current.getBoundingClientRect();
          onBubbleSpawn({ x: rect.left + x, y: rect.top + y });
        }
      }

      // if cursor active, spawn extra bubbles at cursor x projected on wave (limited rate)
      if (hasCursorRef.current && cursorNXRef.current != null && elapsed - lastMouseSpawnRef.current > 0.04) {
        lastMouseSpawnRef.current = elapsed;
        const t = Math.max(0, Math.min(1, cursorNXRef.current));
        const x = t * width;
        const midY = height / 2;
        const omega = Math.PI * 2 * frequency;
        const timePhase = elapsed * 1.2;
        const segAmp = amplitude * (0.65 + 0.35 * Math.sin(timePhase + t * 6.283));
        const y = midY + Math.sin(t * omega * 2 + timePhase * 0.8) * segAmp;
        const r = 2.8 + Math.random() * 2.0;
        const vy = -26 - Math.random() * 22;
        const life = 1.0 + Math.random() * 0.5;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        setParticles((prev) => [
          ...prev.filter((p) => p.t < p.life),
          { id, x, y, r, vy, t: 0, life },
        ].slice(-90));
      }

      // update particles
      setParticles((prev) => prev.map((p) => ({ ...p, t: p.t + 1 / 60, y: p.y + p.vy * (1 / 60) })).filter((p) => p.t <= p.life));
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, amplitude, frequency, period, speed, reduced, onCenterPass, onBubblePos, ridersEnabled, onBubbleSpawn, riderEmitInterval, startXRatio]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onMouseMove={(e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width; // 0..1
        cursorNXRef.current = nx;
        hasCursorRef.current = true;
      }}
      onMouseLeave={() => {
        hasCursorRef.current = false;
      }}
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </linearGradient>
        {/* edge fade for smooth endings */}
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="12%" stopColor="#fff" stopOpacity="1" />
          <stop offset="88%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="edgeMask">
          <rect x="0" y="0" width={width} height={height} fill="url(#edgeGrad)" />
        </mask>
        <radialGradient id="riderGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#f0abfc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.85" />
        </radialGradient>
        <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g mask="url(#edgeMask)">
        <motion.path
          id="wavePathRef"
          d={pathD}
          stroke="url(#waveGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          filter="url(#waveGlow)"
          // Solid continuous line for ECG
        />

        {/* Programmatic bubble surfing the wave (x follows phase, y samples current path func) */}
        {ridersEnabled && !reduced && (
          <SurfingBubble
            width={width}
            height={height}
            amplitude={amplitude}
            frequency={frequency}
            period={period}
            externalXRef={steerXRef}
            onFrame={(pt) => {
              if (!onBubblePos || !svgRef.current) return;
              const rect = svgRef.current.getBoundingClientRect();
              onBubblePos({ x: rect.left + pt.x, y: rect.top + pt.y });
              lastBubblePosRef.current = { x: pt.x, y: pt.y };
            }}
          />
        )}

        {/* Rising small bubbles along the wave */}
        {!reduced && particles.map((p) => {
          const k = Math.min(1, p.t / p.life);
          const ease = k * (2 - k); // easeOutQuad
          const opacity = 0.9 * (1 - ease);
          return (
            <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill="#ffffff" opacity={opacity} />
          );
        })}
      </g>
    </svg>
  );
}

function buildECGPath(width, height, amplitude, frequency, timeSec = 0, speed = 2.0) {
  const midY = height / 2;
  const steps = Math.max(240, Math.floor(width * 1.5));
  let d = `M 0 ${midY}`;
  const twoPi = Math.PI * 2;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps; // 0..1 across width
    const x = t * width;
    // Smooth left-to-right scroll using time offset (speed scales scroll)
    const scroll = timeSec * (0.15 + 0.35 * speed); // base 0.15 plus speed factor
    const phase = twoPi * (frequency * (t + scroll));
    const y = midY + amplitude * ecgWave(phase);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

// P–QRS–T synthetic ECG waveform
function ecgWave(phi) {
  // Wrap phase 0..2π
  const twoPi = Math.PI * 2;
  let p = phi % twoPi;
  if (p < 0) p += twoPi;

  // Baseline tiny undulation
  const base = 0.12 * Math.sin(p * 1.2);

  // P-wave (small bump before QRS)
  const pCenter = 1.2;
  const pAmp = 0.25;
  const pWidth = 0.25;
  const P = pAmp * Math.exp(-Math.pow((p - pCenter), 2) / (2 * Math.pow(pWidth, 2)));

  // QRS complex (sharp spike)
  const qrsCenter = 3.0;
  const qrsAmp = 1.0; // dominant
  const qrsWidth = 0.07; // very narrow
  const QRS = qrsAmp * Math.exp(-Math.pow((p - qrsCenter), 2) / (2 * Math.pow(qrsWidth, 2)));

  // T-wave (broader bump after QRS)
  const tCenter = 4.5;
  const tAmp = 0.35;
  const tWidth = 0.45;
  const T = tAmp * Math.exp(-Math.pow((p - tCenter), 2) / (2 * Math.pow(tWidth, 2)));

  return base + P + QRS + T - 0.15; // slight offset to sit on baseline
}

function SurfingBubble({ width, height, amplitude, frequency, period, onFrame, externalXRef }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: height / 2 });
  const rafRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    const run = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const phase = (elapsed % period) / period; // 0..1 flow baseline
      const flowX = phase * width;
      const x = externalXRef?.current != null ? externalXRef.current : flowX;
      const midY = height / 2;
      // Match ECG function for y
      const twoPi = Math.PI * 2;
      const tNorm = x / width; // 0..1
      const phi = twoPi * (frequency * (tNorm + elapsed * 0.35));
      const y = midY + amplitude * ecgWave(phi);
      const next = { x, y };
      setPos(next);
      if (onFrame) onFrame(next);
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, amplitude, frequency, period, onFrame, externalXRef]);

  return (
    <g ref={ref} transform={`translate(${pos.x}, ${pos.y})`}>
      {/* inner bubble with gradient */}
      <motion.circle
        r={6}
        fill="url(#riderGrad)"
        initial={{ filter: "drop-shadow(0 0 8px rgba(124,77,255,0.9))" }}
        animate={{
          filter: [
            "drop-shadow(0 0 8px rgba(124,77,255,0.9))",
            "drop-shadow(0 0 12px rgba(0,209,255,0.9))",
            "drop-shadow(0 0 8px rgba(124,77,255,0.9))",
          ],
        }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* pulsing ring */}
      <motion.circle
        r={10}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={1.5}
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}
