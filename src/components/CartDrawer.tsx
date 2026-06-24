import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  totalPrice: number;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  totalPrice,
  onCheckout,
}: CartDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-cream-200">
          <h2 className="font-display text-xl font-semibold text-charcoal-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-charcoal-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-cream-300 mb-4" />
              <p className="text-charcoal-500 font-medium mb-1">Your cart is empty</p>
              <p className="text-charcoal-400 text-sm">Add some beautiful flowers!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-cream-50 rounded-xl border border-cream-200"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-charcoal-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-rose-600 font-semibold text-sm mt-1">
                      {item.product.price.toFixed(2)} ETB
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-cream-200 hover:border-rose-300 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-cream-200 hover:border-rose-300 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto p-1.5 text-charcoal-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-cream-200 bg-cream-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-charcoal-600 font-medium">Total</span>
              <span className="text-xl font-bold text-charcoal-900">
                {totalPrice.toFixed(2)} ETB
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-charcoal-900 text-white font-medium rounded-full hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
