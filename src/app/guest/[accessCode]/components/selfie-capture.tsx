'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, CheckCircle, Loader2, Upload, User, Zap } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

export function SelfieCapture({ accessCode }: { accessCode: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions and try again."
      });
    }
  }, [stream, toast]);
  
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const reset = () => {
    setImage(null);
    startCamera();
  };

  const uploadSelfie = async () => {
    if (!image) return;
    setIsUploading(true);
    // Placeholder for upload logic (e.g., to Firebase Storage)
    console.log(`Uploading selfie for access code: ${accessCode}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setIsSuccess(true);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  
  if (isSuccess) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-primary" />
            <h2 className="text-2xl font-semibold">Verification Sent!</h2>
            <p className="text-muted-foreground">Your selfie has been sent to the resident for approval. You will be notified once approved.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square bg-secondary flex items-center justify-center">
          {image ? (
            <Image src={image} alt="Guest selfie" width={400} height={400} className="object-cover w-full h-full" />
          ) : stream ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <User className="w-24 h-24" />
              <p>Camera preview will appear here</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="p-4 space-y-4">
          {!stream && !image && (
            <Button onClick={startCamera} className="w-full">
              <Camera className="mr-2 h-4 w-4" /> Start Camera
            </Button>
          )}

          {stream && !image && (
            <Button onClick={takePicture} className="w-full">
              <Zap className="mr-2 h-4 w-4" /> Take Selfie
            </Button>
          )}

          {image && (
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={reset} disabled={isUploading}>
                Retake
              </Button>
              <Button onClick={uploadSelfie} disabled={isUploading}>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Submit
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
