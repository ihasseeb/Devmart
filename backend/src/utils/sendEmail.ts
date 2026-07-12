import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (to: string, otp: string): Promise<void> => {
    await transporter.sendMail({
        from: `"DevMart" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'DevMart - Verify Your Email',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to DevMart!</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 5px; color: #2F5496;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
    });
};