"use client";
import { useEffect, useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import Link from 'next/link';

export default function WatchPage() {
  const [movieId, setMovieId] = useState<string | null>(null);

  useEffect(() => {
    // This checks your browser's memory for a saved movie ID
    const savedId = localStorage.getItem("currentMovieId");
    if (savedId) setMovieId(savedId);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      {movieId ? (
        <>
          {/* VIDEO PLAYER SECTION (Fixed at top) */}
          <div className="w-full aspect-video sticky top-0 z-50 bg-black shadow-2xl">
            <CldVideoPlayer
              width="1920"
              height="1080"
              src={movieId}
              logo={false}
              className="rounded-none"
            />
          </div>

          {/* MOVIE INFO SECTION */}
          <div className="p-6 flex-1 bg-neutral-900 rounded-t-3xl mt-[-20px] relative z-10 border-t border-neutral-800">
            <div className="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto mb-6" />
            <h1 className="text-2xl font-bold italic tracking-tight">Now Playing</h1>
            <p className="text-neutral-400 text-sm mt-1">Private Mobile Stream</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="bg-white text-black py-3 rounded-full font-bold active:scale-95 transition-all">Like</button>
              <button className="bg-neutral-800 text-white py-3 rounded-full font-bold active:scale-95 transition-all">Share</button>
            </div>

            <div className="mt-10 p-4 border border-neutral-800 rounded-2xl bg-neutral-900/50">
               <p className="text-xs text-neutral-500 leading-relaxed text-center">
                 Tip: Tap the full-screen icon and rotate your phone for the best experience.
               </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center animate-pulse">
             <span className="text-3xl">🎬</span>
          </div>
          <p className="text-neutral-400 font-medium">No movie uploaded yet.</p>
          <Link href="/admin" className="bg-blue-600 px-6 py-2 rounded-full text-sm font-bold">
            Go to Admin
          </Link>
        </div>
      )}
    </main>
  );
}