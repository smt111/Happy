import { ArrowDown, Phone } from 'lucide-react';

export default function Hero() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Beautiful flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <p className="text-gold-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Addis Ababa&apos;s Finest
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight mb-6">
            Happy Gift
            <br />
            <span className="text-rose-300">& Flowers</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Fresh, handcrafted bouquets and thoughtful gifts delivered with love.
            Around Eritrea Embassy, 24 &mdash; your local florist since day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToShop}
              className="px-8 py-4 bg-rose-600 text-white font-medium rounded-full hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Shop Now
            </button>
            <a
              href="tel:0923767972"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Phone className="w-4 h-4" />
              092 376 7972
            </a>
          </div>
        </div>

        <button
          onClick={scrollToShop}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
