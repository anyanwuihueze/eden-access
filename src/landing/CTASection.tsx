'use client';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 text-center bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
      <h2 className="text-3xl font-semibold mb-6">Ready to Access Eden?</h2>
      <p className="mb-8 text-gray-300">Sign up now and experience premium estate access like never before.</p>
      <Button size="lg">Login / Sign Up</Button>
    </section>
  );
}
