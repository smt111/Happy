import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface OrderPayload {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_date?: string;
  delivery_time?: string;
  special_instructions?: string;
  total_amount: number;
  items: OrderItem[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { order_id, customer_name, customer_phone, delivery_address, delivery_date, delivery_time, special_instructions, total_amount, items }: OrderPayload = await req.json();

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!botToken || !chatId) {
      return new Response(
        JSON.stringify({ error: "Telegram bot not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const itemsText = items.map((item) =>
      `  • ${item.product_name} x${item.quantity} — ${item.unit_price.toFixed(2)} ETB`
    ).join("\n");

    const message = `
🌸 <b>New Order Received!</b> 🌸

<b>Order ID:</b> ${order_id}
<b>Customer:</b> ${customer_name}
<b>Phone:</b> ${customer_phone}
<b>Address:</b> ${delivery_address}
${delivery_date ? `<b>Delivery Date:</b> ${delivery_date}\n` : ""}${delivery_time ? `<b>Delivery Time:</b> ${delivery_time}\n` : ""}${special_instructions ? `<b>Special Instructions:</b> ${special_instructions}\n` : ""}
<b>Items:</b>
${itemsText}

<b>Total:</b> ${total_amount.toFixed(2)} ETB
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.description || "Failed to send Telegram message");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Order sent to Telegram" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
