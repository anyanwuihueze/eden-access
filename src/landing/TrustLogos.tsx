
'use client';
import { motion } from 'framer-motion';

const logos = [
  "The Azure Enclave",
  "Orchid Bay Residences",
  "Serenity Point",
  "Crimson Crest Manor",
  "Opal Gardens",
];

export default function TrustLogos() {
  return (
    <section className="py-16 bg-background text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-sm text-gray-400/80 mb-8 tracking-widest uppercase">
          Trusted by the Nation's Premier Estates
        </h3>
        <div className="max-w-5xl mx-auto flex justify-center items-center gap-x-8 md:gap-x-12 flex-wrap px-4">
          {logos.map((logo, index) => (
            <div key={logo} className="flex items-center gap-x-8 md:gap-x-12">
              <span className="text-gray-400 font-medium whitespace-nowrap text-lg">
                {logo}
              </span>
              {index < logos.length - 1 && (
                <span className="text-yellow-400/50 font-bold text-2xl hidden sm:inline-block">•</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
