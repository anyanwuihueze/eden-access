
'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Luxury Estates",
    description: "Elevate security and guest experience across gated communities.",
    imageId: "card-luxury-estate"
  },
  {
    title: "Premium Hotels",
    description: "Eve welcomes guests with warm AI voice calls and seamless check-in.",
    imageId: "card-premium-hotel"
  },
  {
    title: "Corporate Offices",
    description: "Professional visitor management powered by AI voice and biometrics.",
    imageId: "card-corporate-office"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function FeaturesCarousel() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-white">
            A Five-Star Experience for Every Visitor
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const featureImage = PlaceHolderImages.find(p => p.id === feature.imageId);
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border-border bg-card shadow-lg transition-all duration-300 flex flex-col hover:shadow-primary/20">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    {featureImage && (
                       <Image 
                        src={featureImage.imageUrl}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={featureImage.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-6 bg-card/50">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                  </CardContent>

                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
