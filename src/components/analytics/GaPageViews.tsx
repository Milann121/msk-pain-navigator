import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from '@/lib/analytics';

const GaPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    // defer to ensure title updates are captured
    const id = window.requestAnimationFrame(sendPageView);
    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default GaPageViews;
