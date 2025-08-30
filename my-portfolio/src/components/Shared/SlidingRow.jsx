import React, { useRef, useEffect, useCallback } from "react";

export default function SlidingRow({ 
  items, 
  renderItem, 
  ariaLabel = "slider",
  autoSlide = true,
  slideInterval = 5000 // 5 seconds
}) {
  const scrollerRef = useRef(null);
  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const wheelSnapTimer = useRef(null);
  const autoSlideTimer = useRef(null);
  const isScrolling = useRef(false);

  const scrollToIndex = useCallback((idx) => {
    const el = scrollerRef.current;
    const cards = getCards();
    if (!el || !cards[idx]) return;
    
    isScrolling.current = true;
    el.scrollTo({ 
      left: cards[idx].offsetLeft, 
      behavior: 'smooth' 
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, []);

  // Auto-slide functionality
  const startAutoSlide = useCallback(() => {
    if (!autoSlide || items.length <= 1) return;
    
    autoSlideTimer.current = setInterval(() => {
      if (!isHovered && !isScrolling.current) {
        const nextIndex = (active + 1) % items.length;
        scrollToIndex(nextIndex);
      }
    }, slideInterval);

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [active, autoSlide, isHovered, items.length, slideInterval, scrollToIndex]);

  // Initialize and cleanup auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [startAutoSlide]);

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


  const scrollByDir = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.min(items.length - 1, Math.max(0, active + dir));
    scrollToIndex(next);
  };


  return (
    <div className="relative w-full">
      {/* Enhanced Progress Line */}
      <div className="relative w-full mb-6">
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700/80 rounded-full overflow-hidden">
          <div 
            className="h-full accent-gradient transition-all duration-500 ease-out"
            style={{ 
              width: `${progress * 100}%`,
              transitionProperty: 'width',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '300ms'
            }}
            aria-hidden="true"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/80 rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
        <div className="absolute -bottom-5 right-0 text-xs font-medium text-gray-500 dark:text-gray-400">
          {Math.round(progress * 100)}%
        </div>
      </div>
      
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Arrows - Outside */}
        <button
          onClick={() => scrollByDir(-1)}
          disabled={active === 0}
          className={`absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg transition-all duration-200 z-10 ${
            active === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-70 hover:opacity-100 hover:scale-110'
          }`}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={() => scrollByDir(1)}
          disabled={active === items.length - 1}
          className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg transition-all duration-200 z-10 ${
            active === items.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-70 hover:opacity-100 hover:scale-110'
          }`}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div
          ref={scrollerRef}
          className="overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 focus:outline-none"
          role="region"
          aria-label={ariaLabel}
          aria-live="polite"
          onScroll={updateActiveFromScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { 
              e.preventDefault(); 
              scrollByDir(-1); 
            } else if (e.key === 'ArrowRight') { 
              e.preventDefault(); 
              scrollByDir(1); 
            } else if (e.key === 'Home') {
              e.preventDefault();
              scrollToIndex(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              scrollToIndex(items.length - 1);
            }
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
            }, 100);
          }}
        >
          <div className="flex gap-4 px-2">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="snap-card flex-shrink-0 w-64 transition-transform duration-200 ease-out hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
                tabIndex={0}
                onFocus={() => scrollToIndex(index)}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Static Pagination Dots */}
        {items.length > 1 && (
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === active 
                      ? 'w-4 accent-gradient' 
                      : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
