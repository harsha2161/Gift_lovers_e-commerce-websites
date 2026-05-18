import axios from "axios";
import { useState, useEffect } from "react";
  
import { FaShoppingCart, FaSign, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState("");

  const navigate = useNavigate()

  const location = useLocation();

  const token = localStorage.getItem("token")

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/getuser",{
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((response) => {
      setUser(response.data)
    }
  )

  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`w-full z-[100] font-sans transition-all duration-300 sticky top-0 
      ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-1" : "bg-white shadow-sm py-2"}`}>

        <div className="max-w-7xl h-[35px] mx-auto flex items-center justify-between px-4  md:h-[50px] md:px-8 ">

          {/*menu iocn */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsDrawerOpen(true)}
              className="text-gray-800 hover:text-bgcolor2">
              <GiHamburgerMenu className="text-2xl" />

            </button>
          </div>

          {/*Logo */}
          <div onClick={() => navigate("/")}
            className="">
            <img src="logo1.jpg" className="h-[50px] rounded-full " alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link to="/" className={`text-[15px] font-semibold transition-colors py-2 ${isActive("/") ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}>Home</Link>
            <Link to="/products" className={`text-[15px] font-semibold transition-colors py-2 ${isActive("/products") ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}>Products</Link>
            <Link to="/contacts" className={`text-[15px] font-semibold transition-colors py-2 ${isActive("/contacts") ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}>Contact Us</Link>
          </nav>

          <div className="flex justify-center items-center">
          {/* cart Icons */}
          <div className="flex items-center ">
            <Link to="/cart" className="relative p-2.5 text-gray-600 hover:text-bgcolor2 flex justify-center items-center flex-col">
              <FaShoppingCart className="text-[25px]" />
              cart
            </Link>
          </div>

        {
          token == null ? (
            <div className="flex items-center ">
              <Link to="/login" className="relative p-3 text-gray-600 hover:text-bgcolor2 flex justify-center items-center flex-col">
                <IoLogIn className="text-[30px]" />
                Login
              </Link>   
            </div>  

            ):(

            <div className="flex ml-25 flex justify-center items-center">
                <button onClick={()=>{
                  localStorage.removeItem("token")
                  localStorage.removeItem("user")
                }}>
                  
                  <div className="flex items-center ">
                    <Link to="/" className="relative p-2.5 text-gray-600 hover:text-bgcolor2 flex justify-center items-center flex-col">
                      <IoLogOut className="text-[27px]" />
                      <p>Logout</p>

                    </Link>
                  </div> 
                </button>
                
                <button 
                         onClick={() => {
                          navigate("/profile",{
                              state: user,
                            })
                  }}>
                  <img src={user.img} alt="profile pic" className="rounded-full object-cover h-13 border-3 shadow" />
                     
                </button>

            </div>
   
          )
          }

      </div>

          
        </div>
      </header>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      <div className={`fixed inset-0 z-[5000] flex md:hidden transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

        <div onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>

        <div className={`relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>

          {/* Drawer Header */}
          <div className="w-full h-[80px] border-b border-gray-100 flex justify-between items-center px-6 bg-white">

            <img src="logo.jpg" className="h-[50px] rounded-full " alt="logo" />

            <button onClick={() => setIsDrawerOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
              <IoMdClose className="text-2xl" />
            </button>

          </div>

    
          <nav className="flex flex-col flex-1 py-4 px-4 gap-2 ">
            <Link to="/" onClick={() => setIsDrawerOpen(false)} className={`text-[16px] font-semibold py-3 px-4 rounded-xl transition-colors ${isActive("/") ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50"}`}>Home</Link>
            <Link to="/products" onClick={() => setIsDrawerOpen(false)} className={`text-[16px] font-semibold py-3 px-4 rounded-xl transition-colors ${isActive("/products") ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50"}`}>Products</Link>
            <Link to="/contacts" onClick={() => setIsDrawerOpen(false)} className={`text-[16px] font-semibold py-3 px-4 rounded-xl transition-colors ${isActive("/contacts") ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50"}`}>Contact Us</Link>
          </nav>
        </div>
      </div>
    </>
  );
}