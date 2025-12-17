'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import SelfieCapture from './components/selfie-capture';
import Vapi from '@vapi-ai/web';
import { motion } from 'framer-motion';
import { CheckCircle, Loader, ShieldCheck, PhoneCall, LogOut, PhoneOff, AlertCircle, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GuestVisit {
  guest_name: string;
  resident_name: string;
  status: 'pending' | 'pending_approval' | 'approved' | 'checked_in' | 'checked_out';
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

export default function GuestPage() {
  const params = useParams();
  const accessCode = params?.accessCode as string;
  
  const vapiRef = useRef<Vapi | null>(null);
  const isInitializedRef = useRef(false);
  const [callActive, setCallActive] = useState(false);
  const [checkinCallStarted, setCheckinCallStarted] = useState(false);
  const [checkoutCallStarted, setCheckoutCallStarted] = useState(false);
  const [visit, setVisit] = useState<GuestVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [selfieSubmitted, setSelfieSubmitted] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitDetails = async () => {
      if (!accessCode) return;
      try {
        const res = await fetch(`/api/guest-visits/verify/${accessCode}`);
        if (!res.ok) throw new Error('Verification failed');
        
        const data = await res.json();
        if (isMounted) {
          setVisit(data);
          if (data.status === 'pending_approval' || data.status === 'approved' || data.status === 'checked_in') {
            setSelfieSubmitted(true);
          }
        }
      } catch (error) {
        console.error('Error fetching visit details:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVisitDetails();

    const initializeVapi = () => {
      if (isInitializedRef.current || vapiRef.current) {
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
        console.log('Initializing VAPI...');
        vapiRef.current = new Vapi(publicKey);
        isInitializedRef.current = true;
        
        vapiRef.current.on('call-start', () => {
          console.log('✅ Call started successfully');
          if (isMounted) {
            setCallActive(true);
            setMicError(null);
            console.log('State updated: callActive = true');
          }
        });
        
        vapiRef.current.on('call-end', () => {
          console.log('✅ Call ended');
          if (isMounted) {
            setCallActive(false);
            setCheckinCallStarted(false);
            setCheckoutCallStarted(false);
            console.log('State updated: callActive = false');
          }
        });
        
        vapiRef.current.on('speech-start', () => {
          console.log('🎤 User started speaking');
          if (isMounted && !callActive) {
            setCallActive(true);
          }
        });
        
        vapiRef.current.on('error', (error) => {
          console.error('❌ VAPI error details:', error);
          
          if (!isMounted) return;
          
          setCallActive(false);
          setCheckinCallStarted(false);
          setCheckoutCallStarted(false);
          
          const errorMessage = error?.message || error?.error || String(error);
          const errorName = error?.name || '';
          
          if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied')) {
            setMicError('🎤 Microphone permission denied. Click the 🔒 icon in your browser address bar, allow microphone access, then refresh the page.');
          } else if (errorName === 'NotFoundError' || errorMessage.includes('device not found') || errorMessage.includes('Requested device not found')) {
            setMicError('🎤 No microphone detected. Please check:\n• A microphone is connected\n• No other apps are using it\n• Browser has microphone permission');
          } else if (errorName === 'NotReadableError' || errorMessage.includes('not readable')) {
            setMicError('🎤 Microphone is being used by another application. Close other apps and try again.');
          } else if (errorMessage.includes('unsupported input processor')) {
            console.warn('⚠️ Audio processor warning (non-critical):', errorMessage);
            return;
          } else {
            setMicError(`Call failed: ${errorMessage}. Please refresh and try again.`);
          }
        });

        console.log('✅ VAPI initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize VAPI:', error);
        setMicError('Failed to initialize voice system. Please refresh the page.');
      }
    };

    initializeVapi();

    return () => {
      isMounted = false;
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
          console.log('🧹 VAPI cleaned up');
        } catch (e) {
          console.error('Error cleaning up VAPI:', e);
        }
      }
    };
  }, [accessCode]);
  
  const endCall = () => {
    console.log('🛑 Ending call manually...');
    if (!vapiRef.current) {
      console.warn('No VAPI instance to stop');
      return;
    }
    
    try {
      vapiRef.current.stop();
      setCallActive(false);
      setCheckinCallStarted(false);
      setCheckoutCallStarted(false);
      console.log('✅ Call ended manually');
    } catch (error) {
      console.error('❌ Error ending call:', error);
    }
  };

  const startCheckinCall = async () => {
    console.log('🚀 Starting check-in call...');
    if (!vapiRef.current || checkinCallStarted || callActive) {
      console.log('⚠️ Call already in progress or VAPI not ready');
      return;
    }
    
    setMicError(null);
    
    const checkinId = process.env.NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID;
    if (!checkinId) {
      console.error('❌ Check-in assistant ID is missing');
      setMicError('Configuration error: Missing assistant ID');
      return;
    }

    setCheckinCallStarted(true);
    console.log('State set: checkinCallStarted = true');
    
    try {
      console.log('📞 Calling VAPI start()...');
      
      await vapiRef.current.start(checkinId, {
        metadata: {
          accessCode: accessCode,
          timestamp: Date.now(),
          type: 'checkin'
        }
      });
      
      console.log('✅ Check-in call request sent');
    } catch (error: any) {
      console.error('❌ Failed to start check-in call:', error);
      
      const errorMessage = error?.message || String(error);
      const errorName = error?.name || '';
      
      if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied')) {
        setMicError('🎤 Microphone access denied. Click the 🔒 icon in your browser address bar to allow microphone, then try again.');
      } else if (errorName === 'NotFoundError' || errorMessage.includes('device not found')) {
        setMicError('🎤 No microphone detected. Please check your device has a working microphone connected.');
      } else if (errorMessage.includes('unsupported input processor')) {
        console.warn('⚠️ Audio processor warning (attempting to continue)');
        return;
      } else {
        setMicError(`Failed to start call: ${errorMessage}. Please refresh and try again.`);
      }
      
      setCheckinCallStarted(false);
      setCallActive(false);
    }
  };

  const startCheckoutCall = async () => {
    console.log('🚀 Starting check-out call...');
    if (!vapiRef.current || checkoutCallStarted || callActive) {
      console.log('⚠️ Call already in progress or VAPI not ready');
      return;
    }
    
    setMicError(null);
    
    const checkoutId = process.env.NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID;
    if (!checkoutId) {
      console.error('❌ Check-out assistant ID is missing');
      setMicError('Configuration error: Missing assistant ID');
      return;
    }

    setCheckoutCallStarted(true);
    console.log('State set: checkoutCallStarted = true');
    
    try {
      console.log('📞 Calling VAPI start()...');
      
      await vapiRef.current.start(checkoutId, {
        metadata: {
          accessCode: accessCode,
          timestamp: Date.now(),
          type: 'checkout'
        }
      });
      
      console.log('✅ Check-out call request sent');
    } catch (error: any) {
      console.error('❌ Failed to start check-out call:', error);
      
      const errorMessage = error?.message || String(error);
      const errorName = error?.name || '';
      
      if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied')) {
        setMicError('🎤 Microphone access denied. Click the 🔒 icon in your browser address bar to allow microphone, then try again.');
      } else if (errorName === 'NotFoundError' || errorMessage.includes('device not found')) {
        setMicError('🎤 No microphone detected. Please check your device has a working microphone connected.');
      } else if (errorMessage.includes('unsupported input processor')) {
        console.warn('⚠️ Audio processor warning (attempting to continue)');
        return;
      } else {
        setMicError(`Failed to start call: ${errorMessage}. Please refresh and try again.`);
      }
      
      setCheckoutCallStarted(false);
      setCallActive(false);
    }
  };

  const handleSelfieSubmitted = () => {
    setSelfieSubmitted(true);
  };

  const getStepStatus = (step: number) => {
    if (step === 1) return checkinCallStarted ? 'completed' : 'current';
    if (step === 2) {
      if (selfieSubmitted) return 'completed';
      return checkinCallStarted ? 'current' : 'pending';
    }
    if (step === 3) {
        return selfieSubmitted ? 'current' : 'pending';
    }
    return 'pending';
  };

  if (!accessCode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white font-body">
      <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      
      <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-3 mb-4">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Eden Access</h1>
          </div>
          {visit ? (
            <>
              <p className="text-xl text-foreground">Welcome, <span className="font-bold text-primary">{visit.guest_name}</span></p>
              <p className="text-md text-muted-foreground">You are visiting <span className="font-semibold">{visit.resident_name}</span></p>
            </>
          ) : (
             <p className="text-lg text-muted-foreground">Guest Verification Portal</p>
          )}
           <div className="mt-3 inline-block bg-card px-4 py-1.5 rounded-full border border-border">
            <span className="text-xs text-muted-foreground">Access Code: </span>
            <span className="font-mono font-bold text-primary text-md">{accessCode}</span>
          </div>
        </motion.div>

        {/* Microphone Error Alert */}
        {micError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Alert variant="destructive" className="text-left">
              <Mic className="h-5 w-5" />
              <AlertDescription className="ml-2">
                <div className="font-semibold mb-1">Microphone Issue</div>
                <div className="text-sm whitespace-pre-line">{micError}</div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Step-by-Step Flow */}
        <div className="mt-12 space-y-8">
            {/* Step 1: Check In with Eve */}
            <StepCard step={1} title="Check In with Eve" status={getStepStatus(1)}>
                <p className="text-muted-foreground mb-6">Press the button below to get important arrival instructions from our AI assistant, Eve.</p>
                {!checkinCallStarted ? (
                    <Button 
                      onClick={startCheckinCall} 
                      size="lg" 
                      className="gap-3 text-lg h-14 px-8"
                      disabled={callActive}
                    >
                        <PhoneCall className="w-5 h-5"/>
                        Check In with Eve
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="bg-card border border-green-500/30 rounded-lg p-4 flex items-center justify-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-green-400 font-semibold">{callActive ? "Eve is speaking..." : "Call Completed"}</span>
                        </div>
                        {callActive && (
                            <Button 
                              onClick={endCall} 
                              variant="destructive" 
                              size="lg"
                              className="h-14 px-6 gap-2"
                            >
                                <PhoneOff className="w-5 h-5"/>
                                End Call
                            </Button>
                        )}
                    </div>
                )}
            </StepCard>

            {/* Step 2: Security Selfie */}
            <StepCard step={2} title="Security Verification" status={getStepStatus(2)}>
                 <p className="text-muted-foreground mb-6">Please provide a quick selfie. This photo will be used by our security team to verify your identity at the gate.</p>
                 <SelfieCapture 
                    accessCode={accessCode} 
                    onSelfieSubmitted={handleSelfieSubmitted} 
                    disabled={getStepStatus(2) === 'pending'}
                />
            </StepCard>

            {/* Step 3: Awaiting Approval */}
            <StepCard step={3} title="Await Gate Clearance" status={getStepStatus(3)}>
                <p className="text-muted-foreground">Thank you. Your host has been notified. Please proceed to the gate where our security team will grant you access momentarily.</p>
            </StepCard>

            {/* Step 4: Check Out with Eve */}
            <StepCard step={4} title="Check Out with Eve" status="current">
                <p className="text-muted-foreground mb-6">Leaving soon? Share your experience with Eve before you go.</p>
                {!checkoutCallStarted ? (
                    <Button 
                      onClick={startCheckoutCall} 
                      size="lg" 
                      variant="outline" 
                      className="gap-3 text-lg h-14 px-8"
                      disabled={callActive}
                    >
                        <LogOut className="w-5 h-5"/>
                        Check Out with Eve
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="bg-card border border-green-500/30 rounded-lg p-4 flex items-center justify-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-green-400 font-semibold">{callActive ? "Eve is listening..." : "Thank you for your feedback!"}</span>
                        </div>
                         {callActive && (
                            <Button 
                              onClick={endCall} 
                              variant="destructive" 
                              size="lg"
                              className="h-14 px-6 gap-2"
                            >
                                <PhoneOff className="w-5 h-5"/>
                                End Call
                            </Button>
                        )}
                    </div>
                )}
            </StepCard>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Your photo is encrypted and used for verification purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, title, status, children }: { step: number, title: string, status: 'completed' | 'current' | 'pending', children: React.ReactNode}) {
    const isPending = status === 'pending';

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: step * 0.2 }}
            className={`bg-card border-l-4 p-8 rounded-lg shadow-lg text-left transition-all duration-300 ${
                status === 'completed' ? 'border-green-500' :
                status === 'current' ? 'border-primary' : 'border-border'
            } ${isPending ? 'opacity-50' : 'opacity-100'}`}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                     status === 'completed' ? 'bg-green-500/20 text-green-400' :
                     status === 'current' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                }`}>
                    {status === 'completed' ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            </div>
            <div className={`pl-14 ${isPending ? 'pointer-events-none' : ''}`}>
                {children}
            </div>
        </motion.div>
    )
}

    
