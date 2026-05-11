import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="w-full h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex items-center justify-center">

      <div className="w-[450px] p-8 backdrop-blur-lg bg-white/20 border border-black/30 rounded-2xl shadow-xl">
        
        <h2 className="text-3xl font-bold text-center text-black mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-center text-black mb-6">
          Enter your email and we’ll send you a reset link
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-black text-sm mt-4">
          Remember your password?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}