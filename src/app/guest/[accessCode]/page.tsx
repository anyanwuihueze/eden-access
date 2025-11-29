import { SelfieCapture } from "./components/selfie-capture";
import { Logo } from "@/components/app/logo";

export default function GuestSelfiePage({ params }: { params: { accessCode: string } }) {
  // We can fetch guest data using the access code here
  const guestName = "Alice Johnson"; // Placeholder

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4 text-center space-y-8 bg-background">
      <Logo />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome, {guestName}</h1>
        <p className="text-muted-foreground">Please take a quick selfie for verification.</p>
      </div>
      <SelfieCapture accessCode={params.accessCode} />
    </div>
  );
}
