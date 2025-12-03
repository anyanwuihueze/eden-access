'use client';
import { motion } from "framer-motion";
import { Smartphone, Camera, DoorOpen } from "lucide-react";

const steps = [
  {
    icon: <Smartphone className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "1. Generate Pass",
    description: "Resident sends an AI-generated access code and link to their guest from the app."
  },
  {
    icon: <Camera className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "2. Selfie Verification",
    description: "Guest clicks the link, confirms their identity, and takes a quick selfie for verification."
  },
  {
    icon: <DoorOpen className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "3. Seamless Entry",
    description: "Guard verifies the code and matches the selfie. The gate opens. Total time: under 45 seconds."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-card text-white text-center">
      <motion.h2 
        className="text-4xl font-extrabold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Three Simple Steps to Seamless Access
      </motion.h2>
      <motion.p 
        className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our process is designed for maximum security and ultimate convenience.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4 relative">
        {/* Dashed lines for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -mt-5">
            <svg width="100%" height="100%" className="overflow-visible">
                <line x1="20%" y1="0" x2="80%" y2="0" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="8 8" />
            </svg>
        </div>

        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="bg-background p-6 rounded-full border border-border mb-4">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground max-w-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
