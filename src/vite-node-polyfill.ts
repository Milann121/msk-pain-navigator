
// This file contains polyfills for Node.js core modules in the browser.
export function nodePolyfills() {
  return {
    name: 'vite:node-polyfills',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string): {
        html: string;
        tags: { tag: string; children: string; injectTo: string }[];
      } {
        return {
          html,
          tags: [
            {
              tag: 'script',
              children: `
                window.global = window;
                window.process = { env: {} };
              `,
              injectTo: 'head',
            },
          ],
        };
      },
    },
  };
}
