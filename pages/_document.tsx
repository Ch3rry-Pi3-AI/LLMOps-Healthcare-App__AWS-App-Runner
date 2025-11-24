/**
 * pages/_document.tsx
 *
 * Custom Document configuration for the LLMOps Healthcare App.
 *
 * This file:
 * 1. Defines the base HTML structure used by Next.js Pages Router.
 * 2. Sets global metadata such as the page title and meta description.
 * 3. Ensures that the <Html>, <Head>, <Main>, and <NextScript> structure
 *    is correctly established for all pages.
 *
 * This file ONLY renders on the server and is not interactive.
 */

import { Html, Head, Main, NextScript } from 'next/document';

// =======================
// Custom Document Component
// =======================

export default function Document() {
  return (
    // Define root <html> element with language attributes
    <Html lang="en">
      <Head>
        {/* Title of the application (visible in browser tab) */}
        <title>Healthcare Consultation Assistant</title>

        {/* Metadata for SEO and descriptive context */}
        <meta
          name="description"
          content="AI-powered medical consultation summaries"
        />
      </Head>

      {/* Body of the HTML document */}
      <body>
        {/* Next.js renders the active page here */}
        <Main />

        {/* Next.js injects its required scripts here */}
        <NextScript />
      </body>
    </Html>
  );
}