// components/MovieView.tsx
"use client";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function MovieView({ publicId }: { publicId: string }) {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Video Section - Fixed at top like YouTube */}
      <div className="w-full aspect-video sticky top-0 z-50 bg-black">
        <CldVideoPlayer
          width="1920"
          height="1080"
          src={publicId}
          colors={{ base: "#ff0000", text: "#ffffff", accent: "#ff0000" }}
          fontFace="Inter"
        />
      </div>

      {/* Movie Details Section */}
      <div className="p-4 flex-1 bg-neutral-900 rounded-t-2xl mt-[-10px] relative z-10">
        <h1 className="text-xl font-bold">My Personal Movie</h1>
        <p className="text-gray-400 text-sm mt-2">1.2M views • Just now</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-black px-4 py-2 rounded-full font-medium">Like</button>
          <button className="bg-neutral-800 px-4 py-2 rounded-full font-medium">Share</button>
        </div>
      </div>
    </div>
  );
}