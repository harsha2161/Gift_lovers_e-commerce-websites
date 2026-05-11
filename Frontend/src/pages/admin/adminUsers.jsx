import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { MdBlock } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export function AdminUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users").then(
        (res) => {
          setUsers(res.data);
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <div className="overflow-x-auto h-full rounded-2xl relative">
        {isLoading ? (
          <Loading />
        ) : (
          <table className="w-full text-sm text-left whitespace-nowrap bg-white">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-5 font-semibold text-center rounded-tl-2xl">Picture</th>
                <th className="px-6 py-5 font-semibold text-center">Name</th>
                <th className="px-6 py-5 font-semibold text-center">Email</th>
                <th className="px-6 py-5 font-semibold text-center">Status</th>
                <th className="px-6 py-5 font-semibold text-center">Role</th>
                <th className="px-6 py-5 font-semibold text-center rounded-tr-2xl">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((items, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 flex items-center justify-center">
                      <img
                        src={items.img}
                        alt="User Avatar"
                        className="w-[50px] h-[50px] object-cover rounded-full border-2 border-gray-100 shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {items.firstName + " " + items.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{items.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${items.role === 'admin' ? 'border-purple-200 text-purple-700 bg-purple-50' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                        {items.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-3">
                        <button className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200" title="Block User">
                          <MdBlock className="text-lg" />
                        </button>
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200" title="Edit User">
                          <FaEdit className="text-lg" />
                        </button>
                        <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200" title="Delete User">
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}