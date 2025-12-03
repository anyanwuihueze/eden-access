'use client';
export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#0f0f0f] text-white text-center">
      <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-gray-900 rounded-xl shadow">Step 1</div>
        <div className="p-6 bg-gray-900 rounded-xl shadow">Step 2</div>
        <div className="p-6 bg-gray-900 rounded-xl shadow">Step 3</div>
      </div>
    </section>
  );
}
