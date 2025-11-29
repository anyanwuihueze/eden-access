import { ShieldCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold tracking-tighter text-white">
        Eden Access
      </h1>
    </div>
  );
}
