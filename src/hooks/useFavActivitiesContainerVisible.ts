import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __favContainerVisible?: boolean;
  }
}

export const useFavActivitiesContainerVisible = () => {
  const [visible, setVisible] = useState<boolean>(Boolean(
    typeof window !== 'undefined' && window.__favContainerVisible
  ));

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const custom = e as CustomEvent<{ visible: boolean }>;
        setVisible(!!custom.detail?.visible);
      } catch {
        // noop
      }
    };

    window.addEventListener(
      'favActivitiesContainerVisibility',
      handler as EventListener
    );
    return () => {
      window.removeEventListener(
        'favActivitiesContainerVisibility',
        handler as EventListener
      );
    };
  }, []);

  return visible;
};
