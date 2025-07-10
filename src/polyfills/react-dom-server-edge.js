// Polyfill for react-dom/server.edge compatibility with React 18
// This provides the server.edge exports that Cloudflare Edge runtime expects

import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// Export React 18 server functions as Edge-compatible exports
export { renderToString, renderToStaticMarkup };

// Provide additional Edge runtime compatibility
export const renderToReadableStream = renderToString;
export const renderToStaticStream = renderToStaticMarkup; 