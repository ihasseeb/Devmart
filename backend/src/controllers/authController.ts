import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { RegisterDTO, LoginDTO, VerifyOTPDTO, ResendOTPDTO } from '../types/auth.types';
import { generateOTP } from '../utils/generateOTP';
import { sendOTPEmail } from '../utils/sendEmail';

const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

// @route POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, adminSecret }: RegisterDTO = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email already registered' });
      return;
    }

    const role = adminSecret && adminSecret === process.env.ADMIN_SECRET ? 'admin' : 'user';

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minute baad expire

    const user = await UserModel.create({
      name,
      email,
      password,
      role,
      isVerified: false,
      otp,
      otpExpires,
    });

    // OTP email bhejo
    try {
      await sendOTPEmail(email, otp);
      console.log(`[OTP_SUCCESS] OTP email sent successfully to ${email}`);
    } catch (emailError) {
      console.error(`[OTP_ERROR] Failed to send OTP email to ${email}:`, emailError);
      console.log(`\n========================================\n[OTP_DEBUG] OTP for ${email} is: ${otp}\n========================================\n`);
    }

    res.status(201).json({
      message: 'Registration successful. OTP sent to your email.',
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route POST /api/auth/verify-otp
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp }: VerifyOTPDTO = req.body;

    const user = await UserModel.findOne({ email }).select('+otp +otpExpires');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: 'Email already verified' });
      return;
    }

    if (user.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      res.status(400).json({ message: 'OTP has expired' });
      return;
    }

    // Verify kar do, OTP clear kar do
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Email verified successfully',
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route POST /api/auth/resend-otp
export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: ResendOTPDTO = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: 'Email already verified' });
      return;
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    try {
      await sendOTPEmail(email, otp);
      console.log(`[OTP_SUCCESS] Resent OTP email successfully to ${email}`);
    } catch (emailError) {
      console.error(`[OTP_ERROR] Failed to resend OTP email to ${email}:`, emailError);
      console.log(`\n========================================\n[OTP_DEBUG] OTP for ${email} is: ${otp}\n========================================\n`);
    }

    res.status(200).json({ message: 'New OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginDTO = req.body;

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Agar email verify nahi hui to login block karo
    if (!user.isVerified) {
      res.status(403).json({ message: 'Please verify your email before logging in' });
      return;
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};