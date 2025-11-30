import SelfieCapture from "./components/selfie-capture";

export default function GuestPage({ params }: { params: { accessCode: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Eden IT Entry</h1>
      <p className="mb-4">Welcome! Please take a quick selfie.</p>
      <SelfieCapture accessCode={params.accessCode} />
    </div>
  );
}
