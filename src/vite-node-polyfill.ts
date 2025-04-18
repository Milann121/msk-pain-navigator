
// This file provides browser polyfills for Node.js built-ins if needed in the future

export function nodePolyfills() {
  const processPolyfill = `
    window.process = {
      env: {},
      nextTick: (fn) => setTimeout(fn, 0),
      browser: true,
      version: '',
      versions: { node: '' }
    };
  `;

  return {
    name: 'vite:node-polyfills',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              children: processPolyfill,
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    },
  };
}
