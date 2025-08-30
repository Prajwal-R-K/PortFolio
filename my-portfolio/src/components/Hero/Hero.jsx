import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import BubbleTrail from "./BubbleTrail";
import WavyUnderline from "./WavyUnderline";
import ThreeBackground from "./ThreeBackground";

function Hero() {
  const fullName = "Prajwal R K";
  const letterRefs = useRef([]);
  const nameWrapRef = useRef(null);
  const waveWrapRef = useRef(null);
  const [popped, setPopped] = useState({}); // {index: true}
  const [revealCount, setRevealCount] = useState(0); // how many non-space letters revealed
  const [waveWidth, setWaveWidth] = useState(520);
  const [startXRatio, setStartXRatio] = useState(0);
  // map each index to an order among non-space chars
  const orderMapRef = useRef(null);
  const centersRef = useRef([]); // letter center X in viewport
  const riderXRef = useRef(0);
  const [waveHover, setWaveHover] = useState(false);
  const [riderPaintTick, setRiderPaintTick] = useState(0); // trigger re-render for proximity glow
  const paintScheduledRef = useRef(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const emailWrapRef = useRef(null);
  
  if (!orderMapRef.current) {
    const chars = fullName.split("");
    let order = 0;
    orderMapRef.current = chars.map((ch) => {
      if (ch === " ") return -1;
      return order++;
    });
  }
  const handleBubblePos = useCallback((pt) => {
    // Proximity check against each letter's center
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (pt.x - cx);
      const dy = (pt.y - cy);
      const d = Math.hypot(dx, dy);
      if (d < 60) {
        setPopped((prev) => ({ ...prev, [i]: true }));
        // un-pop shortly after
        clearTimeout(el.__popTo);
        el.__popTo = setTimeout(() => setPopped((prev) => { const cp = { ...prev }; delete cp[i]; return cp; }), 160);
      }
    });
    // Track rider X for continuous letter pulsation
    riderXRef.current = pt.x;
    // Throttle re-render to next animation frame for smooth proximity glow updates
    if (!paintScheduledRef.current) {
      paintScheduledRef.current = true;
      requestAnimationFrame(() => {
        paintScheduledRef.current = false;
        setRiderPaintTick((t) => (t + 1) % 1000);
      });
    }
  }, []);
  const handleBubbleSpawn = useCallback(() => {
    // reveal next hidden letter (ignore spaces)
    setRevealCount((c) => Math.min(c + 1, orderMapRef.current.filter((v) => v >= 0).length));
  }, []);
  // removed center-pass lift/glow effect per request

  // Precompute letter centers and keep up to date on resize
  useEffect(() => {
    const computeCenters = () => {
      centersRef.current = letterRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2;
      });
      // also update wave width based on full name container width
      if (nameWrapRef.current) {
        const w = nameWrapRef.current.getBoundingClientRect().width;
        // add padding left/right so the ring has room
        setWaveWidth(Math.round(w + 140));
      }
      // compute starting ratio so rider begins under 'P' (first non-space letter)
      const firstIdx = orderMapRef.current?.findIndex((v) => v === 0) ?? 0;
      const firstCenter = centersRef.current[firstIdx];
      if (typeof firstCenter === 'number' && waveWrapRef.current) {
        const waveRect = waveWrapRef.current.getBoundingClientRect();
        const START_OFFSET_PX = -6; // slight left bias to visually center under the glyph
        const ratio = (firstCenter + START_OFFSET_PX - waveRect.left) / Math.max(1, waveRect.width);
        setStartXRatio(Math.max(0, Math.min(1, ratio)));
      }
    };
    computeCenters();
    const ro = new ResizeObserver(computeCenters);
    if (nameWrapRef.current) ro.observe(nameWrapRef.current);
    letterRefs.current.forEach((el) => el && ro.observe(el));
    const onResize = () => computeCenters();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [revealCount]);

  // No rAF needed for letters: transforms are driven by rider position updates from onBubblePos
  // Close email menu on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!emailOpen) return;
      const wrap = emailWrapRef.current;
      if (wrap && !wrap.contains(e.target)) {
        setEmailOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setEmailOpen(false);
    };
    document.addEventListener('mousedown', onDocClick, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [emailOpen]);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32 flex items-center justify-center min-h-screen p-6 bg-transparent text-gray-900 dark:text-white">
      {/* Three.js background */}
      <ThreeBackground />
      {/* Animated gradient blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
      >
        <motion.div
          className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-fuchsia-500/35 via-violet-500/30 to-sky-500/25 blur-3xl rounded-full -top-24 -left-24"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -10, 15, 0],
            rotate: [0, 10, -5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[35vw] h-[35vw] bg-gradient-to-tr from-rose-400/25 to-indigo-600/30 blur-3xl rounded-full -bottom-24 -right-24"
          animate={{
            x: [0, -15, 10, 0],
            y: [0, 20, -10, 0],
            rotate: [0, -8, 6, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <BubbleTrail onBubblePos={handleBubblePos} />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center space-y-6 max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-extrabold leading-tight text-[clamp(2.25rem,6vw,4.5rem)]"
        >
          <span className="text-gray-900 dark:text-white">Hi, I'm</span>{" "}
          <span
            ref={nameWrapRef}
            className={`relative inline-block align-baseline tracking-wide`}
            aria-label={fullName}
            onMouseEnter={() => setWaveHover(true)}
            onMouseLeave={() => setWaveHover(false)}
          >
            {(() => {
              // compute the single nearest revealed letter to the rider
              const rx = riderXRef.current;
              let nearestIdx = -1;
              let nearestDist = Infinity;
              orderMapRef.current.forEach((order, idx) => {
                if (order < 0) return; // skip spaces
                if (order >= revealCount) return; // not revealed yet
                const cx = centersRef.current[idx];
                if (typeof cx !== 'number') return;
                const d = Math.abs(cx - rx);
                if (d < nearestDist) {
                  nearestDist = d;
                  nearestIdx = idx;
                }
              });

              // riderPaintTick included to refresh proximity glow while rider moves
              void riderPaintTick;
              return fullName.split("").map((ch, i) => {
                const order = orderMapRef.current[i];
                const isRevealed = order < 0 || order < revealCount;
                const isActive = i === nearestIdx; // only one active letter at a time
                // proximity-based continuous glow for revealed letters
                const cx = centersRef.current[i] ?? null;
                const rxNow = riderXRef.current;
                const dist = cx == null ? 9999 : Math.abs(cx - rxNow);
                const proximity = Math.max(0, Math.min(1, 1 - dist / 220));
                const baseBlur = 6 + 8 * proximity;
                const baseAlpha = 0.15 + 0.45 * proximity;
                const activeBoostBlur = isActive ? 4 : 0;
                const activeBoostAlpha = isActive ? 0.20 : 0;
                const scale = isRevealed && isActive ? 1.14 : 1.0;
                const ty = isRevealed && isActive ? -3 : 0;
                const glow = isRevealed
                  ? `drop-shadow(0 0 ${Math.round(baseBlur + activeBoostBlur)}px rgba(0,209,255,${(baseAlpha + activeBoostAlpha).toFixed(2)}))`
                  : "none";
                return (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className={`inline-block will-change-transform transition-transform duration-200 ${popped[i] ? "filter drop-shadow-[0_0_10px_rgba(0,209,255,0.35)]" : ""} letter-gradient ${orderMapRef.current[i] >= 0 && !isRevealed ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"} transition-opacity duration-300`}
                style={{ transform: `translateY(${ty}px) scale(${scale.toFixed(3)})`, filter: glow }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
                );
              });
            })()}
          </span>
        </motion.h1>
        {/* Short role/title under name with subtle underline */}
        <div className="group relative inline-block">
          <p className="accent-text-gradient font-medium text-[0.98rem] sm:text-[1.05rem] -mt-1 select-none">
            Full‑Stack Developer specializing in Java & Python | Crafting Scalable Web Solutions
          </p>
          <motion.div
            initial={{ scaleX: 0.45, opacity: 0.7 }}
            whileHover={{ scaleX: 0.8, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto h-px origin-center accent-gradient"
          />
        </div>
        <div ref={waveWrapRef} className="mt-0.5 flex justify-center" onMouseEnter={() => setWaveHover(true)} onMouseLeave={() => setWaveHover(false)}>
          <WavyUnderline width={waveWidth} height={42} amplitude={waveHover ? 26 : 22} frequency={2.3} speed={0.18} strokeWidth={4}
            period={12.0}
            riderEmitInterval={0.7}
            startXRatio={startXRatio}
            onBubblePos={handleBubblePos}
            ridersEnabled={true}
            reducedMotion={false}
            onBubbleSpawn={handleBubbleSpawn}
            colors={["#7C4DFF", "#4aa8ff", "#00D1FF"]} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-[clamp(1rem,2.1vw,1.15rem)] text-gray-700 dark:text-white/90 max-w-[52ch] mx-auto leading-relaxed font-normal"
        >
          Building scalable apps with clean code and creative design.
        </motion.p>
        {/* Primary CTA */}
        <div className="mt-5 flex items-center justify-center relative">
          <motion.button
            type="button"
            onClick={() => {
              if (downloading) return;
              setDownloading(true);
              // small delay for visual feedback, then trigger download programmatically
              setTimeout(() => {
                const link = document.createElement('a');
                link.href = `${process.env.PUBLIC_URL}/Resume.pdf`;
                link.download = 'Resume.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => setDownloading(false), 800);
              }, 450);
            }}
            title="Get a copy of my latest CV"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white accent-gradient hover:shadow-[0_0_24px_rgba(124,77,255,0.35)] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400"
          >
            {downloading ? 'Preparing…' : '📄 Download Resume'}
          </motion.button>
          <AnimatePresence>
            {downloading && (
              <motion.span
                key="pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
                className="absolute -z-0 w-40 h-40 rounded-full bg-cyan-500/15 blur-2xl"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Small social proof row */}
        <div className="mt-7 flex items-center justify-center gap-5 text-sm text-gray-600 dark:text-white/80">
          <a
            href="https://github.com/Prajwal-R-K"
            target="_blank"
            rel="noopener noreferrer"
            className="transition inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <FaGithub className="text-lg" />
            <span className="hover:underline">GitHub</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            href="https://www.linkedin.com/in/prajwal-r-k-5936292a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <FaLinkedin className="text-lg" />
            <span className="hover:underline">LinkedIn</span>
          </a>
          <span className="opacity-30">|</span>
          <div ref={emailWrapRef} className="relative inline-block">
            <button
              type="button"
              onClick={() => setEmailOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={emailOpen}
              className="transition inline-flex items-center gap-2 px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:text-gray-900 dark:hover:text-white"
              title="Email"
            >
              <MdEmail className="text-lg" />
              <span className="hover:underline">Email</span>
              <svg className={`w-3 h-3 transition-transform ${emailOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </button>
            <AnimatePresence>
              {emailOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 mt-2 w-64 rounded-md border p-2 text-sm bg-white text-gray-900 border-gray-200 shadow-lg dark:bg-black/70 dark:text-white dark:border-white/15 backdrop-blur"
                >
                  <a
                    role="menuitem"
                    href="mailto:prajwalrk2004@gmail.com?subject=Job%2FInternship%20Opportunity&body=Hi%20Prajwal%2C%0D%0A%0D%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20job%20or%20internship%20opportunity%20with%20you.%0D%0APlease%20share%20your%20availability%20for%20a%20quick%20discussion.%0D%0A%0D%0ARegards%2C%0D%0A%5BYour%20Name%5D%0D%0A%5BCompany%2FOrganization%5D%0D%0A%5BContact%20Information%5D"
                    className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-white/10"
                    onClick={() => setEmailOpen(false)}
                  >
                    Email (Opportunity)
                  </a>
                  <a
                    role="menuitem"
                    href="mailto:prajwalrk2004@gmail.com?subject=Let%27s%20Connect&body=Hi%20Prajwal%2C%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0D%0ALooking%20forward%20to%20hearing%20from%20you.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D"
                    className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-white/10"
                    onClick={() => setEmailOpen(false)}
                  >
                    Email (Connect)
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
