
'use client';

import { Logo } from '@/components/app/logo';
import LoginButton from '@/components/LoginButton';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LogIn } from 'lucide-react';

export default function Header() {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerPadding = useTransform(scrollY, [0, 100], [16, 8]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all"
      style={{
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-400/20"
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: `rgba(0, 0, 0, ${headerOpacity})`,
        }}
      >
        {/* LEFT ZONE - Logo */}
        <Link href="/">
          <motion.div style={{ scale: logoScale }}>
            <Logo />
          </motion.div>
        </Link>

        {/* CENTER ZONE - Tagline (Desktop only, brighter and more visible) */}
        <motion.div
          className="hidden lg:block absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-base text-yellow-400/70 font-semibold tracking-wide">
            Smart Access Control
          </p>
        </motion.div>
        
        {/* RIGHT ZONE - Login */}
        <div className="flex items-center gap-3">
          {/* Desktop: Full LoginButton component */}
          <div className="hidden sm:block">
            <LoginButton />
          </div>
          
          {/* Mobile: Simple icon only */}
          <motion.div
            className="block sm:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/login" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 hover:bg-yellow-400/20 transition-all"
            >
              <LogIn className="w-5 h-5 text-yellow-400" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
