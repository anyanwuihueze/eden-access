
'use client';

import { AuthForm } from '@/components/app/auth/auth-form';
import { Logo } from '@/components/app/logo';
import Link from 'next/link';

export default function ResidentLoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="w-full max-w-md">
        <AuthForm role="Resident" />
      </div>
    </div>
  );
}
