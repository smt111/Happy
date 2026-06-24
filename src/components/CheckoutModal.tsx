import { useState } from 'react';
import { X, CheckCircle, Loader2, MapPin, Phone, User, Calendar, Clock, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onOrderComplete: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalPrice,
  onOrderComplete,
}: CheckoutModalProps) {
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    delivery_address: '',
    delivery_date: '',
    delivery_time: '',
    special_instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          delivery_address: form.delivery_address,
          delivery_date: form.delivery_date || null,
          delivery_time: form.delivery_time || null,
          special_instructions: form.special_instructions || null,
          total_amount: totalPrice,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItemsWithId = orderItems.map((item) => ({
        ...item,
        order_id: orderData.id,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsWithId);

      if (itemsError) throw itemsError;

      // Send to Telegram
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-bot`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          order_id: orderData.id,
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          delivery_address: form.delivery_address,
          delivery_date: form.delivery_date,
          delivery_time: form.delivery_time,
          special_instructions: form.special_instructions,
          total_amount: totalPrice,
          items: orderItems,
        }),
      });

      if (response.ok) {
        await supabase
          .from('orders')
          .update({ telegram_sent: true })
          .eq('id', orderData.id);
      }

      setSuccess(true);
      onOrderComplete();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-2">
            Order Placed!
          </h2>
          <p className="text-charcoal-500 mb-6">
            Thank you for your order! We will call you shortly to confirm the details.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-charcoal-900 text-white font-medium rounded-full hover:bg-rose-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 border-b border-cream-200">
          <h2 className="font-display text-xl font-semibold text-charcoal-900">
            Checkout
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-cream-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-charcoal-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <User className="w-4 h-4 text-rose-500" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <Phone className="w-4 h-4 text-rose-500" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={form.customer_phone}
              onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              placeholder="09XX XXX XXXX"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              Delivery Address *
            </label>
            <textarea
              required
              rows={2}
              value={form.delivery_address}
              onChange={(e) => setForm({ ...form, delivery_address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              placeholder="Your delivery address in Addis Ababa"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                Delivery Date
              </label>
              <input
                type="date"
                value={form.delivery_date}
                onChange={(e) => setForm({ ...form, delivery_date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <Clock className="w-4 h-4 text-rose-500" />
                Preferred Time
              </label>
              <input
                type="time"
                value={form.delivery_time}
                onChange={(e) => setForm({ ...form, delivery_time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              Special Instructions
            </label>
            <textarea
              rows={2}
              value={form.special_instructions}
              onChange={(e) => setForm({ ...form, special_instructions: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              placeholder="Any special requests or notes"
            />
          </div>

          <div className="pt-2 border-t border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-charcoal-600 font-medium">Total</span>
              <span className="text-xl font-bold text-charcoal-900">
                {totalPrice.toFixed(2)} ETB
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-charcoal-900 text-white font-medium rounded-full hover:bg-rose-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
