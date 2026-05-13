import { FaChartBar, FaStar, FaUser } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-blue-600 text-white font-medium flex items-center gap-3 p-3 rounded-lg shadow-md transition-all duration-300";
    } else {
      return "text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-3 p-3 rounded-lg transition-all duration-200";
    }
  }

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[260px] h-full bg-gray-900 text-white flex flex-col shadow-2xl z-10">
        <div className="py-8 border-b border-gray-800">
          <h2 className="text-3xl font-extrabold text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Admin Panel
          </h2>
        </div>

        <div className="flex flex-col gap-3 p-4 mt-4 flex-1">
           <Link to="/admin/dashboard" className={getClass("dashboard")}>
            <span className="text-xl"><FaChartBar/></span> Dashboard
          </Link>
          <Link to="/admin/products" className={getClass("products")}>
            <span className="text-xl"><AiOutlineProduct /></span> Products
          </Link>
          <Link to="/admin/review" className={getClass("review")}>
            <span className="text-xl"><FaStar/></span> Review
          </Link>
          <Link to="/admin/order" className={getClass("order")}>
            <span className="text-xl"><IoBookmarkOutline/></span> Order
          </Link>
          <Link to="/admin/users" className={getClass("users")}>
            <span className="text-xl"><FaUser/></span> Users
          </Link>
          
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full h-full p-6 lg:p-8 overflow-hidden">
        <div className="bg-white w-full h-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
