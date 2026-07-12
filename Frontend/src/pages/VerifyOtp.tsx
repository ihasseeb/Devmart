import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/authApi";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Signup page se bheja hua email yahan milta hai
  const email = (location.state as { email?: string })?.email || "";

  const [otp, setOtp] = useState("");
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Agar email hi na mile (direct URL se koi is page pe aa jaye), signup pe wapis bhejo
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  // Resend button ka 30-second cooldown timer
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await verifyOtp({ email, otp });
      setVerifiedSuccess(true);

      setTimeout(() => {
        navigate("/login", { state: { verified: true } });
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    setResendLoading(true);
    try {
      const res = await resendOtp(email);
      setResendMessage(res.message);
      setCooldown(30); // 30 second ke liye button disable
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>

        {verifiedSuccess ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg font-semibold text-green-700">
              Email verified successfully!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 text-red-700 text-sm rounded-md p-3 mb-4">
                {error}
              </div>
            )}
            {resendMessage && (
              <div className="bg-green-100 text-green-700 text-sm rounded-md p-3 mb-4">
                {resendMessage}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="w-full border rounded-md px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>

            <button
              onClick={handleResend}
              disabled={resendLoading || cooldown > 0}
              className="w-full text-sm text-blue-600 mt-4 disabled:text-gray-400"
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
