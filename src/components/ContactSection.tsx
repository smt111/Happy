import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-rose-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal-900 font-semibold mb-4">
            Visit or Call Us
          </h2>
          <p className="text-charcoal-500 max-w-xl mx-auto">
            We would love to hear from you. Drop by our shop or give us a call.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href="https://maps.google.com/?q=Happy+Gift+and+Flowers+Addis+Ababa"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-2xl border border-cream-200 hover:border-rose-200 hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-100 transition-colors">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-medium text-charcoal-900 mb-1">Location</h3>
            <p className="text-charcoal-500 text-sm">
              Around Eritrea Embassy, 24
              <br />
              Addis Ababa
            </p>
          </a>

          <a
            href="tel:0923767972"
            className="group bg-white p-6 rounded-2xl border border-cream-200 hover:border-rose-200 hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-100 transition-colors">
              <Phone className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-medium text-charcoal-900 mb-1">Phone</h3>
            <p className="text-charcoal-500 text-sm">092 376 7972</p>
          </a>

          <div className="group bg-white p-6 rounded-2xl border border-cream-200 hover:border-rose-200 hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-100 transition-colors">
              <Clock className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-medium text-charcoal-900 mb-1">Hours</h3>
            <p className="text-charcoal-500 text-sm">
              Open daily
              <br />
              Closes 7 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
