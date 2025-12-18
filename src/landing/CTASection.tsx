'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-card py-20 sm:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-card"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Modernize Your Estate?
        </h2>
        <p className="mb-10 text-lg text-gray-300 max-w-2xl mx-auto">
          Join the waitlist and be the first to experience the future of AI-powered property management.
          One-click setup, immediate results.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-400/40 transition-all"
        >
          Book a 15-Minute Demo
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </section>
  );
}
