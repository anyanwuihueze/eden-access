
'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Image with Ken Burns effect */}
      {heroImage && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25, transition: { duration: 2, ease: 'easeOut' } }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            data-ai-hint={heroImage.imageHint}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </motion.div>
      )}
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-5 z-20"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 z-20"
      ></motion.div>

      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
              AI-Powered Access
            </span>
            <br />
            <span className="text-white">
              That Learns & Improves
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Voice verification, facial recognition, and real-time insights — all in under <span className="text-yellow-400 font-bold">45 seconds</span>. Save ₦120K/month while delivering a 5-star experience.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all transform hover:scale-105"
            asChild
          >
            <Link href="/demo">Book 15-Min Demo</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-300 font-bold text-lg px-8 py-6 rounded-xl transition-all"
            asChild
          >
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
