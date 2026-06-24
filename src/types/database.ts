export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          is_available: boolean;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image_url?: string;
          is_available?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          delivery_date: string | null;
          delivery_time: string | null;
          special_instructions: string | null;
          total_amount: number;
          status: string;
          telegram_sent: boolean;
          created_at: string;
        };
        Insert: {
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          delivery_date?: string | null;
          delivery_time?: string | null;
          special_instructions?: string | null;
          total_amount: number;
          status: string;
          telegram_sent?: boolean;
        };
        Update: {
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: string;
          delivery_date?: string | null;
          delivery_time?: string | null;
          special_instructions?: string | null;
          total_amount?: number;
          status?: string;
          telegram_sent?: boolean;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: {
          order_id?: string;
          product_id?: string;
          product_name?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
        };
        Update: {
          key?: string;
          value?: string | null;
        };
      };
    };
  };
}
