
'use client';
import { motion } from "framer-motion";
import { ShieldCheck, User, Video } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
    title: "Admin Command Center",
    description: "Get a real-time, bird's-eye view of your entire estate. Monitor guest flow, track security performance, and gain actionable insights."
  },
  {
    icon: <User className="w-8 h-8 text-yellow-400" />,
    title: "Resident Dashboard",
    description: "Empower your residents with a simple, elegant interface to generate guest passes and manage visitor history from anywhere."
  },
  {
    icon: <Video className="w-8 h-8 text-yellow-400" />,
    title: "AI Voice Concierge",
    description: "Elevate the guest experience from the first point of contact with an AI-powered voice agent that provides a premium, welcoming touch."
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-white">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="p-8 bg-card rounded-2xl shadow-lg border border-border transition-all duration-300 hover:shadow-yellow-400/20 hover:border-yellow-400/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
