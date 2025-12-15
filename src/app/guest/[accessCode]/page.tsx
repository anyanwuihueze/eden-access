'use client';

import { use, useEffect, useRef, useState } from 'react';
import SelfieCapture from './components/selfie-capture';
import Vapi from '@vapi-ai/web';
import { motion } from 'framer-motion';
import { CheckCircle, Loader, ShieldCheck, PhoneCall, LogOut, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuestVisit {
  guest_name: string;
  resident_name: string;
  status: 'pending' | 'pending_approval' | 'approved' | 'checked_in' | 'checked_out';
}

export default function GuestPage({ params }: { params: Promise<{ accessCode: string }> }) {
  const { accessCode } = use(params);
  const vapiRef = useRef<Vapi | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [checkinCallStarted, setCheckinCallStarted] = useState(false);
  const [checkoutCallStarted, setCheckoutCallStarted] = useState(false);
  const [visit, setVisit] = useState<GuestVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [selfieSubmitted, setSelfieSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitDetails = async () => {
      try {
        const res = await fetch(`/api/guest-visits/verify/${accessCode}`);
        if (!res.ok) {
          throw new Error('Verification failed');
        }
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
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVisitDetails();

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('VAPI public key is missing');
      return;
    }

    vapiRef.current = new Vapi(publicKey);
    
    vapiRef.current.on('call-start', () => {
      if (isMounted) setCallActive(true);
    });
    
    vapiRef.current.on('call-end', () => {
      if (isMounted) setCallActive(false);
    });
    
    vapiRef.current.on('error', (e) => {
      console.error('VAPI error:', e);
      if (isMounted) setCallActive(false);
    });

    return () => {
      isMounted = false;
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [accessCode]);
  
  const endCall = () => {
    if (vapiRef.current) {
        vapiRef.current.stop();
    }
  }

  const startCheckinCall = async () => {
    if (!vapiRef.current || checkinCallStarted) return;
    
    const checkinId = process.env.NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID;
    if (!checkinId) {
      console.error('Check-in assistant ID is missing');
      return;
    }

    setCheckinCallStarted(true);
    try {
      await vapiRef.current.start(checkinId);
    } catch (error) {
      console.error('VAPI check-in call failed:', error);
      setCheckinCallStarted(false);
    }
  };

  const startCheckoutCall = async () => {
    if (!vapiRef.current || checkoutCallStarted) return;
    
    const checkoutId = process.env.NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID;
    if (!checkoutId) {
      console.error('Check-out assistant ID is missing');
      return;
    }

    setCheckoutCallStarted(true);
    try {
      await vapiRef.current.start(checkoutId);
    } catch (error) {
      console.error('VAPI check-out call failed:', error);
      setCheckoutCallStarted(false);
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

        {/* Step-by-Step Flow */}
        <div className="mt-12 space-y-8">
            {/* Step 1: Check In with Eve */}
            <StepCard step={1} title="Check In with Eve" status={getStepStatus(1)}>
                <p className="text-muted-foreground mb-6">Press the button below to get important arrival instructions from our AI assistant, Eve.</p>
                {!checkinCallStarted ? (
                    <Button onClick={startCheckinCall} size="lg" className="gap-3 text-lg h-14 px-8">
                        <PhoneCall className="w-5 h-5"/>
                        Check In with Eve
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <div className="bg-card border border-green-500/30 rounded-lg p-4 flex items-center justify-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-green-400 font-semibold">{callActive ? "Eve is speaking..." : "Call Completed"}</span>
                        </div>
                        {callActive && (
                            <Button onClick={endCall} variant="destructive" size="icon" className="h-14 w-14">
                                <PhoneOff className="w-6 h-6"/>
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
                    <Button onClick={startCheckoutCall} size="lg" variant="outline" className="gap-3 text-lg h-14 px-8">
                        <LogOut className="w-5 h-5"/>
                        Check Out with Eve
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <div className="bg-card border border-green-500/30 rounded-lg p-4 flex items-center justify-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-green-400 font-semibold">{callActive ? "Eve is listening..." : "Thank you for your feedback!"}</span>
                        </div>
                         {callActive && (
                            <Button onClick={endCall} variant="destructive" size="icon" className="h-14 w-14">
                                <PhoneOff className="w-6 h-6"/>
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
