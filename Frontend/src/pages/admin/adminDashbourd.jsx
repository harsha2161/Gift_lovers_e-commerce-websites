import axios from "axios";
import { useState, useEffect } from "react";
import { FaBox, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import toast from "react-hot-toast";


export default function AdminDashboard() {
    
  const [isLoading, setIsLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderCount , setrOderCount] = useState("0")
  const [totleUsers , setTotleUsers] = useState("0")
  const [totleProducts , setTotleProducts] = useState("0")

  const token = localStorage.getItem("token")

  let Revenue = 0
  for(let i=0; i<recentOrders.length; i++){
     Revenue = Revenue + recentOrders[i].total
    }
   

  useEffect(() => {
 
    if(isLoading == true){
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order/", {
            headers: { Authorization: "Bearer " + token },}).then(
                (res) => {
                    console.log(res.data)
                    setrOderCount(res.data.length)
                    setRecentOrders(res.data)
                    setIsLoading(false)

                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false)
               });

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/").then(
            (res) =>{
                console.log(res.data.length)
                setTotleUsers(res.data.length)
                setIsLoading(false)

            }).catch((err) => {
                    console.log(err)
                    setIsLoading(false)
               });

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product", {
            headers: { Authorization: "Bearer " + token },}).then(
                (res) => {
                    console.log(res.data.length)
                    setTotleProducts(res.data.length)
                    setIsLoading(false)

                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false)
               });   
    } 
  }, [isLoading]);

  
  const statCards = [
    { title: "Total Revenue", value: `Rs ${Revenue.toLocaleString()}`, icon: <FaDollarSign />, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Orders", value: orderCount, icon: <FaShoppingCart />, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Products", value: totleProducts, icon: <FaBox />, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Total Users", value: totleUsers, icon: <FaUsers />, color: "text-purple-600", bg: "bg-purple-100" }, 
];

  return (
    
    <div className="w-full h-full overflow-y-auto  custom-scrollbar">
     
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className=" p-2 text-3xl font-bold text-gray-800 tracking-wide">
          Dashboard Overview
        </h2>
        <p className="pl-2  text-gray-500 mt-2 text-sm">Welcome back! Here is a summary of your store's performance.</p>
      </div>

      {isLoading ? (
        <Loading/>
      ) : (
        <div className="flex flex-col gap-8">
          
          {/* Top Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow duration-200">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.bg} ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section: Recent Orders & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Orders Table*/}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                <Link to="/admin/order" className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">

                    {recentOrders.slice(recentOrders.length-4,recentOrders.length).map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{order.orderId}</td>
                        <td className="px-6 py-4 text-gray-600">{order.name}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-gray-800 font-medium">{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${order.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                            ${order.status === 'pending' ? 'bg-orange-100 text-orange-700' : ''}
                            ${order.status === 'return' ? 'bg-blue-100 text-blue-700' : ''}
                          `}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

           {/*quick action penal */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="flex flex-col gap-4 flex-1">
                <Link to="/admin/addproduct" className="w-full py-4 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl flex items-center gap-4 transition-colors">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><FaBox /></div>
                  <span className="font-medium">Add New Product</span>
                </Link>
                
                <Link to="/admin/order" className="w-full py-4 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl flex items-center gap-4 transition-colors">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><FaShoppingCart /></div>
                  <span className="font-medium">Manage Orders</span>
                </Link>

                <Link to="/admin/users" className="w-full py-4 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl flex items-center gap-4 transition-colors">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><FaUsers /></div>
                  <span className="font-medium">View Users</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}