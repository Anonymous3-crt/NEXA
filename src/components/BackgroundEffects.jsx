import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

function SoftGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 30%, transparent 65%)',
          filter: 'blur(120px)',
        }}
        animate={{ scale: [1, 1.08, 0.95, 1], opacity: [0.5, 0.8, 0.4, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[60%] left-[20%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, rgba(14,116,144,0.02) 30%, transparent 55%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -15, 10, 0], opacity: [0.3, 0.6, 0.4, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, rgba(192,132,252,0.02) 30%, transparent 50%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, -20, 15, 0], y: [0, 10, -15, 0], opacity: [0.2, 0.5, 0.3, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 50%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.1, 0.9, 1], opacity: [0.1, 0.35, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function SubtleGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1" fill="rgba(99,102,241,0.15)" />
            <circle cx="60" cy="60" r="1" fill="rgba(99,102,241,0.15)" />
          </pattern>
          <pattern id="techGridLarge" width="240" height="240" patternUnits="userSpaceOnUse">
            <path d="M 240 0 L 0 0 0 240" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGridLarge)" />
        <rect width="100%" height="100%" fill="url(#techGrid)" />
      </svg>
    </div>
  );
}

function FloatingGlass() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      <motion.div
        className="absolute top-[18%] right-[12%] w-28 h-28 rounded-2xl"
        style={{ backdropFilter: 'blur(24px)', background: 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.02))', border: '1px solid rgba(255,255,255,0.04)' }}
        animate={{ y: [0, -14, 0], rotate: [0, 6, -3, 0], scale: [1, 1.02, 0.98, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[22%] left-[10%] w-20 h-20 rounded-xl"
        style={{ backdropFilter: 'blur(20px)', background: 'linear-gradient(135deg, rgba(6,182,212,0.03), rgba(14,116,144,0.01))', border: '1px solid rgba(255,255,255,0.03)' }}
        animate={{ y: [0, 12, 0], rotate: [0, -4, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[45%] left-[6%] w-24 h-24 rounded-full"
        style={{ backdropFilter: 'blur(16px)', background: 'linear-gradient(135deg, rgba(168,85,247,0.03), transparent)', border: '1px solid rgba(168,85,247,0.05)' }}
        animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[6%] w-16 h-16"
        style={{ backdropFilter: 'blur(16px)', background: 'linear-gradient(135deg, rgba(244,63,94,0.02), transparent)', border: '1px solid rgba(244,63,94,0.04)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        animate={{ y: [0, 10, 0], scale: [1, 1.08, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[8%] left-[20%] w-14 h-14 rounded-2xl"
        style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)' }}
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

function NeuralLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block opacity-[0.04]">
      <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <motion.path
          d="M0,450 Q200,300 400,450 T800,450 T1200,450 T1440,450"
          fill="none"
          stroke="url(#neuralGrad1)"
          strokeWidth="0.6"
          animate={{ d: ['M0,450 Q200,300 400,450 T800,450 T1200,450 T1440,450', 'M0,400 Q200,520 400,420 T800,480 T1200,420 T1440,500', 'M0,450 Q200,300 400,450 T800,450 T1200,450 T1440,450'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,550 Q300,650 600,550 T1200,550 T1440,550"
          fill="none"
          stroke="url(#neuralGrad2)"
          strokeWidth="0.5"
          animate={{ d: ['M0,550 Q300,650 600,550 T1200,550 T1440,550', 'M0,500 Q300,600 600,500 T1200,600 T1440,500', 'M0,550 Q300,650 600,550 T1200,550 T1440,550'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,650 Q250,550 500,650 T1000,650 T1440,650"
          fill="none"
          stroke="url(#neuralGrad3)"
          strokeWidth="0.4"
          animate={{ d: ['M0,650 Q250,550 500,650 T1000,650 T1440,650', 'M0,680 Q250,580 500,680 T1000,580 T1440,680', 'M0,650 Q250,550 500,650 T1000,650 T1440,650'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="neuralGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(99,102,241,0)" />
            <stop offset="30%" stopColor="rgba(99,102,241,0.8)" />
            <stop offset="70%" stopColor="rgba(139,92,246,0.8)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
          <linearGradient id="neuralGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,92,246,0)" />
            <stop offset="40%" stopColor="rgba(139,92,246,0.6)" />
            <stop offset="60%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
          <linearGradient id="neuralGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(6,182,212,0)" />
            <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 20,
    color: ['rgba(99,102,241,0.3)', 'rgba(139,92,246,0.2)', 'rgba(6,182,212,0.2)', 'rgba(168,85,247,0.15)'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function PersonWithPhone() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      <motion.div
        className="absolute top-[8%] right-[2%]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute -top-10 -right-10 w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.1, 0.95, 1], opacity: [0.3, 0.6, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg width="400" height="580" viewBox="0 0 400 580" fill="none" className="opacity-[0.55]">
          <defs>
            <linearGradient id="personGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="personHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="phoneBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0a0a1a" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.04" />
            </linearGradient>
            <radialGradient id="phoneAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Person silhouette */}
          <g opacity="0.6">
            {/* Hair */}
            <path d="M185 100 C170 100 150 115 148 140 C146 155 150 165 155 170 L180 175 L205 170 C210 165 214 155 212 140 C210 115 200 100 185 100Z" fill="url(#personHighlight)" stroke="rgba(196,181,253,0.15)" strokeWidth="0.6" />
            {/* Head */}
            <path d="M190 220 C162 220 140 198 140 170 C140 142 162 120 190 120 C218 120 240 142 240 170 C240 198 218 220 190 220Z" fill="url(#personGrad)" stroke="rgba(196,181,253,0.2)" strokeWidth="0.8" />
            {/* Neck */}
            <path d="M180 220 L180 240 L200 240 L200 220Z" fill="url(#personGrad)" stroke="rgba(196,181,253,0.1)" strokeWidth="0.5" />
            {/* Torso */}
            <path d="M190 240 C130 240 85 295 85 370 L85 470 C85 482 95 492 108 492 L272 492 C285 492 295 482 295 470 L295 370 C295 295 250 240 190 240Z" fill="url(#personGrad)" stroke="rgba(196,181,253,0.18)" strokeWidth="0.8" />
            {/* Shoulder line */}
            <path d="M130 260 C150 250 230 250 250 260" fill="none" stroke="rgba(196,181,253,0.1)" strokeWidth="0.6" />
            {/* Collar */}
            <path d="M160 265 L190 290 L220 265" fill="none" stroke="rgba(196,181,253,0.08)" strokeWidth="0.5" />
            {/* Left arm holding phone */}
            <path d="M130 280 C115 310 90 360 80 400 C78 408 82 415 90 415 L108 415 C112 415 116 410 118 400 C125 370 135 340 150 320" fill="url(#personGrad)" stroke="rgba(196,181,253,0.15)" strokeWidth="0.7" />
            {/* Right arm holding phone */}
            <path d="M250 280 C265 310 290 360 300 400 C302 408 298 415 290 415 L272 415 C268 415 264 410 262 400 C255 370 245 340 230 320" fill="url(#personGrad)" stroke="rgba(196,181,253,0.15)" strokeWidth="0.7" />
            {/* Face features - subtle */}
            <path d="M175 168 C175 165 178 162 182 162" fill="none" stroke="rgba(196,181,253,0.12)" strokeWidth="0.5" />
            <path d="M198 162 C202 162 205 165 205 168" fill="none" stroke="rgba(196,181,253,0.12)" strokeWidth="0.5" />
            <path d="M182 183 C186 187 194 187 198 183" fill="none" stroke="rgba(196,181,253,0.08)" strokeWidth="0.4" />
          </g>

          {/* Phone */}
          <g transform="translate(120, 300)">
            {/* Phone body */}
            <rect x="-5" y="-5" width="170" height="320" rx="28" fill="url(#phoneBodyGrad)" stroke="rgba(196,181,253,0.25)" strokeWidth="1.2" />
            <rect x="-5" y="-5" width="170" height="320" rx="28" fill="url(#phoneAura)" />
            {/* Phone edge highlight */}
            <rect x="-4" y="-4" width="168" height="318" rx="27" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            {/* Notch / speaker */}
            <rect x="65" y="6" width="50" height="5" rx="2.5" fill="rgba(196,181,253,0.15)" />
            {/* Screen */}
            <rect x="8" y="22" width="154" height="272" rx="18" fill="rgba(5,5,15,0.9)" stroke="rgba(196,181,253,0.1)" strokeWidth="0.5" />
            {/* Screen content background glow */}
            <rect x="8" y="22" width="154" height="272" rx="18" fill="url(#screenGrad)" opacity="0.5" />
            {/* Home indicator */}
            <rect x="70" y="295" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />

            {/* Header bar */}
            <rect x="14" y="28" width="142" height="18" rx="6" fill="rgba(99,102,241,0.12)" />
            <rect x="20" y="33" width="8" height="8" rx="2" fill="rgba(167,139,250,0.3)" />
            <text x="33" y="40" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace" fontWeight="600">Nexa AI</text>
            <circle cx="140" cy="37" r="4" fill="rgba(16,185,129,0.25)" />
            <circle cx="140" cy="37" r="1.5" fill="rgba(16,185,129,0.5)" />

            {/* AI greeting bubble */}
            <rect x="14" y="52" width="110" height="26" rx="10" fill="rgba(255,255,255,0.05)" />
            <rect x="20" y="58" width="8" height="14" rx="4" fill="rgba(167,139,250,0.25)" />
            <text x="33" y="68" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace">Hey! I'm Nexa, your AI</text>

            {/* User bubble */}
            <rect x="50" y="84" width="110" height="26" rx="10" fill="rgba(99,102,241,0.08)" />
            <rect x="56" y="90" width="8" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
            <text x="69" y="100" fill="rgba(255,255,255,0.45)" fontSize="6.5" fontFamily="monospace">Build me a dashboard</text>

            {/* AI response streaming */}
            <rect x="14" y="116" width="130" height="38" rx="10" fill="rgba(255,255,255,0.04)" />
            <rect x="20" y="122" width="8" height="14" rx="4" fill="rgba(167,139,250,0.25)" />
            <text x="33" y="132" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace">Here's a complete dashboard</text>
            <text x="33" y="142" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="monospace">scaffold with charts, tables...</text>

            {/* Status bar - streaming */}
            <rect x="14" y="160" width="60" height="18" rx="8" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.1)" strokeWidth="0.4" />
            <motion.circle cx="22" cy="169" r="3" fill="#10b981" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <text x="30" y="173" fill="rgba(16,185,129,0.4)" fontSize="5.5" fontFamily="monospace">Thinking</text>

            {/* Code snippet card */}
            <rect x="14" y="184" width="66" height="42" rx="8" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.1)" strokeWidth="0.4" />
            <rect x="20" y="191" width="8" height="8" rx="2" fill="rgba(99,102,241,0.2)" />
            <text x="32" y="198" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace">Code</text>
            <text x="20" y="209" fill="rgba(255,255,255,0.15)" fontSize="4.5" fontFamily="monospace">React + Node</text>
            <text x="20" y="218" fill="rgba(255,255,255,0.1)" fontSize="4" fontFamily="monospace">Full stack</text>

            {/* Design card */}
            <rect x="86" y="184" width="66" height="42" rx="8" fill="rgba(236,72,153,0.06)" stroke="rgba(236,72,153,0.1)" strokeWidth="0.4" />
            <rect x="92" y="191" width="8" height="8" rx="2" fill="rgba(236,72,153,0.2)" />
            <text x="104" y="198" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace">Design</text>
            <text x="92" y="209" fill="rgba(255,255,255,0.15)" fontSize="4.5" fontFamily="monospace">Components</text>
            <text x="92" y="218" fill="rgba(255,255,255,0.1)" fontSize="4" fontFamily="monospace">+ Assets</text>

            {/* Divider */}
            <line x1="14" y1="232" x2="156" y2="232" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

            {/* File analysis pill */}
            <rect x="14" y="238" width="142" height="20" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
            <rect x="20" y="244" width="7" height="7" rx="2" fill="rgba(16,185,129,0.2)" />
            <text x="31" y="251" fill="rgba(255,255,255,0.18)" fontSize="5" fontFamily="monospace">brand-assets.zip · 24 files analyzed</text>

            {/* Input bar */}
            <rect x="14" y="264" width="142" height="18" rx="9" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.06)" strokeWidth="0.4" />
            <text x="22" y="276" fill="rgba(255,255,255,0.1)" fontSize="5.5" fontFamily="monospace">Ask Nexa anything...</text>
            <rect x="122" y="266" width="30" height="14" rx="7" fill="rgba(99,102,241,0.08)" />
            <text x="129" y="276" fill="rgba(167,139,250,0.3)" fontSize="5" fontFamily="monospace">Send</text>
          </g>

          {/* Holographic rings / orbit */}
          <g opacity="0.08">
            <motion.ellipse cx="190" cy="380" rx="130" ry="20" fill="none" stroke="#818cf8" strokeWidth="0.5" transform="rotate(-5, 190, 380)" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <motion.ellipse cx="190" cy="380" rx="100" ry="15" fill="none" stroke="#a78bfa" strokeWidth="0.4" transform="rotate(3, 190, 380)" animate={{ rotate: [360, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
          </g>

          {/* Floating particles around person */}
          <g opacity="0.12" filter="url(#glowFilter)">
            <motion.circle cx="80" cy="160" r="3" fill="#a78bfa" animate={{ y: [0, -15, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.circle cx="300" cy="180" r="2" fill="#818cf8" animate={{ y: [0, -12, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
            <motion.circle cx="70" cy="280" r="2.5" fill="#c4b5fd" animate={{ y: [0, 10, 0], opacity: [0.1, 0.35, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            <motion.circle cx="310" cy="300" r="1.5" fill="#a78bfa" animate={{ y: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
            <motion.circle cx="75" cy="420" r="2" fill="#6366f1" animate={{ x: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
            <motion.circle cx="310" cy="430" r="2.5" fill="#8b5cf6" animate={{ x: [0, -8, 0], opacity: [0.1, 0.35, 0.1] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
          </g>

          {/* Tech UI elements floating */}
          <g opacity="0.08">
            <motion.g animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <rect x="50" y="230" width="40" height="24" rx="6" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.15)" strokeWidth="0.3" />
              <text x="56" y="245" fill="rgba(255,255,255,0.2)" fontSize="4.5" fontFamily="monospace">API</text>
            </motion.g>
            <motion.g animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
              <rect x="290" y="350" width="50" height="24" rx="6" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.12)" strokeWidth="0.3" />
              <text x="296" y="365" fill="rgba(255,255,255,0.18)" fontSize="4.5" fontFamily="monospace">99.9%</text>
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

export function MouseGlow() {
  const ref = useRef(null);
  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ background: 'radial-gradient(900px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.035) 0%, rgba(139,92,246,0.015) 30%, transparent 60%)' }}
    />
  );
}

export default function BackgroundEffects() {
  return (
    <>
      <SoftGlow />
      <SubtleGrid />
      <NeuralLines />
      <ParticleField />
      <PersonWithPhone />
      <FloatingGlass />
      <MouseGlow />
    </>
  );
}
