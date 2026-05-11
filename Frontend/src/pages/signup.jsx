import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeMents, setAgreements] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleCreateAcc(e){
    e.preventDefault(); // ❗ prevent refresh

    // 🔴 check password match


    if(firstName.length == 0 || lastName.length == 0 || email.length == 0){
        setError("Fill Blank Space First")
        return
    }
    if(password.length == 0){
        setError("Enter Password First")
        return
    }

    if(password !== confirmPassword ){
      setError("Passwords Do Not Match");
      return;
    }

    if(agreeMents == false){
        setError("If You Agree Terms & Conditions Click Chekbox")
        return
    }

    setError(""); // clear error

    try{
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/signup",{
        firstName : firstName,
        lastName :lastName,
        email : email,
        password : password,
      });

      toast.success("Account Created Successfully");
      console.log(response);
      if(response.data.message == "user create successfully"){
          navigate("/login")
      }
    }catch(err){
      toast.error(err.response.data.message || "Something went wrong");
    }
  }


  return (
    <div className="w-full h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex items-center justify-center">

      <div className="w-[450px] p-8 backdrop-blur-lg bg-white/20 border border-black/30 rounded-2xl shadow-xl">
        
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleCreateAcc} className="space-y-4">
          
          {/* First Name */}
          <input
            onChange={(e)=>setFirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First Name"
            className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Last Name */}
          <input
            onChange={(e)=>setLastName(e.target.value)}
            value={lastName}
            type="text"
            placeholder="Last Name"
            className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Email */}
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Confirm Password */}
          <input
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className={`w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${error ? "border border-red-500" : ""}`}
          />

         

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-black">
            <input 
                onChange={(e) =>{
                    setAgreements( e.target.value)
                   value()
                }}
                type="checkbox" />
            <span>I agree to the Terms & Conditions</span>
          </div>
                 {/* 🔴 Error Message */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {/* Button */}
          <button
            type="submit"
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-black text-sm mt-4">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="underline cursor-pointer">Login</span>
          </Link>
        </p>

      </div>
    </div>
  );
}