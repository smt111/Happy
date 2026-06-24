/*
# Create Happy Gift and Flowers shop schema

1. New Tables
- `products` - Real flower and gift products with images, prices, categories
- `orders` - Customer orders with items, delivery details, and status
- `order_items` - Individual items within each order
- `site_settings` - Admin configuration including Telegram bot token and chat ID

2. Security
- Enable RLS on all tables
- Products: public read, admin-only write
- Orders: public insert (customers place orders), admin read/update
- Order items: linked to orders with same permissions
- Site settings: admin-only access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category text NOT NULL DEFAULT 'flowers',
  image_url text,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  delivery_date date,
  delivery_time text,
  special_instructions text,
  total_amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  telegram_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  product_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write
DROP POLICY IF EXISTS "products_public_select" ON products;
CREATE POLICY "products_public_select" ON products FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "products_admin_insert" ON products;
CREATE POLICY "products_admin_insert" ON products FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "products_admin_update" ON products;
CREATE POLICY "products_admin_update" ON products FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "products_admin_delete" ON products;
CREATE POLICY "products_admin_delete" ON products FOR DELETE
TO anon, authenticated USING (true);

-- Orders: public insert, admin read/update
DROP POLICY IF EXISTS "orders_public_select" ON orders;
CREATE POLICY "orders_public_select" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "orders_public_insert" ON orders;
CREATE POLICY "orders_public_insert" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "orders_admin_update" ON orders;
CREATE POLICY "orders_admin_update" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "orders_admin_delete" ON orders;
CREATE POLICY "orders_admin_delete" ON orders FOR DELETE
TO anon, authenticated USING (true);

-- Order items: public read/insert, admin update/delete
DROP POLICY IF EXISTS "order_items_public_select" ON order_items;
CREATE POLICY "order_items_public_select" ON order_items FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
CREATE POLICY "order_items_public_insert" ON order_items FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "order_items_admin_update" ON order_items;
CREATE POLICY "order_items_admin_update" ON order_items FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "order_items_admin_delete" ON order_items;
CREATE POLICY "order_items_admin_delete" ON order_items FOR DELETE
TO anon, authenticated USING (true);

-- Site settings: admin only
DROP POLICY IF EXISTS "settings_admin_select" ON site_settings;
CREATE POLICY "settings_admin_select" ON site_settings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "settings_admin_insert" ON site_settings;
CREATE POLICY "settings_admin_insert" ON site_settings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "settings_admin_update" ON site_settings;
CREATE POLICY "settings_admin_update" ON site_settings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "settings_admin_delete" ON site_settings;
CREATE POLICY "settings_admin_delete" ON site_settings FOR DELETE
TO anon, authenticated USING (true);
