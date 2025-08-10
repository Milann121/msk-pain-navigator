// Lightweight GA4 helpers for SPA page tracking
// Types
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function sendPageView() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const { pathname, search, hash, href } = window.location;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_path: `${pathname}${search}${hash}`,
    page_location: href,
  });
}

export function sendEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}
