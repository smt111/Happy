import { Star, Award, Truck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Flower arrangement"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-rose-600 text-white p-6 rounded-2xl shadow-xl hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                <span className="font-bold text-2xl">5.0</span>
              </div>
              <p className="text-rose-100 text-sm">102 Reviews</p>
            </div>
          </div>

          <div>
            <p className="text-rose-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              About Us
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-charcoal-900 font-semibold mb-6">
              Crafting Joy with Every Bloom
            </h2>
            <p className="text-charcoal-500 leading-relaxed mb-6">
              Located around Eritrea Embassy, 24, Happy Gift and Flowers has been Addis Ababa&apos;s
              trusted florist for fresh, beautifully crafted bouquets and thoughtful gifts. Every
              arrangement is hand-made with care, using only the freshest seasonal flowers.
            </p>
            <p className="text-charcoal-500 leading-relaxed mb-8">
              Whether it is a birthday, anniversary, or just because &mdash; we help you say it with
              flowers. Our dedicated team ensures every delivery arrives on time and in perfect
              condition.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Fast Delivery', desc: 'Same-day in Addis' },
                { icon: Award, label: 'Premium Quality', desc: 'Fresh guaranteed' },
                { icon: Star, label: '5-Star Rated', desc: '102+ happy customers' },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="p-4 bg-cream-50 rounded-xl border border-cream-200"
                >
                  <feature.icon className="w-6 h-6 text-rose-600 mb-2" />
                  <p className="font-medium text-charcoal-900 text-sm">{feature.label}</p>
                  <p className="text-charcoal-400 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
