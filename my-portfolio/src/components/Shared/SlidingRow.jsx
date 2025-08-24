import React, { useRef } from "react";

export default function SlidingRow({ items, renderItem, ariaLabel = "slider" }) {
  const scrollerRef = useRef(null);
  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const wheelSnapTimer = useRef(null);

  const getCards = () => {
    const el = scrollerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll('.snap-card'));
  };

  const updateActiveFromScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = getCards();
    if (cards.length === 0) return;
    const { scrollLeft } = el;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? scrollLeft / max : 0);
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    setActive(bestIdx);
  };

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current;
    const cards = getCards();
    if (!el || !cards[idx]) return;
    el.scrollTo({ left: cards[idx].offsetLeft, behavior: 'smooth' });
  };

  const scrollByDir = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.min(items.length - 1, Math.max(0, active + dir));
    scrollToIndex(next);
  };

  return (
    <div className="relative">
      {/* Slim progress bar */}
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-[width] duration-200"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => scrollByDir(-1)}
          className="px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 shadow"
          aria-label="Previous"
        >
          ←
        </button>
        <p className="text-sm text-gray-400">Slide to explore</p>
        <button
          onClick={() => scrollByDir(1)}
          className="px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 shadow"
          aria-label="Next"
        >
          →
        </button>
      </div>
      <div
        ref={scrollerRef}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label={ariaLabel}
        onScroll={updateActiveFromScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByDir(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollByDir(1); }
        }}
        onWheel={() => {
          if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
          wheelSnapTimer.current = setTimeout(() => {
            const el = scrollerRef.current;
            if (!el) return;
            const cards = getCards();
            if (cards.length === 0) return;
            const { scrollLeft } = el;
            let bestIdx = 0;
            let bestDist = Infinity;
            cards.forEach((card, idx) => {
              const dist = Math.abs(card.offsetLeft - scrollLeft);
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
              }
            });
            scrollToIndex(bestIdx);
          }, 120);
        }}
      >
        <div className="flex gap-6 pr-2">
          {items.map((item, i) => (
            <div key={i} className="snap-card snap-start shrink-0 min-w-[280px] max-w-[320px] w-[80vw] sm:w-[320px]">
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to item ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === active ? 'bg-blue-600 scale-110' : 'bg-gray-400/70 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
