import { notFound } from 'next/navigation';

interface Props {
  params: { code: string };
}

async function validateAccessCode(code: string) {
  // TODO: replace with real DB / Upstash lookup
  return code.length === 6; // dummy check
}

export default async function GuestCheckInPage({ params }: Props) {
  const ok = await validateAccessCode(params.code);
  if (!ok) notFound();

  // your camera component (swap with your real one)
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
      📸 Selfie check-in for code: <strong>{params.code}</strong>
    </div>
  );
}
