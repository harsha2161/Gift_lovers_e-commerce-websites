import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminProductPage() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // this function loaded in 1st time of run this components
    if (isLoading == true) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((res) => {
        console.log(res.data);
        setProduct(res.data); // පේජ් එජ මෙතනදී රීෆ්‍රෙශ් වෙනනිසා නැවත නැවත රන් වී බැක් එන්ඩ කෝල් යයි
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 relative">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[60px] h-[60px] border-t-[4px] border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto h-full rounded-2xl">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-5 font-semibold text-center">Product</th>
                <th className="px-6 py-5 font-semibold text-center">Image</th>
                <th className="px-6 py-5 font-semibold text-center">Price</th>
                <th className="px-6 py-5 font-semibold text-center">Stock</th>
                <th className="px-6 py-5 font-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {product.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{item.productName}</td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <img
                        src={item.img[0]}
                        alt={item.productName}
                        className="w-[80px] h-[80px] object-cover rounded-lg shadow-sm border border-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">Rs. {item.lablePrice}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stoke > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.stoke}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                          onClick={() => {
                            navigate("/admin/deleteprodute", {
                              state: item,
                            });
                          }}
                        >
                          <FaTrash className="text-lg" />
                        </button>
                        <button
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
                          onClick={() => {
                            navigate("/admin/editProdute", {
                              state: item,
                            });
                          }}
                        >
                          <FaEdit className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Action Button */}
      <Link to={"/admin/addproduct"}>
        <button className="fixed bottom-10 right-10 bg-blue-600 text-3xl text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50">
          +
        </button>
      </Link>
    </div>
  );
}