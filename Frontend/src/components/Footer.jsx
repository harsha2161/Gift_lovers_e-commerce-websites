import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" flexed bottom-0 left-0 hidden md:flex flex-col w-full bg-white border-t border-gray-200 mt-auto shadow-inner">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/*logo and brand name*/}
          <div className="flex flex-col gap-4 md:border-r-2 p-2">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="logo" className="w-[60px] h-[60px] object-cover rounded-full shadow-sm hover:scale-105 transition-transform"/>
              <span className="text-xl font-bold text-gray-900 ">Gift Lovers</span>
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed mt-2">
              We provide the best quality products for our customers. Shop with us for a seamless and premium experience.
            </p>
          </div>

          {/*quick links*/}
          <div className="flex flex-col gap-4">

            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 inline-block w-fit">Quick Links</h3>
            
            <nav className="flex flex-col gap-3 mt-2">
              <Link to="/home" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all">Home </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all">Products</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all">About Us</Link>
              <Link to="/contacts" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all">Contact Us</Link>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all">Shopping Cart</Link>
            </nav>

          </div>

          {/*contact detials*/}
          <div className="flex flex-col gap-4">
            
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 inline-block w-fit">
              Contact Info
            </h3>

            <div className="flex flex-col gap-4 mt-2">

              <div className="flex items-start gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-gray-900 mt-1 flex-shrink-0" />
                <span className="text-sm">Monaragala, Srilanka</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaPhoneAlt className="text-gray-900 flex-shrink-0" />
                <span className="text-sm">+ 94 765737107</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="text-gray-900 flex-shrink-0" />
                <a href="giftlovers@gmail.com" className="text-sm hover:text-gray-900 transition-colors">giftlovers@gmail.com</a>
              </div>
            </div>

          </div>

          {/*social mideo links */}
          <div className="flex flex-col gap-4">

            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 inline-block w-fit"> Follow Us </h3>
            <p className="text-gray-600 text-sm mt-2">Stay connected for the latest updates and exclusive offers!</p>
            
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61552662099672" target="_blank" rel="noreferrer" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white transition-all"> <FaFacebook className="text-xl" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white transition-all"><FaInstagram className="text-xl" /></a>
            </div>

          </div>

        </div>
      </div>

      {/*bottoms of footer*/}
      <div className="w-full bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Giift Lovers. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}