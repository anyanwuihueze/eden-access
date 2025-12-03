"use client";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { uploadSelfie } from "@/utils/uploadSelfie";

interface Props {
  accessCode: string;
}

export default function SelfieCapture({ accessCode }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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

    const publicUrl = await uploadSelfie(file, accessCode);
    setSubmitting(false);

    if (publicUrl) {
      console.log("✅ Selfie uploaded to Supabase:", publicUrl);

      // Update database with selfie URL
      await fetch('/api/guest-visits/update-selfie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode,
          selfieUrl: publicUrl,
        }),
      });

      // TODO: Trigger Voice Agent Call #2 to resident
      // await fetch('/api/voice-agent/notify-resident-selfie', {
      //   method: 'POST',
      //   body: JSON.stringify({ accessCode }),
      // });

      setDone(true);
    } else {
      alert("❌ Failed to upload selfie. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {!done ? (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-xl shadow-lg max-w-full h-auto"
            videoConstraints={{ facingMode: "user" }}
          />
          <button
            onClick={capture}
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-md disabled:opacity-70"
          >
            {submitting ? "Uploading..." : "Take Selfie"}
          </button>
        </>
      ) : (
        <p className="text-green-700 font-semibold text-center">
          Selfie submitted. Please wait for approval.
        </p>
      )}
    </div>
  );
}
