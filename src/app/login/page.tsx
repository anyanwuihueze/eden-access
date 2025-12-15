
'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/app/logo';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="relative min-h-dvh w-full">
      {/* Background Image */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          data-ai-hint={heroImage.imageHint}
          className="object-cover"
          priority
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-dvh p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-lg rounded-2xl bg-background/80 backdrop-blur-lg p-8 md:p-12 border border-border"
        >
          <div className="text-center mb-8">
            <div className="inline-block">
              <Logo />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Select Your Role
            </h2>
            <p className="mt-2 text-muted-foreground">
              Please choose your sign-in portal to continue.
            </p>
          </div>

          <div className="space-y-4">
            <Button size="lg" className="w-full justify-between h-16 text-lg" asChild>
              <Link href="/login/resident">
                <span>Resident Sign-In</span>
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full justify-between h-16 text-lg" asChild>
              <Link href="/login/guard">
                <span>Guard Sign-In</span>
                 <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full justify-between h-16 text-lg" asChild>
              <Link href="/login/admin">
                <span>Admin Sign-In</span>
                 <ArrowRight />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
