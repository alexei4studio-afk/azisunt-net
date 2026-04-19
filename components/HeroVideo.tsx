"use client";
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true, // Optimizează rezoluția în funcție de ecran
        autoStartLoad: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    }
  }, [src]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full max-w-none object-cover -translate-x-1/2 -translate-y-1/2 opacity-50 sm:opacity-60"
      />
      {/* Overlay adaptiv: mai întunecat pe mobil pentru contrast */}
      <div className="absolute inset-0 bg-bg/40 md:bg-bg/20" />
      
      {/* Bottom Fade: maschează tăietura video-ului pe orice rezoluție */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] md:h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
    </div>
  );
}