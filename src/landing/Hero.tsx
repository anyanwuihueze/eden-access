'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black pt-20">
      {/* Background Image with Ken Burns effect */}
      {heroImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 15, ease: 'easeOut' }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            data-ai-hint={heroImage.imageHint}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      )}
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              AI-Powered Access
            </span>
            <br />
            <span className="text-white">
              That Learns & Improves
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Voice verification, facial recognition, and real-time insights — all in under <span className="text-yellow-400 font-bold">45 seconds</span>. Save ₦120K/month while delivering a 5-star experience.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-yellow-400/50 transition-all"
            asChild
          >
            <Link href="/demo">Book 15-Min Demo</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold text-lg px-8 py-6 rounded-xl"
            asChild
          >
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </motion.div>
      </div>

      {/* "Meet Eve" Micro-Row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full px-4 pb-16"
      >
        <div className="max-w-3xl mx-auto text-center p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Meet Eve — Your AI Concierge</h3>
            <p className="text-base text-gray-300 mb-3 max-w-2xl mx-auto">
              A warm, intelligent voice that welcomes every guest, verifies identities, and gathers feedback to keep your estate running smoothly.
            </p>
            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">Powered by Eden Intelligence.</p>
        </div>
      </motion.div>
    </section>
  );
}
