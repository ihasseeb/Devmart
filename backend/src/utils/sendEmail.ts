import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (to: string, otp: string): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "DevMart <onboarding@resend.dev>",
    to,
    subject: "DevMart - Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to DevMart!</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 5px; color: #2F5496;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send OTP email");
  }
};
