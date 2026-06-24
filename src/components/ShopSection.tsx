import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ShopSectionProps {
  onAddToCart: (product: Product) => void;
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'bouquets', label: 'Bouquets' },
  { key: 'arrangements', label: 'Arrangements' },
  { key: 'gift-boxes', label: 'Gift Boxes' },
  { key: 'plants', label: 'Plants' },
  { key: 'balloons', label: 'Balloons' },
];

export default function ShopSection({ onAddToCart }: ShopSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-rose-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Our Collection
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal-900 font-semibold mb-4">
            Shop Fresh Flowers
          </h2>
          <p className="text-charcoal-500 max-w-xl mx-auto">
            Handcrafted bouquets and arrangements made with love, delivered fresh to your door.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'bg-white text-charcoal-600 hover:bg-rose-50 hover:text-rose-600 border border-cream-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-charcoal-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-charcoal-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
