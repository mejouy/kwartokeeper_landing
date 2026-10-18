import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

/** Short fade-up used once when the hero loads. */
export const popIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

/** Turns animations off for visitors who ask their device for less motion. */
export const reducedMotion = {
  '@media (prefers-reduced-motion: reduce)': { animation: 'none !important', transition: 'none !important', opacity: '1 !important', transform: 'none !important' },
};

/** Returns [ref, inView]. inView flips to true once the element scrolls into view. */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Gently fades its children in when they scroll into view. */
export function Reveal({ children, delay = 0, sx, component = 'div' }) {
  const [ref, inView] = useInView();
  return (
    <Box
      ref={ref}
      component={component}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(12px)',
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
        height: '100%',
        ...reducedMotion,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}