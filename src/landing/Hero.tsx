'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const [showContent, setShowContent] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const statsRef = useRef(null);
  const eveRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const eveInView = useInView(eveRef, { once: true });
  
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000, shouldStart: boolean) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!shouldStart) return;
      
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, [end, duration, shouldStart]);
    
    return count;
  };

  const gateTime = useCounter(45, 2000, statsInView);
  const costReduction = useCounter(73, 2000, statsInView);
  const satisfaction = useCounter(98.7, 2000, statsInView);

  // Entrance sequence
  useEffect(() => {
    const timer = setTimeout(() => setScanComplete(true), 800);
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-start overflow-hidden bg-black">
      {/* Golden Scanner Effect on Load */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: scanComplete ? 1 : 0, opacity: scanComplete ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.6), transparent)',
          transformOrigin: 'left'
        }}
      />

      {/* Enhanced Breathing Space with Animated Gradient - Increased for mobile */}
      <div className="h-48 sm:h-24 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'linear-gradient(180deg, rgba(250, 204, 21, 0.1) 0%, transparent 100%)',
              'linear-gradient(180deg, rgba(250, 204, 21, 0.2) 0%, transparent 100%)',
              'linear-gradient(180deg, rgba(250, 204, 21, 0.1) 0%, transparent 100%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Enhanced Background Image with Dramatic Ken Burns */}
      {heroImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          style={{ y: parallaxY }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            data-ai-hint={heroImage.imageHint}
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </motion.div>
      )}

      {/* Parallax Noise Texture */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
      </motion.div>

      {/* Enhanced Animated Grid */}
      <div className="absolute inset-0 opacity-[0.12]">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"
          animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Subtle Floating Particles (Professional) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + i * 8}%`,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.8,
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto flex-grow flex flex-col justify-center pt-8 sm:pt-0">
        {showContent && (
          <>
            {/* Headline with Stagger Effect - NEW WORDING */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6">
                {['Smart', 'Access'].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mr-3 sm:mr-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {['Powered', 'by', 'AI'].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white mr-2 sm:mr-3"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-white"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                >
                  That Learns
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Description with Enhanced Emphasis */}
            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Voice verification, facial recognition, and real-time insights — all in under{' '}
              <motion.span 
                className="text-yellow-400 font-bold inline-flex items-center gap-1"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(250, 204, 21, 0.5)',
                    '0 0 20px rgba(250, 204, 21, 0.8)',
                    '0 0 10px rgba(250, 204, 21, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                45 seconds
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
              . Save ₦120K/month while delivering a 5-star experience.
            </motion.p>

            {/* CTA Buttons with Enhanced Effects */}
            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-2xl hover:shadow-yellow-400/50 transition-all relative overflow-hidden group"
                  asChild
                >
                  <Link href="/demo">
                    <span className="relative z-10">Book 15-Min Demo</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl"
                  asChild
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Floating Stats Card */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 60 }}
          transition={{ delay: 2.2, duration: 1, type: "spring" }}
          whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(250, 204, 21, 0.25)' }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-yellow-400/30 shadow-2xl mx-auto max-w-4xl"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(250, 204, 21, 0.5)',
                    '0 0 30px rgba(250, 204, 21, 0.8)',
                    '0 0 20px rgba(250, 204, 21, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {gateTime}s
              </motion.div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Average Gate Time</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(250, 204, 21, 0.5)',
                    '0 0 30px rgba(250, 204, 21, 0.8)',
                    '0 0 20px rgba(250, 204, 21, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                {costReduction}%
              </motion.div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Cost Reduction</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(250, 204, 21, 0.5)',
                    '0 0 30px rgba(250, 204, 21, 0.8)',
                    '0 0 20px rgba(250, 204, 21, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                {satisfaction > 98 ? satisfaction.toFixed(1) : satisfaction}%
              </motion.div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Guest Satisfaction</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Meet Eve Card */}
      <motion.div
        ref={eveRef}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ 
          opacity: eveInView ? 1 : 0, 
          y: eveInView ? 0 : 40,
          scale: eveInView ? 1 : 0.95
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ delay: 2.6, duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full px-4 sm:px-6 pb-12 sm:pb-16 group"
      >
        <div className="max-w-3xl mx-auto text-center p-6 sm:p-8 bg-black/50 backdrop-blur-2xl rounded-3xl border-2 border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-500 shadow-2xl group-hover:shadow-yellow-400/20">
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4 relative inline-block"
            animate={{
              textShadow: [
                '0 0 20px rgba(250, 204, 21, 0.6)',
                '0 0 30px rgba(250, 204, 21, 0.9)',
                '0 0 20px rgba(250, 204, 21, 0.6)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Meet Eve — Your AI Concierge
            <motion.span 
              className="absolute -inset-2 bg-yellow-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.h3>

          {/* Enhanced Voice Waveform */}
          <div className="flex justify-center gap-1 mb-4 sm:mb-5 opacity-60 group-hover:opacity-100 transition-opacity">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
              <motion.div
                key={i}
                className="w-1 sm:w-1.5 bg-yellow-400 rounded-full"
                animate={{ height: [`${height * 3}px`, `${height * 6}px`, `${height * 3}px`] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.08, ease: "easeInOut" }}
              />
            ))}
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 max-w-2xl mx-auto leading-relaxed px-2">
            A warm, intelligent voice that welcomes every guest, verifies identities, and gathers feedback to keep your estate running smoothly.
          </p>

          <motion.p 
            className="text-xs font-semibold tracking-wider uppercase text-gray-500 group-hover:text-yellow-300/80 transition-colors"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Powered by <span className="text-yellow-300">Eden Intelligence</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}