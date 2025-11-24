/**
 * pages/product.tsx
 *
 * Consultation Form and subscription-protected clinical workflow
 * for the LLMOps Healthcare App.
 *
 * This file implements:
 *
 * 1. A fully interactive Consultation Form:
 *    - Patient name input
 *    - Visit date selector (React DatePicker)
 *    - Free-text clinical notes field
 *
 * 2. Authenticated streaming communication with the backend `/api` endpoint
 *    using Server-Sent Events (SSE) via `fetchEventSource`.
 *
 * 3. Markdown rendering of the model's streamed output using
 *    ReactMarkdown + remark plugins for readable clinical summaries.
 *
 * 4. Subscription gating using Clerk's <Protect /> component:
 *    Only users with the premium subscription can access the form.
 *
 * 5. A top-right <UserButton /> for authenticated user interactions.
 *
 * This page will serve as the main clinical UI for generating
 * AI-powered consultation summaries.
 */

"use client";

// =======================
// React + Clerk imports
// =======================

import { useState, FormEvent } from 'react';
import { useAuth } from '@clerk/nextjs';

// =======================
// Form component imports
// =======================

import DatePicker from 'react-datepicker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

// SSE streaming helper from Microsoft
import { fetchEventSource } from '@microsoft/fetch-event-source';

// Subscription and user UI from Clerk
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';


// =======================
// ConsultationForm Component
// =======================

/**
 * The main form where clinicians enter:
 * - patient name
 * - date of visit
 * - consultation notes
 *
 * The form sends this data to the backend `/api` endpoint using SSE
 * and receives a structured consultation summary in real time.
 *
 * The `<Protect />` wrapper in the parent component ensures that
 * only subscribed users can access this functionality.
 */
function ConsultationForm() {
    // Retrieve Clerk's getToken helper for authenticated API requests
    const { getToken } = useAuth();

    // -----------------------
    // Form state variables
    // -----------------------

    // Patient name input
    const [patientName, setPatientName] = useState('');

    // Selected visit date (defaults to today)
    const [visitDate, setVisitDate] = useState<Date | null>(new Date());

    // Free-text consultation notes
    const [notes, setNotes] = useState('');

    // -----------------------
    // Streaming state
    // -----------------------

    // Accumulated model output as Markdown
    const [output, setOutput] = useState('');

    // Loading indicator while streaming
    const [loading, setLoading] = useState(false);

    /**
     * Handle form submission, authenticate with Clerk,
     * and stream the summarised consultation output.
     *
     * Parameters
     * ----------
     * e : FormEvent
     *     The submit event for the form.
     */
    async function handleSubmit(e: FormEvent) {
        // Prevent default browser submission behaviour
        e.preventDefault();

        // Reset previous output and set loading state
        setOutput('');
        setLoading(true);

        // Retrieve the Clerk-authenticated JWT
        const jwt = await getToken();

        // If no JWT is available, user is not authenticated
        if (!jwt) {
            setOutput('Authentication required');
            setLoading(false);
            return;
        }

        // Controller for aborting SSE requests if needed
        const controller = new AbortController();

        // Local buffer used to accumulate model output incrementally
        let buffer = '';

        // -----------------------
        // Call the backend `/api`
        // -----------------------
        await fetchEventSource('/api/consultation', {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Attach the user's Clerk JWT
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                patient_name: patientName,
                date_of_visit: visitDate?.toISOString().slice(0, 10),
                notes,
            }),

            // SSE message handler: append token chunks to buffer
            onmessage(ev) {
                buffer += ev.data;
                setOutput(buffer);
            },

            // Called when SSE closes normally
            onclose() { 
                setLoading(false);
            },

            // Handle streaming errors and abort
            onerror(err) {
                console.error('SSE error:', err);
                controller.abort();
                setLoading(false);
            },
        });
    }

    // =======================
    // Component UI rendering
    // =======================

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            {/* Page heading */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Consultation Notes
            </h1>

            {/* Main Consultation Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >

                {/* Patient Name Input */}
                <div className="space-y-2">
                    <label
                        htmlFor="patient"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Patient Name
                    </label>

                    <input
                        id="patient"
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter patient's full name"
                    />
                </div>

                {/* Date of Visit Picker */}
                <div className="space-y-2">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Date of Visit
                    </label>

                    <DatePicker
                        id="date"
                        selected={visitDate}
                        onChange={(d: Date | null) => setVisitDate(d)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {/* Consultation Notes Textarea */}
                <div className="space-y-2">
                    <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Consultation Notes
                    </label>

                    <textarea
                        id="notes"
                        required
                        rows={8}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter detailed consultation notes..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    {loading ? 'Generating Summary...' : 'Generate Summary'}
                </button>
            </form>

            {/* Render Model Output as Markdown */}
            {output && (
                <section className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="markdown-content prose prose-blue dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {output}
                        </ReactMarkdown>
                    </div>
                </section>
            )}
        </div>
    );
}


// =======================
// Parent Component wrapper
// =======================

/**
 * The exported `<Product />` component wraps the ConsultationForm with:
 *
 * - <UserButton />: Displays user menu in the top-right corner.
 * - <Protect />: Restricts access to users with the premium subscription.
 * - <PricingTable /> fallback: Shows subscription options for non-premium users.
 *
 * This acts as the entrypoint for clinicians accessing the consultation form.
 */
export default function Product() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

            {/* User profile menu positioned in top-right */}
            <div className="absolute top-4 right-4">
                <UserButton showName={true} />
            </div>

            {/* Subscription gating: only premium users may access the form */}
            <Protect
                plan="premium_subscription"
                fallback={
                    <div className="container mx-auto px-4 py-12">
                        <header className="text-center mb-12">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                Healthcare Professional Plan
                            </h1>

                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                                Streamline your patient consultations with AI-powered summaries
                            </p>
                        </header>

                        <div className="max-w-4xl mx-auto">
                            <PricingTable />
                        </div>
                    </div>
                }
            >
                {/* The main clinical consultation form */}
                <ConsultationForm />
            </Protect>
        </main>
    );
}