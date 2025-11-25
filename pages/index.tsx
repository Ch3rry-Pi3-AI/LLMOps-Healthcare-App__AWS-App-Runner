/**
 * pages/index.tsx
 *
 * Public landing page for the LLMOps Healthcare App ("MediNotes Pro").
 *
 * This file defines:
 *
 * 1. A marketing-facing hero page that introduces the application,
 *    highlights its core features, and provides clear calls-to-action.
 *
 * 2. A Clerk-authenticated navigation bar:
 *    - Signed-out users see a "Sign In" button (modal).
 *    - Signed-in users see:
 *         • A "Go to App" button linking to the consultation assistant.
 *         • A personalised <UserButton /> menu.
 *
 * 3. A feature grid outlining the application's capabilities:
 *    - Professional AI-generated summaries
 *    - Clear action items for doctors
 *    - Patient-friendly email drafts
 *
 * 4. Dynamic CTA behaviour:
 *    - Signed-out users → “Start Free Trial”
 *    - Signed-in users → “Open Consultation Assistant”
 *
 * This page is the first point of contact for clinicians visiting the platform.
 */

"use client";

// =======================
// Imports
// =======================

// Routing helpers from Next.js
import Link from 'next/link';

// Clerk authentication UI components
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


// =======================
// Landing Page Component
// =======================

export default function Home() {
  return (
    // Main page container with light/dark gradient background
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">

        {/* -------------------- */}
        {/* Navigation Bar       */}
        {/* -------------------- */}
        <nav className="flex justify-between items-center mb-12">
          {/* App name / logo placeholder */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            MediNotes Pro
          </h1>

          {/* Authentication controls */}
          <div>
            {/* If user is signed out, show a modal Sign In button */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* If user is signed in, show App button + user menu */}
            <SignedIn>
              <div className="flex items-center gap-4">
                {/* Button linking to the consultation assistant */}
                <Link 
                  href="/product" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>

                {/* User profile menu */}
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </nav>


        {/* -------------------- */}
        {/* Hero Section         */}
        {/* -------------------- */}
        <div className="text-center py-16">
          
          {/* Main headline */}
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Transform Your
            <br />
            Consultation Notes
          </h2>

          {/* Subheading description */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            AI-powered assistant that generates professional summaries, action items,
            and patient communications from your consultation notes
          </p>


          {/* -------------------- */}
          {/* Feature Grid         */}
          {/* -------------------- */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">

            {/* Feature 1: Professional Summaries */}
            <div className="relative group">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

              {/* Feature card */}
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Professional Summaries
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generate comprehensive medical record summaries from your notes
                </p>
              </div>
            </div>

            {/* Feature 2: Action Items */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Action Items
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Clear next steps and follow-up actions for every consultation
                </p>
              </div>
            </div>

            {/* Feature 3: Patient Emails */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Patient Emails
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Draft clear, patient-friendly email communications automatically
                </p>
              </div>
            </div>
          </div>


          {/* -------------------- */}
          {/* Call-to-Action       */}
          {/* -------------------- */}

          {/* Signed-out users see Start Free Trial */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
            </SignInButton>
          </SignedOut>

          {/* Signed-in users go directly to the main app */}
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Open Consultation Assistant
              </button>
            </Link>
          </SignedIn>
        </div>


        {/* -------------------- */}
        {/* Trust Indicators      */}
        {/* -------------------- */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>HIPAA Compliant • Secure • Professional</p>
        </div>

      </div>
    </main>
  );
}