'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  accessCode: string;
  guestName: string;
  guestPhone: string;
  onCheckoutComplete: () => void;
}

export function CheckoutButton({ accessCode, guestName, guestPhone, onCheckoutComplete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [calling, setCalling] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

      vapiRef.current.on('call-start', () => {
        console.log('Checkout call started');
        setCalling(true);
      });

      vapiRef.current.on('call-end', () => {
        console.log('Checkout call ended');
        setCalling(false);
        setShowModal(false);
        onCheckoutComplete();
      });

      vapiRef.current.on('error', (error) => {
        console.error('Checkout call error:', error);
        setCalling(false);
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [onCheckoutComplete]);

  const handleCheckout = async () => {
    // Update database
    await fetch('/api/guest-visits/check-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode }),
    });

    // Show modal
    setShowModal(true);
  };

  const startFeedbackCall = async () => {
    if (vapiRef.current) {
      await vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID!, {
        metadata: { accessCode, guestName, guestPhone },
      });
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={handleCheckout}>
        <LogOut className="mr-2 h-4 w-4" /> Check Out
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Guest Checkout - {guestName}</DialogTitle>
            <DialogDescription>
              Please hand your device to the guest for a quick exit survey
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!calling ? (
              <Button 
                onClick={startFeedbackCall}
                className="w-full h-20 text-lg bg-gradient-to-r from-emerald-500 to-teal-600"
              >
                🎙️ Start Exit Survey
              </Button>
            ) : (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-semibold">AI is speaking with guest...</span>
                </div>
                <p className="text-sm text-gray-600">Please wait for the survey to complete</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
