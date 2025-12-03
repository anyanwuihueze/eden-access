'use client';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Chevy View Estate', path: '/logo-placeholder.svg' },
  { name: 'Banana Island', path: '/logo-placeholder.svg' },
  { name: 'Eko Atlantic', path: '/logo-placeholder.svg' },
  { name: 'Pinnock Beach Estate', path: '/logo-placeholder.svg' },
  { name: 'Amen Estate', path: '/logo-placeholder.svg' },
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
        <h3 className="text-lg text-gray-400 mb-8 tracking-widest">
          TRUSTED BY THE NATION'S PREMIER ESTATES
        </h3>
        <div className="flex justify-center items-center gap-12 md:gap-16 flex-wrap px-4">
          {logos.map((logo) => (
            <div key={logo.name} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-gray-400 font-semibold">{logo.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
