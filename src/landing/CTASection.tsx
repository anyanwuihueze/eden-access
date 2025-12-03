'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24 text-center bg-gradient-to-t from-background to-card text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.1),rgba(255,255,255,0))]"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Modernize Your Estate?</h2>
        <p className="mb-10 text-lg text-gray-300">
          Join the waitlist and be the first to experience the future of estate management.
        </p>
        <Button 
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-yellow-400/50 transition-all transform hover:scale-105"
        >
          Book a 15-Minute Demo
        </Button>
      </motion.div>
    </section>
  );
}
