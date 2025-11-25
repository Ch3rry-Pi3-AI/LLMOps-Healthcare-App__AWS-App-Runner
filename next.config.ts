/**
 * next.config.ts
 *
 * Global Next.js configuration for the LLMOps Healthcare App.
 *
 * This configuration ensures compatibility with **static export mode**,
 * which Vercel uses for hybrid deployments when a project includes
 * serverless Python functions (in `/api`) alongside a Next.js frontend.
 *
 * Key behaviours:
 *
 * 1. `output: 'export'`
 *    - Forces Next.js to output static HTML + JS files instead of
 *      relying on server-side rendering.
 *    - Required because our dynamic backend is handled separately
 *      by Vercel Python serverless functions.
 *
 * 2. `images.unoptimized: true`
 *    - Disables the Next.js Image Optimization pipeline.
 *    - Mandatory when using static export mode because the optimisation
 *      server cannot be generated during build.
 *
 * This keeps the deployment consistent, predictable, and compatible
 * with Vercel’s static + serverless hybrid architecture.
 */

import type { NextConfig } from "next";

// ============================
// Next.js Configuration Object
// ============================

const nextConfig: NextConfig = {
  // Export the site as static HTML/JS files instead of SSR output
  output: 'export',

  images: {
    // Disable the built-in image optimisation pipeline
    // (required when using static export mode)
    unoptimized: true,
  },
};

// Export the configuration for use by Next.js
export default nextConfig;
