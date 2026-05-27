-- ============================================
-- LAA COFFEE - ORDER AT TABLE SYSTEM
-- Database Schema for Supabase/PostgreSQL
-- ============================================

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tables (meja/nomor meja) table
CREATE TABLE IF NOT EXISTS tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INT NOT NULL UNIQUE,
  qr_code VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  table_number INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  -- pending: menunggu diproses, confirmed: sudah dikonfirmasi kasir, completed: selesai, cancelled: dibatalkan
  payment_status VARCHAR(50) NOT NULL DEFAULT 'unpaid',
  -- unpaid: belum dibayar, paid: sudah dibayar, pending_verification: menunggu verifikasi kasir
  ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table (detail menu per order)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  temperature VARCHAR(50), -- panas/dingin
  custom_notes TEXT, -- catatan khusus kasir/dapur
  subtotal DECIMAL(10, 2) NOT NULL GENERATED ALWAYS AS (quantity * price) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES untuk performa query
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_orders_table_id ON orders(table_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_table_number ON orders(table_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- SAMPLE DATA untuk testing
-- ============================================

-- Insert categories
INSERT INTO categories (name, icon) VALUES
  ('Minuman', '☕'),
  ('Makanan', '🍰'),
  ('Snack', '🍪')
ON CONFLICT (name) DO NOTHING;

-- Insert products (Minuman)
INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Espresso', 'Kopi hitam pekat dengan cita rasa kuat', 25000, '/images/espresso.jpg', id, TRUE
FROM categories WHERE name = 'Minuman'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Cappuccino', 'Perpaduan espresso dengan susu foam lembut', 32000, '/images/cappuccino.jpg', id, TRUE
FROM categories WHERE name = 'Minuman'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Latte', 'Espresso dengan steamed milk yang creamy', 30000, '/images/latte.jpg', id, TRUE
FROM categories WHERE name = 'Minuman'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Americano', 'Espresso yang dicerakan dengan air panas', 28000, '/images/americano.jpg', id, TRUE
FROM categories WHERE name = 'Minuman'
ON CONFLICT DO NOTHING;

-- Insert products (Makanan)
INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Nasi Goreng Special', 'Nasi goreng dengan telur, ayam, dan sayuran', 35000, '/images/nasi-goreng.jpg', id, TRUE
FROM categories WHERE name = 'Makanan'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Sandwich Club', 'Sandwich lapis dengan daging, telur, dan sayuran segar', 40000, '/images/sandwich.jpg', id, TRUE
FROM categories WHERE name = 'Makanan'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, image_url, category_id, is_available)
SELECT 'Pasta Carbonara', 'Pasta dengan saus krim dan parmesan', 45000, '/images/pasta.jpg', id, TRUE
FROM categories WHERE name = 'Makanan'
ON CONFLICT DO NOTHING;

-- Insert tables (Meja 1-10)
INSERT INTO tables (table_number, qr_code, is_active) VALUES
  (1, 'https://qr.example.com/table/1', TRUE),
  (2, 'https://qr.example.com/table/2', TRUE),
  (3, 'https://qr.example.com/table/3', TRUE),
  (4, 'https://qr.example.com/table/4', TRUE),
  (5, 'https://qr.example.com/table/5', TRUE),
  (6, 'https://qr.example.com/table/6', TRUE),
  (7, 'https://qr.example.com/table/7', TRUE),
  (8, 'https://qr.example.com/table/8', TRUE),
  (9, 'https://qr.example.com/table/9', TRUE),
  (10, 'https://qr.example.com/table/10', TRUE)
ON CONFLICT (table_number) DO NOTHING;
