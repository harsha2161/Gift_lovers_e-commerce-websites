import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex items-center justify-center relative">
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md mx-4 p-8 backdrop-blur-xl bg-white/95 border border-white/20 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex justify-center items-center gap-1 mb-2 cursor-pointer" onClick={() => navigate("/")}>
                Gift<span className="text-emerald-600">Lovers</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1 ml-1"></span>
            </h1>
            <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your email and we'll send you a reset link.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
              </div>
              <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
              />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-600 font-medium text-sm mt-8">
          Remember your password?{" "}
          <Link to="/login">
            <span className="text-emerald-600 hover:text-emerald-700 hover:underline transition-all font-bold">Sign In</span>
          </Link>
        </p>

      </div>

    </div>
  );
}