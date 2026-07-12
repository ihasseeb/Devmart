import { api } from './api';
import {
    type RegisterPayload,
    type RegisterResponse,
    type VerifyOtpPayload,
    type LoginPayload,
    type AuthResponse,
} from '../types/auth.types';

export const registerUser = async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
};

export const verifyOtp = async (data: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', data);
    return response.data;
};

export const resendOtp = async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
};