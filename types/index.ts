/**
 * Type definitions untuk Laa Coffee Order System
 */

// ============================================
// DATABASE MODELS
// ============================================

export interface Category {
  id: string;
  name: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: string;
  table_number: number;
  qr_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  table_id: string;
  table_number: number;
  total_price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_status: "unpaid" | "paid" | "pending_verification";
  ordered_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  temperature?: "hot" | "cold";
  custom_notes?: string;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// APPLICATION TYPES
// ============================================

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  quantity: number;
  temperature?: "hot" | "cold";
  customNotes?: string;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OrderResponse extends ApiResponse<Order> {
  orderId?: string;
}
