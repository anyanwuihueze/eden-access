
"use client";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { uploadSelfie } from "@/utils/uploadSelfie";
import { Button } from "@/components/ui/button";
import { Camera, Loader, AlertCircle } from "lucide-react";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (disabled) return;

    const getCameraPermission = async () => {
      try {
        // First, query for permission without prompting
        const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
        if (permissions.state === 'granted') {
          setHasCameraPermission(true);
          return;
        }
        if (permissions.state === 'denied') {
          setHasCameraPermission(false);
          setError("Camera access was denied. Please enable it in your browser settings and refresh the page.");
          return;
        }
        
        // If permission is 'prompt', then try to get it
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (webcamRef.current?.video) {
            webcamRef.current.video.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setHasCameraPermission(false);
        setError("Camera permission denied. Please allow camera access to continue.");
      }
    };

    getCameraPermission();
  }, [disabled]);

  const capture = async () => {
    if (!webcamRef.current) {
        setError("Webcam is not available.");
        return;
    }
    
    setError(null);
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (!imageSrc) {
        setError("Could not capture image from webcam.");
        return;
    }

    setSubmitting(true);

    try {
        // Convert base64 data URI to a Blob, then to a File
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], `${accessCode}.jpg`, { type: "image/jpeg" });
        
        // Upload the file
        const publicUrl = await uploadSelfie(file, accessCode);
        
        if (!publicUrl) {
            throw new Error("Upload failed. The server did not return a URL.");
        }

        // Update the database with the new selfie URL
        const updateRes = await fetch('/api/guest-visits/update-selfie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessCode, selfieUrl: publicUrl }),
        });

        if (!updateRes.ok) {
            const errorData = await updateRes.json();
            throw new Error(errorData.error || "Failed to save selfie information.");
        }

        setDone(true);
        onSelfieSubmitted();

    } catch (err: any) {
        console.error("Selfie submission process failed:", err);
        setError(err.message || "An unexpected error occurred during selfie submission.");
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
                Please enable camera permissions in your browser settings to continue. You may need to refresh the page after granting permission.
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
                Your verification photo has been sent. You may now proceed to the next step.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
        <div className="w-full aspect-square max-w-sm bg-black rounded-lg overflow-hidden border-2 border-border relative">
            {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <Loader className="w-8 h-8 animate-spin mb-4" />
                    <p className="text-muted-foreground">Waiting for camera permission...</p>
                 </div>
            )}
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={`w-full h-full object-cover transition-opacity duration-300 ${hasCameraPermission ? 'opacity-100' : 'opacity-0'}`}
                videoConstraints={{ facingMode: "user", width: 400, height: 400 }}
                audio={false}
                onUserMediaError={(err) => {
                    console.error('onUserMediaError:', err);
                    setError("Could not access the camera. Is it being used by another app?");
                    setHasCameraPermission(false);
                }}
            />
        </div>
        
        {error && (
            <Alert variant="destructive" className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Capture Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

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
