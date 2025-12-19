"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [moviePublicId, setMoviePublicId] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("currentMovieId");
    if (savedId) setMoviePublicId(savedId);
  }, []);

  const setMovieIdFromStorage = (id: string) => {
    setMoviePublicId(id);
    localStorage.setItem("currentMovieId", id);
  };

  const deleteMovie = () => {
    setMoviePublicId("");
    localStorage.removeItem("currentMovieId");
    alert("Movie removed from the player!");
  };

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center gap-6 text-black font-sans">
      <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Admin Dashboard</h1>
      
      <CldUploadWidget 
        // 1. Tell the widget to use your server-side signing route
        signatureEndpoint="/api/sign-cloudinary" 
        options={{
          resourceType: "video", // Required for large video files
          sources: ['local'],
          multiple: false,
          maxFileSize: 1500000000, // Explicitly allow up to 1.5GB
        }}
        onSuccess={(result: any) => {
          const id = result.info.public_id;
          setMovieIdFromStorage(id);
        }}
      >
        {({ open }) => (
          <button 
            onClick={() => open()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold shadow-xl transition-all active:scale-95"
          >
            Upload Large Movie (MKV/MP4)
          </button>
        )}
      </CldUploadWidget>

      {moviePublicId && (
        <div className="mt-8 p-6 border-2 border-dashed border-gray-200 rounded-[2rem] w-full max-w-sm text-center bg-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Live Movie ID</p>
          <p className="text-xs font-mono bg-white border border-gray-100 p-3 rounded-xl break-all mb-4 text-gray-600 shadow-sm">
            {moviePublicId}
          </p>
          
          <button 
            onClick={deleteMovie} 
            className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
          >
            Clear Player
          </button>
        </div>
      )}

      <Link href="/" className="mt-12 text-gray-400 hover:text-black transition-colors font-semibold flex items-center gap-2">
        <span>←</span> Back to Watch Page
      </Link>
    </div>
  );
}