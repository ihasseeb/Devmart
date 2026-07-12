export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    email: string;
}

export interface VerifyOtpPayload {
    email: string;
    otp: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token: string;
}

export interface ApiError {
    message: string;
}

