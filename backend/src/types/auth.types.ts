
export interface MakeAdminDTO {
  email: string;
  secretKey: string;
}
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  adminSecret?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface VerifyOTPDTO {
  email: string;
  otp: string;
}

export interface ResendOTPDTO {
  email: string;
}

export interface JwtPayload {
  id: string;
  role: string;
}

// Neeche ye add karo — response types jo API se wapis aati hain

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

export interface MessageResponse {
  message: string;
}