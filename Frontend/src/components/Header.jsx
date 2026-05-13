import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  // Add scroll listener for header styling
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
    <header className={`w-full z-[100] font-sans transition-all duration-300 sticky top-0 
    ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-1" : "bg-white shadow-sm py-2"}`}>

      <div className="max-w-7xl h-[35px] mx-auto flex items-center justify-between px-4  md:h-[50px] md:px-8 ">

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsDrawerOpen(true)} className="p-2 -ml-2 rounded-xl hover:bg-emerald-50 text-gray-800 hover:text-emerald-600 transition-colors">
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>

        {/* Logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none flex justify-center md:justify-start cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center">
            Gift<span className="text-emerald-600">Lovers</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1 ml-1"></span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Contact", path: "/contacts" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[15px] font-semibold transition-all relative group py-2 ${isActive(link.path) ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">



          <Link to="/cart" className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
            <FaShoppingCart className="text-[22px]" />

          </Link>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      <div className={`fixed inset-0 z-[110] flex md:hidden transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        ></div>

        <div className={`relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>

          {/* Drawer Header */}
          <div className="w-full h-[80px] border-b border-gray-100 flex justify-between items-center px-6 bg-white">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-1">
              Gift<span className="text-emerald-600">Lovers</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1 ml-1"></span>
            </h2>
            <button
              className="p-2 -mr-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              onClick={() => setIsDrawerOpen(false)}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col flex-1 py-4 px-4 gap-1 overflow-y-auto">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Search", path: "/search" },
              { name: "Contact Us", path: "/contacts" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsDrawerOpen(false)}
                className={`text-[16px] font-semibold py-4 px-4 rounded-xl transition-colors ${isActive(link.path) ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}