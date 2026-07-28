import { motion } from 'framer-motion';

const orbs = [
  { size: 700, x: '50%', y: '25%', color: 'rgba(99,102,241,0.08)', blur: 140, delay: 0 },
  { size: 500, x: '20%', y: '60%', color: 'rgba(139,92,246,0.06)', blur: 120, delay: 0.5 },
  { size: 400, x: '80%', y: '70%', color: 'rgba(6,182,212,0.06)', blur: 100, delay: 1 },
  { size: 300, x: '70%', y: '20%', color: 'rgba(99,102,241,0.05)', blur: 80, delay: 1.5 },
];

const floatingIcons = [
  { icon: '💬', x: '8%', y: '30%', delay: 0, size: 20 },
  { icon: '⚡', x: '92%', y: '40%', delay: 1, size: 18 },
  { icon: '🔒', x: '12%', y: '72%', delay: 2, size: 16 },
  { icon: '🌐', x: '88%', y: '75%', delay: 0.5, size: 18 },
  { icon: '🎯', x: '5%', y: '50%', delay: 1.5, size: 14 },
  { icon: '✨', x: '95%', y: '20%', delay: 2.5, size: 16 },
];

export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: orb.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5, delay: item.delay }}
        >
          <motion.span
            className="block text-center"
            style={{ fontSize: item.size }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {item.icon}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none bg-grid-subtle" />
  );
}
