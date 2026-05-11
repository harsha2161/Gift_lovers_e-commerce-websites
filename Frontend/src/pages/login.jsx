import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import Footer from "../components/Footer";



export default function LogIn() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const googleLogin = useGoogleLogin({

      onSuccess : (responce) =>{
       const accessToken = responce.access_token
       
       axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google",{
        accessToken : accessToken
       }).then(
        (responce) =>{
          toast.success("Login Successfull")
          const token = responce.data.token
          const role = responce.data.role
          localStorage.setItem("token",token)
          if(role == "admin"){
            navigate("/admin")
          }else(
            navigate("/")
          )

          
        }
       ).catch((err)=>{
          toast.error("login failed")
          console.log(err)
       })
      }
})



    async function handleLogin(){
        console.log(email)
        console.log(password)
        try {
    
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/signin", {
              email:email,
              password:password,

        },
    )
     toast.success("login Sucessfull")
     console.log(response)
     localStorage.setItem("token",response.data.token)

     if(response.data.type === "admin"){
        // window.location.href = "/admin"
        navigate("/admin")
     }else{
       // window.location.href = "/"
       navigate("/")
     }

        }catch(err){
            toast.error(err.response.data.message)
        }
    }

  return (
    <div className="w-full h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex items-center justify-center">

      <div className="w-[450px] p-8 backdrop-blur-lg bg-white/20 border border-black/30 rounded-2xl shadow-xl"> 
        
        <h2 className="text-3xl font-bold text-center text-black mb-6"> wellcome to gift loves🙌 </h2>

        <div className="space-y-4">

          <input onChange={(e) => {setEmail(e.target.value) }} value={email} type="email" placeholder="Email" className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input onChange={(e) =>{ setPassword(e.target.value)}}value = {password} type="password" placeholder="Password" className="w-full h-12 px-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <div className="flex justify-between text-sm text-black">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="cursor-pointer" />
                Remember me
            </label>

            <Link to={"/forgotPassword"}><span className="cursor-pointer hover:underline">
              Forgot?
            </span>
            </Link>
            
          </div>

          <button onClick={handleLogin} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition cursor-pointer">Login</button>
          <button onClick={googleLogin} className="w-full h-12 bg-white text-black rounded-lg transition cursor-pointer flex justify-center items-center gap-4">
            <FcGoogle className="text-2xl" />Login in with google
          </button>

          </div>
            <p className="text-center text-black text-sm mt-4">
              Don’t have an account?{" "}
              <Link to={"/signup"}><span className="underline cursor-pointer">Sign up</span></Link>
            </p>

      </div>

    </div>
    
  )
  
}