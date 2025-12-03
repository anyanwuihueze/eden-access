
'use client';
import { motion } from "framer-motion";
import { Smartphone, Camera, DoorOpen } from "lucide-react";

const steps = [
  {
    icon: <Smartphone className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "1. AI-Powered Invitation",
    description: "Resident generates a pass. Eve, our AI Concierge, personally calls the guest with a warm welcome and their unique access code."
  },
  {
    icon: <Camera className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "2. Biometric Verification",
    description: "Guest uses the secure link to take a quick selfie. Eve instantly notifies the resident that their guest is awaiting entry at the gate."
  },
  {
    icon: <DoorOpen className="w-10 h-10 mb-4 text-yellow-400" />,
    title: "3. Seamless Entry & Feedback",
    description: "The guard verifies the guest in seconds. Upon departure, Eve places a follow-up call, providing you with actionable insights to continuously improve your guest experience."
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
        Our process is designed for maximum security and ultimate convenience, powered by our AI Concierge, Eve.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4 relative">
        {/* Dashed lines for desktop */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px">
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
            <div className="bg-background p-6 rounded-full border-2 border-border mb-6 shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground max-w-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
