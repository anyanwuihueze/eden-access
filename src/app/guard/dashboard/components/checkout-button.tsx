'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Mic } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
  accessCode: string;
  guestName: string;
  guestPhone: string;
  onCheckoutComplete: () => void;
}

// Suppress harmless console warnings for presentation
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (
      errorString.includes('Ignoring settings for browser- or platform-unsupported input processor(s): audio') ||
      errorString.includes('Generator.next') ||
      errorString.includes('Requested device not found') ||
      errorString.includes('microphone')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function CheckoutButton({ accessCode, guestName, guestPhone, onCheckoutComplete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [calling, setCalling] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || vapiRef.current) {
      console.log('VAPI already initialized');
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('VAPI public key is missing');
      setMicError('Configuration error: Missing API key');
      return;
    }

    try {
      console.log('Initializing VAPI for checkout...');
      vapiRef.current = new Vapi(publicKey);
      isInitialized.current = true;
      
      vapiRef.current.on('call-start', () => {
        console.log('Checkout call started');
        setCalling(true);
        setMicError(null);
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
        
        const errorMessage = error?.message || error?.error || String(error);
        const errorName = error?.name || '';
        
        if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied')) {
          setMicError('🎤 Microphone access denied. Click the 🔒 icon in your browser address bar, allow microphone, then try again.');
        } else if (errorName === 'NotFoundError' || errorMessage.includes('device not found') || errorMessage.includes('Requested device not found')) {
          setMicError('🎤 No microphone detected. Please ensure a microphone is connected and no other apps are using it.');
        } else if (errorName === 'NotReadableError' || errorMessage.includes('not readable')) {
          setMicError('🎤 Microphone is being used by another app. Please close other apps and try again.');
        } else if (errorMessage.includes('unsupported input processor')) {
          console.warn('Audio processor warning (non-critical)');
          return;
        } else {
          setMicError(`Call failed: ${errorMessage}`);
        }
      });

      console.log('VAPI initialized for checkout');
    } catch (error) {
      console.error('Failed to initialize VAPI:', error);
      setMicError('Failed to initialize voice system. Please refresh the page.');
    }

    return () => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
          console.log('VAPI cleaned up');
        } catch (e) {
          console.error('Error cleaning up VAPI:', e);
        }
      }
    };
  }, [onCheckoutComplete]);

  const handleCheckout = async () => {
    setMicError(null);
    
    try {
      await fetch('/api/guest-visits/check-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode }),
      });
      
      setShowModal(true);
    } catch (error) {
      console.error('Checkout error:', error);
      setMicError('Failed to check out. Please try again.');
    }
  };

  const startFeedbackCall = async () => {
    if (!vapiRef.current || calling) {
      console.log('VAPI not ready or call already in progress');
      return;
    }
    
    setMicError(null);

    const checkoutId = process.env.NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID;
    if (!checkoutId) {
      console.error('Check-out assistant ID is missing');
      setMicError('Configuration error: Missing assistant ID');
      return;
    }

    try {
      console.log('Starting feedback call...');
      
      await vapiRef.current.start(checkoutId, {
        metadata: { 
          accessCode, 
          guestName, 
          guestPhone,
          timestamp: Date.now()
        },
      });
      
      console.log('Feedback call started successfully');
    } catch (error: any) {
      console.error('Failed to start feedback call:', error);
      
      const errorMessage = error?.message || String(error);
      const errorName = error?.name || '';
      
      if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied')) {
        setMicError('🎤 Microphone access denied. Click the 🔒 icon in your browser address bar to allow microphone access, then try again.');
      } else if (errorName === 'NotFoundError' || errorMessage.includes('device not found')) {
        setMicError('🎤 No microphone detected. Please check your device settings.');
      } else if (errorMessage.includes('unsupported input processor')) {
        console.warn('Audio processor warning (attempting to continue)');
      } else {
        setMicError(`Failed to start call: ${errorMessage}`);
      }
      
      setCalling(false);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
        setCalling(false);
      } catch (error) {
        console.error('Error ending call:', error);
      }
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
          
          {/* Microphone Error Alert */}
          {micError && (
            <Alert variant="destructive" className="text-left">
              <Mic className="h-5 w-5" />
              <AlertDescription className="ml-2">
                <div className="font-semibold mb-1">Microphone Issue</div>
                <div className="text-sm whitespace-pre-line">{micError}</div>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 py-4">
            {!calling ? (
              <Button 
                onClick={startFeedbackCall}
                className="w-full h-20 text-lg bg-gradient-to-r from-emerald-500 to-teal-600"
              >
                🎙️ Start Exit Survey
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="relative flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-green-800 font-semibold">AI is speaking with guest...</span>
                  </div>
                  <p className="text-sm text-gray-600">Please wait for the survey to complete</p>
                </div>
                <Button 
                  onClick={endCall} 
                  variant="destructive" 
                  className="w-full"
                >
                  End Call Early
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}