import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

export default function TailwindColorTest() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="mx-auto max-w-2xl space-y-6 rounded-xl bg-slate-800 p-6 shadow-lg border border-slate-700">
        
        {/* Text & Heading Colors */}
        <div>
          <h1 className="text-3xl font-bold text-sky-400">
            Tailwind Color Test
          </h1>
          <p className="mt-2 text-slate-300">
            If you see a dark background, colored boxes below, and styled text, Tailwind is working!
          </p>
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-red-500 p-4 text-center font-semibold text-white">
            bg-red-500
          </div>
          <div className="rounded-lg bg-emerald-500 p-4 text-center font-semibold text-slate-950">
            bg-emerald-500
          </div>
          <div className="rounded-lg bg-amber-400 p-4 text-center font-semibold text-slate-950">
            bg-amber-400
          </div>
          <div className="rounded-lg bg-purple-600 p-4 text-center font-semibold text-white">
            bg-purple-600
          </div>
        </div>

        {/* Interactive Hover & Border Test */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500">
            Hover Indigo
          </button>
          <button className="rounded-lg border-2 border-pink-500 px-4 py-2 font-medium text-pink-400 transition hover:bg-pink-500 hover:text-white">
            Pink Outline
          </button>
        </div>

      </div>
    </div>
     );
}