'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              AI-Powered Security
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

        {/* Stats Bar */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">45s</div>
            <div className="text-sm text-gray-400 mt-1">Average Gate Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">73%</div>
            <div className="text-sm text-gray-400 mt-1">Cost Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">98.7%</div>
            <div className="text-sm text-gray-400 mt-1">Guest Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
