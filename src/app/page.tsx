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
    <div className="flex items-center justify-center min-h-dvh p-4">
      <main className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-block">
            <Logo />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Seamless Access for Modern Estates
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
            AI-powered verification for residents and guests, ensuring top-tier security and a five-star experience. Welcome to the future of estate management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/login?role=resident">Resident Sign-In</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login?role=guard">Guard Sign-In</Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={600}
              height={600}
              data-ai-hint={heroImage.imageHint}
              className="rounded-xl shadow-2xl shadow-primary/10 aspect-square object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent rounded-xl" />
        </motion.div>
      </main>
    </div>
  );
}
