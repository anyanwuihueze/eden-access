'use client';
export default function FeaturesCarousel() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-semibold text-center mb-12">Luxury Features</h2>
      {/* TODO: Replace with floating card carousel */}
      <div className="flex gap-6 overflow-x-auto px-4">
        <div className="min-w-[250px] bg-gray-800 text-white rounded-xl p-6 shadow-lg">Feature 1</div>
        <div className="min-w-[250px] bg-gray-800 text-white rounded-xl p-6 shadow-lg">Feature 2</div>
        <div className="min-w-[250px] bg-gray-800 text-white rounded-xl p-6 shadow-lg">Feature 3</div>
      </div>
    </section>
  );
}
