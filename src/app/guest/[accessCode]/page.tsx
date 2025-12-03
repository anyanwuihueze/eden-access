'use client';

import { use, useEffect, useRef, useState } from 'react';
import SelfieCapture from './components/selfie-capture';
import Vapi from '@vapi-ai/web';

export default function GuestPage({ params }: { params: Promise<{ accessCode: string }> }) {
  const { accessCode } = use(params);
  const vapiRef = useRef<Vapi | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

      vapiRef.current.on('call-start', () => {
        console.log('Call started');
        setCallActive(true);
      });

      vapiRef.current.on('call-end', () => {
        console.log('Call ended');
        setCallActive(false);
      });

      vapiRef.current.on('error', (error) => {
        console.error('VAPI error:', error);
        setCallActive(false);
        alert('Voice call failed. Please check microphone permissions.');
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const startWelcomeCall = async () => {
    if (!vapiRef.current || callStarted) return;

    try {
      setCallStarted(true);
      setCallActive(true);
      await vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_WELCOME_ASSISTANT_ID!);
    } catch (error) {
      console.error('VAPI call failed:', error);
      alert('Failed to start voice call: ' + JSON.stringify(error));
      setCallActive(false);
      setCallStarted(false);
    }
  };

  const stopCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setCallActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white">Eden Access</h1>
          </div>
          <p className="text-lg text-gray-300">Chevy View Estate - Guest Verification</p>
          <div className="mt-3 inline-block bg-gray-800 px-5 py-2 rounded-full shadow-lg border border-yellow-400">
            <span className="text-sm text-gray-400">Access Code: </span>
            <span className="font-mono font-bold text-yellow-400 text-lg">{accessCode}</span>
          </div>
        </div>

        {/* AI Concierge Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">AI Concierge Service</h2>
              <p className="text-sm text-gray-400">Maya is here to assist you</p>
            </div>
          </div>

          {!callStarted && (
            <div className="text-center py-4">
              <button
                onClick={startWelcomeCall}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  <span>Talk to Maya</span>
                </div>
              </button>
              <p className="text-xs text-gray-400 mt-3">Click to hear important instructions</p>
            </div>
          )}

          {callActive && (
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-400 rounded-xl p-5 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-yellow-400 font-semibold text-lg">Maya is speaking...</span>
              </div>
              <button
                onClick={stopCall}
                className="mt-2 text-sm text-red-400 hover:text-red-300 font-medium underline"
              >
                End Call
              </button>
            </div>
          )}
        </div>

        {/* Selfie Capture Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Security Verification</h2>
              <p className="text-sm text-gray-400">Take a quick selfie for gate clearance</p>
            </div>
          </div>

          <SelfieCapture accessCode={accessCode} />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            🔒 Your photo is encrypted and securely stored for verification purposes only
          </p>
        </div>
      </div>
    </div>
  );
}
