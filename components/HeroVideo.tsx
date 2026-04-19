"use client";
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forțăm setările de bază direct din cod pentru a evita blocarea browserului
    video.muted = true;
    video.setAttribute('muted', ''); 
    video.setAttribute('playsinline', '');

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play().catch(e => console.log("Autoplay blocked:", e));
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay blocked:", e));
      });
    }
  }, [src]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-bg">
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
    </div>
  );
}