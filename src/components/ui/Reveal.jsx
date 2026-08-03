import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const noIO = typeof window === 'undefined' || typeof IntersectionObserver === 'undefined';
  const [visible, setVisible] = useState(noIO);

  useEffect(() => {
    const el = ref.current;
    if (!el || noIO) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [noIO]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
