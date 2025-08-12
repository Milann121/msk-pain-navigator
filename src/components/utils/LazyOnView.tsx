
import React, { useEffect, useRef, useState } from 'react';

type LazyOnViewProps = {
  children: React.ReactNode;
  rootMargin?: string;
  className?: string;
  once?: boolean;
};

const LazyOnView: React.FC<LazyOnViewProps> = ({
  children,
  rootMargin = '200px',
  className,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return <div ref={ref} className={className}>{isVisible ? children : null}</div>;
};

export default LazyOnView;
