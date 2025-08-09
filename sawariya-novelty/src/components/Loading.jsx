import React from 'react'
import { motion } from 'framer-motion'


// Helper: ring gradient spinner
function Spinner({ size = 48 }) {
  const ringStyle = {
    width: size,
    height: size,
  }
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={ringStyle}
      aria-hidden
    >
      {/* Outer blurred glow */}
      <div
        className="absolute inset-0 rounded-full blur-sm opacity-20"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.9), transparent 15%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.85), transparent 25%)',
        }}
      />

      {/* Rotating ring (svg) */}
      <svg
        viewBox="0 0 50 50"
        className="animate-[spin_1.1s_linear_infinite]"
        style={{ width: size, height: size }}
      >
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="18"
          stroke="url(#g1)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray="80"
          strokeDashoffset="60"
        />
      </svg>

      {/* Center small orb */}
      <motion.div
        className="absolute rounded-full shadow-lg"
        animate={{ scale: [0.9, 1.08, 0.95] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: size * 0.22, height: size * 0.22, background: '#ffffff' }}
      />
    </div>
  )
}

// Helper: three bouncing dots
function Dots() {
  const dot = (delay) => (
    <motion.span
      key={delay}
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 0.7, delay }}
      className="inline-block w-2.5 h-2.5 rounded-full mx-1"
      aria-hidden
      style={{ background: 'linear-gradient(180deg, #6366F1, #3B82F6)' }}
    />
  )
  return (
    <div className="flex items-end justify-center">
      {dot(0)}
      {dot(0.12)}
      {dot(0.24)}
    </div>
  )
}

// Helper: simple skeleton shimmer bar
function Skeleton({ className = 'h-4 rounded-md' }) {
  return (
    <div className={`overflow-hidden bg-gray-200 dark:bg-gray-700 ${className}`}>
      <motion.div
        className="h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        style={{ filter: 'blur(6px)' }}
        aria-hidden
      />
    </div>
  )
}

export default function BeautifulLoader({
  variant = 'spinner',
  size = 48,
  text,
  fullscreen = false,
  className = '',
}) {
  const base = 'flex flex-col items-center gap-3 text-center'
  const containerClasses = fullscreen
    ? 'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4'
    : 'inline-flex'

  return (
    <div className={`${containerClasses}`}>
      <div className={`${base} ${className}`} role="status" aria-live="polite">
        {variant === 'spinner' && <Spinner size={size} />}
        {variant === 'dots' && (
          <div className="p-2 rounded-md bg-white/6 shadow-sm inline-flex">
            <Dots />
          </div>
        )}

        {variant === 'skeleton' && (
          <div className="w-full flex flex-col gap-2 items-stretch">
            <Skeleton className="h-4 rounded w-full" />
            <Skeleton className="h-4 rounded w-5/6" />
            <Skeleton className="h-4 rounded w-2/3" />
          </div>
        )}

        {text && <div className="text-sm text-gray-600 dark:text-gray-300">{text}</div>}
      </div>
    </div>
  )
}

// -------------------- USAGE EXAMPLES (commented) --------------------
// 1) Inline spinner
// <BeautifulLoader variant="spinner" size={56} text="Loading dashboard..." />

// 2) Fullscreen overlay while fetching
// <BeautifulLoader variant="spinner" fullscreen text="Preparing your workspace" />

// 3) Small button-friendly loader
// <button className="px-4 py-2 rounded bg-indigo-600 text-white inline-flex items-center gap-2">
//   <BeautifulLoader variant="dots" />
//   Saving
// </button>

// 4) Skeleton placeholder for cards list
// <div className="max-w-md">
//   <BeautifulLoader variant="skeleton" />
// </div>

// -------------------- NOTES --------------------
// - This file expects Tailwind CSS + Framer Motion to be installed.
// - If you want TypeScript, I can convert the file and add prop types.
// - For dynamic colors, pass a wrapper "className" and style the inner pieces with CSS variables.
