import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ShopSection from './components/ShopSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPage from './pages/AdminPage';
import { useCart } from './hooks/useCart';
import { Lock } from 'lucide-react';

type View = 'shop' | 'admin' | 'admin-login';

export default function App() {
  const [view, setView] = useState<View>('shop');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const { items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice } = useCart();

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    // Simple hardcoded admin credentials (no auth system per requirements)
    if (loginForm.username === 'admin' && loginForm.password === 'happygift2024') {
      setView('admin');
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Invalid credentials');
    }
  };

  if (view === 'admin-login') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-cream-200">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-rose-600" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-semibold text-center text-charcoal-900 mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-sm text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-charcoal-900 text-white font-medium rounded-full hover:bg-rose-600 transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setView('shop')}
              className="w-full py-2 text-charcoal-500 text-sm hover:text-rose-600 transition-colors"
            >
              Back to Shop
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return <AdminPage onLogout={() => setView('shop')} />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header cartCount={totalCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ShopSection onAddToCart={addItem} />
      <AboutSection />
      <ContactSection />
      <Footer />

      <button
        onClick={() => setView('admin-login')}
        className="fixed bottom-4 right-4 p-3 bg-charcoal-900/80 backdrop-blur-sm text-white/70 rounded-full hover:bg-charcoal-900 hover:text-white transition-all z-40 text-xs"
        title="Admin"
      >
        <Lock className="w-4 h-4" />
      </button>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
