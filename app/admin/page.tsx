"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [moviePublicId, setMoviePublicId] = useState("");

  // When the page loads, check if we already have a movie saved
  useEffect(() => {
    const savedId = localStorage.getItem("currentMovieId");
    if (savedId) setMovieIdFromStorage(savedId);
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
    <div className="min-h-screen bg-white p-10 flex flex-col items-center gap-6 text-black">
      <h1 className="text-3xl font-black mb-4">Admin Dashboard</h1>
      
      {/* Upload Button */}
      <CldUploadWidget 
        uploadPreset="ml_default" 
        onSuccess={(result: any) => {
          const id = result.info.public_id;
          setMovieIdFromStorage(id);
        }}
      >
        {({ open }) => (
          <button 
            onClick={() => open()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
          >
            Upload New Movie
          </button>
        )}
      </CldUploadWidget>

      {moviePublicId && (
        <div className="mt-8 p-6 border-2 border-dashed border-gray-200 rounded-3xl w-full max-w-sm text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Currently Playing</p>
          <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all mb-4">{moviePublicId}</p>
          
          <button 
            onClick={deleteMovie} 
            className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            Delete Movie
          </button>
        </div>
      )}

      <Link href="/" className="mt-10 text-gray-400 hover:text-black transition-colors">
        ← Back to Watch Page
      </Link>
    </div>
  );
}