'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/app/logo';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function HomePage() {
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
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 grid lg:grid-cols-2 h-dvh">
        <div className="flex flex-col justify-center bg-background/80 backdrop-blur-sm p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-md mx-auto lg:mx-0"
          >
            <div className="mb-8">
              <Logo />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Seamless Access for Modern Estates
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              AI-powered verification for residents and guests, ensuring top-tier security and a five-star experience. Welcome to the future of estate management.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/login?role=resident">Resident Sign-In</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login?role=guard">Guard Sign-In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Empty column for spacing, allows background image to be visible on desktop */}
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
}
