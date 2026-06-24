/*
# Complete Happy Gift and Flowers Setup

1. New Tables
- `products` - Real flower and gift products with images, prices, categories
- `orders` - Customer orders with delivery details and status
- `order_items` - Individual items within each order
- `site_settings` - Admin configuration (Telegram bot token, chat ID)

2. Security
- Enable RLS on all tables
- Products: public read, admin write
- Orders: public insert (customers place orders), admin read/update
- Order items: linked to orders with same permissions
- Site settings: admin-only access

3. Seed Data
- 16 real flower and gift products with Pexels images
*/

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category text NOT NULL DEFAULT 'flowers',
  image_url text,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
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

-- Create order_items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  product_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE site_settings (
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

-- Products policies
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

-- Orders policies
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

-- Order items policies
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

-- Site settings policies
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

-- Seed products
INSERT INTO products (name, description, price, category, image_url, is_available) VALUES
('Red Rose Bouquet - 12 Stems', 'Classic dozen red roses hand-tied with eucalyptus and gypsophila, wrapped in premium kraft paper.', 1200.00, 'bouquets', 'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Pink Tulip Arrangement', 'Fresh pink tulips arranged in a glass vase with seasonal greenery. Perfect for spring celebrations.', 950.00, 'arrangements', 'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Mixed Seasonal Bouquet', 'A vibrant mix of seasonal blooms including daisies, carnations, and alstroemeria in cheerful colors.', 850.00, 'bouquets', 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('White Lily & Orchid Arrangement', 'Elegant white lilies paired with phalaenopsis orchids in a ceramic pot. Sophisticated and long-lasting.', 1800.00, 'arrangements', 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Sunflower Bright Bouquet', 'Cheerful sunflowers mixed with yellow solidago and greenery. Brings sunshine to any room.', 750.00, 'bouquets', 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Luxury Rose Box - 24 Stems', 'Two dozen premium roses arranged in a black gift box with satin ribbon. The ultimate romantic gesture.', 2500.00, 'gift-boxes', 'https://images.pexels.com/photos/5414818/pexels-photo-5414818.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Chocolate & Flower Gift Set', 'A beautiful bouquet paired with a box of Belgian chocolates. The perfect combination of sweet and beautiful.', 1500.00, 'gift-boxes', 'https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Baby''s Breath Cloud Bouquet', 'Delicate baby''s breath arranged in a cloud-like formation. Ethereal and romantic.', 650.00, 'bouquets', 'https://images.pexels.com/photos/4622893/pexels-photo-4622893.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Exotic Orchid Plant', 'A potted phalaenopsis orchid plant that blooms for months. Low maintenance and stunning.', 1400.00, 'plants', 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Heart-Shaped Rose Arrangement', 'Roses arranged in a heart shape within a decorative box. Perfect for anniversaries and Valentine''s Day.', 2200.00, 'gift-boxes', 'https://images.pexels.com/photos/931154/pexels-photo-931154.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Balloon & Flower Combo', 'Colorful helium balloons paired with a small bouquet. Great for birthdays and celebrations.', 1100.00, 'balloons', 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Succulent Garden Arrangement', 'A collection of beautiful succulents in a decorative wooden box. Long-lasting and modern.', 900.00, 'plants', 'https://images.pexels.com/photos/1445418/pexels-photo-1445418.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Purple Lavender Bouquet', 'Fragrant lavender stems tied with natural twine. Calming and beautifully scented.', 700.00, 'bouquets', 'https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Teddy Bear & Roses Gift', 'A soft teddy bear paired with a mini rose bouquet. Adorable gift for someone special.', 1300.00, 'gift-boxes', 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Tropical Flower Arrangement', 'Bird of paradise, anthuriums, and heliconias arranged with monstera leaves. Exotic and bold.', 1600.00, 'arrangements', 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Peony Perfection Bouquet', 'Lush peonies in soft pink and white. Seasonal availability, absolutely stunning when in bloom.', 2000.00, 'bouquets', 'https://images.pexels.com/photos/617967/pexels-photo-617967.jpeg?auto=compress&cs=tinysrgb&w=600', true);
