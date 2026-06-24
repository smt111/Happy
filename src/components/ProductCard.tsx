import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const categoryLabels: Record<string, string> = {
    bouquets: 'Bouquet',
    arrangements: 'Arrangement',
    'gift-boxes': 'Gift Box',
    balloons: 'Balloons',
    plants: 'Plant',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-cream-200">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-700 text-xs font-medium rounded-full">
            {categoryLabels[product.category] || product.category}
          </span>
        </div>
        {!product.is_available && (
          <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-charcoal-800 font-medium rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-charcoal-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-rose-600 font-bold text-lg">
            {product.price.toFixed(2)} <span className="text-sm font-normal text-charcoal-500">ETB</span>
          </span>
          <button
            onClick={handleAdd}
            disabled={!product.is_available || added}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              added
                ? 'bg-emerald-500 text-white'
                : product.is_available
                ? 'bg-charcoal-900 text-white hover:bg-rose-600'
                : 'bg-charcoal-200 text-charcoal-400 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
