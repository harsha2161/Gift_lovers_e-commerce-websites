import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeMents, setAgreements] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCreateAcc(e) {
    e.preventDefault(); 

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
      setError("Please fill in all blank spaces");
      return;
    }
    if (password.length === 0) {
      setError("Please enter a password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeMents) {
      setError("You must agree to the Terms & Conditions");
      return;
    }

    setError(""); 
    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      toast.success("Account Created Successfully");
      console.log(response);
      if (response.data.message === "user create successfully") {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex items-center justify-center relative py-10">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md mx-4 p-8 backdrop-blur-xl bg-white/95 border border-white/20 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex justify-center items-center gap-1 mb-2 cursor-pointer" onClick={() => navigate("/")}>
                Gift<span className="text-emerald-600">Lovers</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1 ml-1"></span>
            </h1>
            <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Join us and start shopping today.</p>
        </div>

        <form onSubmit={handleCreateAcc} className="space-y-4">
          
          <div className="flex gap-4">
            {/* First Name */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                    className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
            </div>

            {/* Last Name */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
              </div>
              <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
          </div>

          {/* Password */}
          <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
              </div>
              <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
          </div>

          {/* Confirm Password */}
          <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
              </div>
              <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 transition-all 
                    ${error && error.includes("Password") ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-emerald-500"}`}
              />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <input 
                onChange={(e) => setAgreements(e.target.checked)}
                checked={agreeMents}
                type="checkbox" 
                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="cursor-pointer" onClick={() => setAgreements(!agreeMents)}>I agree to the Terms & Conditions</span>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 text-sm font-medium p-3 rounded-lg border border-red-100">
                {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg mt-2 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 font-medium text-sm mt-8">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-emerald-600 hover:text-emerald-700 hover:underline transition-all font-bold">Sign In</span>
          </Link>
        </p>

      </div>
    </div>
  );
}