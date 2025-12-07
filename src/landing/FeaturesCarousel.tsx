'use client';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

export default function FeaturesCarousel() {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            A Five-Star Experience for Every Visitor
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Tailored solutions that transform how you welcome and manage guests
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const featureImage = PlaceHolderImages.find(p => p.id === feature.imageId);
            
            return (
              <motion.div
                key={feature.imageId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="overflow-hidden border-neutral-200 hover:border-neutral-300 hover:shadow-2xl transition-all duration-500 h-full bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative h-64 w-full overflow-hidden">
                      {featureImage ? (
                        <>
                          <Image
                            src={featureImage.imageUrl}
                            alt={featureImage.description}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-red-500 flex items-center justify-center text-white font-bold">
                          MISSING: {feature.imageId}
                        </div>
                      )}
                    </div>
                    <div className="p-6 relative">
                      {/* Decorative line */}
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 mb-4 group-hover:w-full transition-all duration-500" />
                      
                      <h3 className="text-2xl font-bold mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
