
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, User, Video, TrendingUp } from "lucide-react";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Admin Command Center",
    description: "Real-time, bird's-eye view of your estate. Monitor guest flow and gain actionable insights.",
    imageId: 'dashboard-admin'
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "Resident Dashboard",
    description: "Empower residents with a simple, elegant interface to generate guest passes and manage visitors.",
    imageId: 'dashboard-resident'
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "AI Voice Concierge",
    description: "Elevate the guest experience with an AI that provides a premium, welcoming touch.",
    imageId: 'dashboard-guest'
  },
];

export default function FeatureGrid() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const activeImage = PlaceHolderImages.find(p => p.id === activeFeature.imageId);

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Tools for Every Role
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          From high-level oversight to daily operations, Eden Access provides a tailored experience that enhances security and convenience for everyone.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              onMouseEnter={() => setActiveFeature(feature)}
              className={cn(
                "p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                activeFeature.title === feature.title
                  ? "bg-card border-primary/50 shadow-2xl shadow-primary/10"
                  : "bg-card/50 border-border hover:bg-card hover:border-border-hover"
              )}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  activeFeature.title === feature.title ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground ml-14">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="relative w-full aspect-[4/3] bg-card rounded-2xl border border-border shadow-2xl shadow-black/30 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.imageId}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {activeImage && (
                <Image 
                  src={activeImage.imageUrl} 
                  alt={activeFeature.title}
                  fill
                  className="object-cover"
                  data-ai-hint={activeImage.imageHint}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
