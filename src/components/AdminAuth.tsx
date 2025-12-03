'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email || '');
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);
  
  const handleLoginClick = () => {
    if (isAuthenticated) {
      // If user is already logged in, maybe take them to a default dashboard
      // For now, let's assume they might be an admin.
      // A better approach would be to check their role here.
      router.push('/admin');
    } else {
      // If not logged in, go to the universal login page
      router.push('/login');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleLoginClick}
        className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-[#E6B800] text-primary-foreground hover:from-primary/90 hover:to-[#E6B800]/90"
        size="sm"
      >
        <LogIn className="w-4 h-4" />
        {isAuthenticated ? (
          <>
            <span className="hidden sm:inline">Command Center</span>
            <span className="sm:hidden">Admin</span>
          </>
        ) : (
          <span className="hidden sm:inline">Login</span>
        )}
      </Button>
    </div>
  );
}
