
'use client';

import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminAuth() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Button
      onClick={handleLoginClick}
      className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-[#E6B800] text-primary-foreground hover:from-primary/90 hover:to-[#E6B800]/90"
      size="sm"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Button>
  );
}
