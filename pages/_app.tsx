/**
 * pages/_app.tsx
 *
 * Global application wrapper for the LLMOps Healthcare App.
 *
 * This file:
 * 1. Wraps the entire Next.js application in ClerkProvider, enabling
 *    authentication and user session management across every page.
 * 2. Loads global CSS styles, including Tailwind base styles and the
 *    React DatePicker stylesheet used in patient-visit forms.
 *
 * This is the root-level React component for all pages in the Pages Router.
 */

import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';

// =======================
// Global style imports
// =======================

// Import styles for the React DatePicker component UI
import 'react-datepicker/dist/react-datepicker.css';

// Import project-wide global styles (Tailwind, typography, etc.)
import '../styles/globals.css';

// =======================
// Custom App Component
// =======================

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    /**
     * Wrap the entire app with ClerkProvider
     *
     * This ensures Clerk authentication state (session, user data)
     * is available across all pages, components, and API requests.
     */
    <ClerkProvider {...pageProps}>
      {/* Render the active route's page component */}
      <Component {...pageProps} />
    </ClerkProvider>
  );
}