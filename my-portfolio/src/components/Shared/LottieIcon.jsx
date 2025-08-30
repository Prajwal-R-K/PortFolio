import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LottieIcon({ srcUrl, loop = true, autoplay = true, className = '', visible = true }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(srcUrl, { cache: 'force-cache' });
        if (!res.ok) throw new Error('Failed to load Lottie JSON');
        const json = await res.json();
        if (alive) setData(json);
      } catch (e) {
        if (alive) setError(e);
      }
    }
    if (visible && srcUrl) load();
    return () => { alive = false; };
  }, [srcUrl, visible]);

  if (!visible) return null;
  if (error) return null;
  if (!data) return null;

  return (
    <Lottie animationData={data} loop={loop} autoplay={autoplay} className={className} />
  );
}
