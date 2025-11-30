"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { db, storage } from "@/lib/firebase";
import { ref, uploadString } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

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

    setSubmitting(true);

    // Upload to Firebase Storage
    const storageRef = ref(storage, `guests/${accessCode}/selfie.jpg`);
    await uploadString(storageRef, imageSrc, "data_url");

    // Save reference for resident
    await addDoc(collection(db, "guestEntries"), {
      accessCode,
      selfieUrl: `guests/${accessCode}/selfie.jpg`,
      createdAt: new Date(),
      status: "pending",
    });

    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {!done ? (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-xl shadow-lg"
            videoConstraints={{ facingMode: "user" }}
          />

          <button
            onClick={capture}
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-md"
          >
            {submitting ? "Uploading..." : "Take Selfie"}
          </button>
        </>
      ) : (
        <p className="text-green-700 font-semibold">
          Selfie submitted. Please wait for approval.
        </p>
      )}
    </div>
  );
}
