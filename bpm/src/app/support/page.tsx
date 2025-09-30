"use client";

import { ProgressRing } from '@skeletonlabs/skeleton-react';
import { useEffect, useState, useRef } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleButtonClick = () => {
    setHasPlayed(true);
  };

  useEffect(() => {
    if (hasPlayed && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      videoRef.current.focus();
    }
  }, [hasPlayed]);

  return (
  <div className="grid grid-cols-1 gap-4 justify-center">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Support The Developer</h1>
                {!hasPlayed && (
                  <button
                    className="mb-8 px-8 py-6 text-2xl font-bold bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-200"
                    onClick={handleButtonClick}
                    disabled={hasPlayed}
                  >
                    Support
                  </button>
                )}
        {hasPlayed && (
          <video
            ref={videoRef}
            className="w-screen h-screen object-contain"
            controls
            preload="none"
            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
          >
            <source src="/assets/videos/support.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </main>
    </div>
  );
}
