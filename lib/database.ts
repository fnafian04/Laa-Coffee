import { supabase } from "./supabase";

// ============================================
// PRODUCTS & CATEGORIES SERVICES
// ============================================

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Supabase getCategories error:", error);
      throw error;
    }

    console.log("Categories fetched:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProducts() {
  try {
    const { data, error } = await supabase.from("products").select("*, category:categories(id, name)").eq("is_available", true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const { data, error } = await supabase.from("products").select("*, category:categories(id, name)").order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("category_id", categoryId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function createProduct(product: { name: string; description: string; price: number; category_id: string; image_url?: string; image_urls?: string[]; is_available: boolean }) {
  try {
    // Set primary image_url to first image from array if not provided
    const primaryImage = product.image_url || (product.image_urls && product.image_urls[0]) || null;
    const imageUrlsJson = product.image_urls ? JSON.stringify(product.image_urls) : "[]";

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: product.category_id,
          image_url: primaryImage,
          image_urls: imageUrlsJson,
          is_available: product.is_available,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
}

export async function updateProduct(
  id: string,
  product: {
    name?: string;
    description?: string;
    price?: number;
    category_id?: string;
    image_url?: string;
    image_urls?: string[];
    is_available?: boolean;
  },
) {
  try {
    const updateData: any = { ...product };

    // If image_urls provided, update primary image_url to first one
    if (product.image_urls && product.image_urls.length > 0) {
      updateData.image_url = product.image_urls[0];
      updateData.image_urls = JSON.stringify(product.image_urls);
    } else if (product.image_urls !== undefined) {
      // Empty array
      updateData.image_urls = "[]";
      if (!product.image_url) {
        updateData.image_url = null;
      }
    }

    const { data, error } = await supabase.from("products").update(updateData).eq("id", id).select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

// ============================================
// ORDERS SERVICES
// ============================================

export async function createOrder(orderData: {
  table_number: number;
  customer_name: string;
  phone_number: string;
  payment_method: string;
  total_price: number;
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
    temperature?: string;
    custom_notes?: string;
  }>;
}) {
  try {
    // Get or create table
    let tableId: string;
    const { data: tableData, error: tableError } = await supabase.from("tables").select("id").eq("table_number", orderData.table_number).single();

    if (tableError && tableError.code === "PGRST116") {
      // Table doesn't exist, create it
      const { data: newTable, error: createError } = await supabase
        .from("tables")
        .insert([{ table_number: orderData.table_number }])
        .select()
        .single();

      if (createError) throw createError;
      tableId = newTable.id;
    } else if (tableError) {
      throw tableError;
    } else {
      tableId = tableData.id;
    }

    // Create order
    const orderNumber = `LC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    const { data: orderInsert, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: orderNumber,
          table_id: tableId,
          table_number: orderData.table_number,
          customer_name: orderData.customer_name,
          phone_number: orderData.phone_number,
          payment_method: orderData.payment_method,
          total_price: orderData.total_price,
          status: "pending_verification",
          payment_status: "unpaid",
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = orderData.items.map((item) => ({
      order_id: orderInsert.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      temperature: item.temperature || null,
      custom_notes: item.custom_notes || null,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) throw itemsError;

    return {
      ...orderInsert,
      order_number: orderNumber,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

export async function getOrdersByStatus(status: string) {
  try {
    const { data, error } = await supabase.from("orders").select("*, order_items(*, product:products(*, category:categories(id, name)))").eq("status", status).order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getAllOrders() {
  try {
    const { data, error } = await supabase.from("orders").select("*, order_items(*, product:products(*, category:categories(id, name)))").order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

export async function updateOrderStatus(id: string, status: "pending" | "confirmed" | "completed" | "cancelled") {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error updating order status:", error);
    return null;
  }
}

export async function updatePaymentStatus(id: string, payment_status: "unpaid" | "paid" | "pending_verification") {
  try {
    const { data, error } = await supabase.from("orders").update({ payment_status }).eq("id", id).select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error updating payment status:", error);
    return null;
  }
}

export async function getOrdersByTable(tableNumber: number) {
  try {
    const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("table_number", tableNumber).in("status", ["pending", "confirmed"]).order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching orders by table:", error);
    return [];
  }
}
