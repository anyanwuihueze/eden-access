
"use client";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { uploadSelfie } from "@/utils/uploadSelfie";
import { Button } from "@/components/ui/button";
import { Camera, Loader, AlertTriangle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  accessCode: string;
  onSelfieSubmitted: () => void;
  disabled?: boolean;
}

export default function SelfieCapture({ accessCode, onSelfieSubmitted, disabled = false }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    if (disabled) return;

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (webcamRef.current?.video) {
            webcamRef.current.video.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, [disabled]);

  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const byteString = atob(imageSrc.split(",")[1]);
    const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: mimeString });
    const file = new File([blob], `${accessCode}.jpg`, { type: "image/jpeg" });

    setSubmitting(true);

    try {
      const publicUrl = await uploadSelfie(file, accessCode);
      if (publicUrl) {
        await fetch('/api/guest-visits/update-selfie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessCode, selfieUrl: publicUrl }),
        });
        setDone(true);
        onSelfieSubmitted();
      } else {
        throw new Error("Upload failed to return a URL.");
      }
    } catch (error) {
        console.error("Selfie submission failed:", error);
    } finally {
        setSubmitting(false);
    }
  };

  if (disabled) {
    return (
        <div className="h-48 bg-secondary/50 flex items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-muted-foreground">Complete previous steps to enable camera.</p>
        </div>
    );
  }

  if (hasCameraPermission === false) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Camera Access Denied</AlertTitle>
            <AlertDescription>
                Please enable camera permissions in your browser settings to continue.
            </AlertDescription>
        </Alert>
    );
  }
  
  if (done) {
    return (
        <Alert variant="default" className="border-green-500/50 bg-green-500/10 text-green-300">
            <AlertCircle className="h-4 w-4 text-green-400" />
            <AlertTitle>Selfie Submitted Successfully</AlertTitle>
            <AlertDescription>
                You may now proceed to the next step.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
        <div className="w-full aspect-square max-w-sm bg-black rounded-lg overflow-hidden border-2 border-border relative">
            {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="w-8 h-8 animate-spin" />
                 </div>
            )}
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={`w-full h-full object-cover transition-opacity duration-300 ${hasCameraPermission ? 'opacity-100' : 'opacity-0'}`}
                videoConstraints={{ facingMode: "user", width: 400, height: 400 }}
                audio={false}
            />
        </div>
        
        <Button
            onClick={capture}
            disabled={submitting || hasCameraPermission !== true}
            size="lg"
            className="w-full max-w-sm h-14 text-lg gap-3"
        >
            {submitting ? <Loader className="animate-spin" /> : <Camera />}
            {submitting ? "Submitting..." : "Take Selfie"}
        </Button>
    </div>
  );
}
