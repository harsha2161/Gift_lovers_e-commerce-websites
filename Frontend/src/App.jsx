import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import LogIn from "./pages/login"
import SignUp from "./pages/signup";
import AdminPage from "./pages/admin";
import ForgotPassword from "./pages/forgotPassword";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  
return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
       <BrowserRouter>
    <div>
     
      <Toaster position="top-center"/>

        <Routes path="/*">
        
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/admin/*" element={<AdminPage/>} />
          <Route path="/*" element={<Home />} />
        </Routes> 
        
    </div>
    
   </BrowserRouter>
    
  </GoogleOAuthProvider>

  )
}

export default App
