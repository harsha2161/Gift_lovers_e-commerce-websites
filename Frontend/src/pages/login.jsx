import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            const accessToken = response.access_token;
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
                accessToken: accessToken
            }).then((response) => {
                toast.success("Login Successful");
                const token = response.data.token;
                const role = response.data.role;
                localStorage.setItem("token", token);
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }).catch((err) => {
                toast.error("Google login failed");
                console.log(err);
            });
        }
    });

    async function handleLogin(e) {
        e.preventDefault();
        if(!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/signin", {
                email: email,
                password: password,
            });
            toast.success("Login Successful");
            localStorage.setItem("token", response.data.token);

            if (response.data.type === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    }

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
                    <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
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

                    <div className="flex justify-between items-center text-sm font-medium">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                            Remember me
                        </label>
                        <Link to={"/forgotPassword"}>
                            <span className="text-emerald-600 hover:text-emerald-700 hover:underline transition-all">
                                Forgot Password?
                            </span>
                        </Link>
                    </div>

                    <button type="submit" disabled={isLoading} className={`w-full h-12 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"}`}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <span className="w-1/5 border-b border-gray-200"></span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or continue with</span>
                    <span className="w-1/5 border-b border-gray-200"></span>
                </div>

                <button onClick={() => googleLogin()} type="button"
                    className="w-full h-12 mt-6 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50
                    transition-all flex justify-center items-center gap-3 shadow-sm hover:shadow">
                        <FcGoogle className="text-2xl" /> 
                        Sign in with Google
                </button>

                <p className="text-center text-gray-600 font-medium text-sm mt-8">
                    Don't have an account?{" "}
                    <Link to={"/signup"}>
                        <span className="text-emerald-600 hover:text-emerald-700 hover:underline transition-all font-bold">Sign up</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}