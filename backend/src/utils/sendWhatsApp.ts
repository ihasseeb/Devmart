import axios from "axios";

export const sendWhatsAppNotification = async (
  message: string,
): Promise<void> => {
  try {
    const phone = process.env.WHATSAPP_PHONE;
    const apiKey = process.env.WHATSAPP_API_KEY;

    if (!phone || !apiKey) {
      console.warn(
        "⚠️ WhatsApp credentials missing in .env — skipping notification",
      );
      return;
    }

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(
      message,
    )}&apikey=${apiKey}`;

    await axios.get(url);
    console.log("✅ WhatsApp notification sent");
  } catch (error) {
    // Notification fail hone se order creation fail nahi hona chahiye
    console.error("❌ WhatsApp notification failed:", error);
  }
};
