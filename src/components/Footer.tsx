import { Flower2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="w-6 h-6 text-rose-400" />
            <span className="font-display text-xl font-semibold">Happy Gift & Flowers</span>
          </div>
          <p className="text-charcoal-400 text-sm max-w-md mb-6">
            Fresh flowers and thoughtful gifts delivered with love in Addis Ababa.
            Around Eritrea Embassy, 24.
          </p>
          <div className="flex items-center gap-1 text-charcoal-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>in Addis Ababa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
