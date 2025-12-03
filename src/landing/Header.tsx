
'use client';

import { Logo } from '@/components/app/logo';
import AdminAuth from '@/components/AdminAuth';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <AdminAuth />
      </div>
    </header>
  );
}
