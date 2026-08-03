import { useCallback, useState } from 'react';

export const THEME_KEY = 'nexa_landing_theme';

export function getLandingTheme() {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getLandingTheme);

  const persist = useCallback((t) => {
    if (typeof window !== 'undefined') localStorage.setItem(THEME_KEY, t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      persist(next);
      return next;
    });
  }, [persist]);

  const set = useCallback(
    (next) => {
      setTheme(next);
      persist(next);
    },
    [persist],
  );

  return { theme, toggle, set };
}
