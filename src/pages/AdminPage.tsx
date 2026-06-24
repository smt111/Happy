import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, Order, OrderItem } from '../types';
import {
  Package,
  ShoppingCart,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  LogOut,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'bouquets',
    image_url: '',
    is_available: true,
  });

  useEffect(() => {
    fetchData();
  }, [tab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (tab === 'products') {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } else {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;

        // Fetch items for each order
        const ordersWithItems = await Promise.all(
          (data || []).map(async (order: Order) => {
            const { data: items } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);
            return { ...order, items: (items || []) as OrderItem[] };
          })
        );
        setOrders(ordersWithItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        image_url: form.image_url,
        is_available: form.is_available,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload as any);
        if (error) throw error;
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setForm({ name: '', description: '', price: '', category: 'bouquets', image_url: '', is_available: true });
      fetchData();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status } as any).eq('id', orderId);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url,
      is_available: product.is_available,
    });
    setShowProductForm(true);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-gold-100 text-gold-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    delivered: 'bg-charcoal-100 text-charcoal-700',
    cancelled: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-rose-600" />
            <h1 className="font-display text-xl font-semibold text-charcoal-900">Admin Panel</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Exit Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              tab === 'products'
                ? 'bg-charcoal-900 text-white'
                : 'bg-white text-charcoal-600 hover:bg-rose-50 border border-cream-200'
            }`}
          >
            <Package className="w-4 h-4" />
            Products ({products.length})
          </button>
          <button
            onClick={() => setTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              tab === 'orders'
                ? 'bg-charcoal-900 text-white'
                : 'bg-white text-charcoal-600 hover:bg-rose-50 border border-cream-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Orders ({orders.length})
          </button>
        </div>

        {tab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl font-semibold text-charcoal-900">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setForm({ name: '', description: '', price: '', category: 'bouquets', image_url: '', is_available: true });
                  setShowProductForm(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-full hover:bg-rose-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {showProductForm && (
              <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold mb-4">
                  {editingProduct ? 'Edit Product' : 'New Product'}
                </h3>
                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-charcoal-700 mb-1 block">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal-700 mb-1 block">Price (ETB) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal-700 mb-1 block">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                    >
                      <option value="bouquets">Bouquets</option>
                      <option value="arrangements">Arrangements</option>
                      <option value="gift-boxes">Gift Boxes</option>
                      <option value="plants">Plants</option>
                      <option value="balloons">Balloons</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal-700 mb-1 block">Image URL *</label>
                    <input
                      required
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-charcoal-700 mb-1 block">Description</label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="available"
                      checked={form.is_available}
                      onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                      className="w-4 h-4 rounded border-cream-300 text-rose-600 focus:ring-rose-500"
                    />
                    <label htmlFor="available" className="text-sm text-charcoal-700">Available for purchase</label>
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-charcoal-900 text-white rounded-full hover:bg-rose-600 transition-colors text-sm font-medium"
                    >
                      {editingProduct ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="px-6 py-2.5 bg-cream-100 text-charcoal-600 rounded-full hover:bg-cream-200 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cream-50 border-b border-cream-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-charcoal-500 uppercase">Product</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-charcoal-500 uppercase">Category</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-charcoal-500 uppercase">Price</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-charcoal-500 uppercase">Status</th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-charcoal-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-cream-50/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-medium text-charcoal-900 text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-charcoal-600 capitalize">{product.category}</td>
                          <td className="px-4 py-3 text-sm text-charcoal-900 font-medium">{product.price.toFixed(2)} ETB</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${product.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {product.is_available ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openEdit(product)} className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-charcoal-500" />
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-rose-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'orders' && (
          <>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-4">Orders</h2>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 text-charcoal-500">No orders yet</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
                    <div
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-cream-50/50 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal-900 text-sm">{order.customer_name}</p>
                          <p className="text-charcoal-400 text-xs">{order.customer_phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-charcoal-100'}`}>
                          {order.status}
                        </span>
                        <span className="font-semibold text-charcoal-900 text-sm">{order.total_amount.toFixed(2)} ETB</span>
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-4 h-4 text-charcoal-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-charcoal-400" />
                        )}
                      </div>
                    </div>

                    {expandedOrder === order.id && (
                      <div className="px-5 pb-5 border-t border-cream-200 pt-4 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-charcoal-400 uppercase mb-1">Delivery Address</p>
                            <p className="text-sm text-charcoal-700">{order.delivery_address}</p>
                          </div>
                          <div>
                            <p className="text-xs text-charcoal-400 uppercase mb-1">Order Date</p>
                            <p className="text-sm text-charcoal-700">{new Date(order.created_at).toLocaleString()}</p>
                          </div>
                          {order.delivery_date && (
                            <div>
                              <p className="text-xs text-charcoal-400 uppercase mb-1">Delivery Date</p>
                              <p className="text-sm text-charcoal-700">{order.delivery_date}</p>
                            </div>
                          )}
                          {order.special_instructions && (
                            <div>
                              <p className="text-xs text-charcoal-400 uppercase mb-1">Instructions</p>
                              <p className="text-sm text-charcoal-700">{order.special_instructions}</p>
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-charcoal-400 uppercase mb-2">Items</p>
                          <div className="space-y-2">
                            {order.items?.map((item) => (
                              <div key={item.id || `${order.id}-${item.product_id}`} className="flex items-center justify-between py-2 px-3 bg-cream-50 rounded-lg">
                                <span className="text-sm text-charcoal-700">{item.product_name} x{item.quantity}</span>
                                <span className="text-sm font-medium text-charcoal-900">{item.total_price.toFixed(2)} ETB</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-charcoal-400 uppercase">Update Status:</span>
                          {['pending', 'confirmed', 'delivered', 'cancelled'].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleUpdateOrderStatus(order.id, s)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                order.status === s
                                  ? statusColors[s]
                                  : 'bg-cream-100 text-charcoal-500 hover:bg-cream-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
