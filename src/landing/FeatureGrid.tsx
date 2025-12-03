'use client';
export default function FeatureGrid() {
  return (
    <section className="py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-white">
      <div className="p-6 bg-gray-900 rounded-xl shadow">Feature A</div>
      <div className="p-6 bg-gray-900 rounded-xl shadow">Feature B</div>
      <div className="p-6 bg-gray-900 rounded-xl shadow">Feature C</div>
    </section>
  );
}
