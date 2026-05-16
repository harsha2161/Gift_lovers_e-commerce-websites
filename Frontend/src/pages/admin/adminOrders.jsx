import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0", // Handled by Tailwind inside
    borderRadius: "16px",
    width: "100%",
    maxWidth: "800px",
    height: "700px",
  //  maxHeight: "90vh",
    overflowY: "auto",
    border: "none",
  //  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)",
    zIndex: 50,
  }
};

export function AdminOrder() {
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [status, setStatus] = useState("");

  function openModal(order) {
    setActiveOrder(order);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setActiveOrder(null);
  }

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        setIsLoading(false);
        return;
      }

      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setOrder(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Error fetching orders");
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
          <>
            {/* MODAL */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              ariaHideApp={false}
              style={customStyles}
            >
              {activeOrder && (
                <div className="flex flex-col bg-white">
                  {/* Modal Header */}
                  <div className="bg-gray-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-wide">
                      Order Details <span className="text-gray-400 text-lg ml-2">#{activeOrder.orderId}</span>
                    </h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                  </div>

                  <div className="p-8 flex flex-col gap-8">
                    {/* Top Grid: Customer & Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer Info */}
                      <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl">
                        <h3 className="font-bold text-blue-900 text-lg mb-4 border-b border-blue-200 pb-2">
                          Customer Info
                        </h3>
                        <div className="space-y-2 text-gray-700">
                          <p><span className="font-semibold text-gray-900 w-20 inline-block">Name:</span> {activeOrder.name}</p>
                          <p><span className="font-semibold text-gray-900 w-20 inline-block">Email:</span> {activeOrder.email}</p>
                          <p><span className="font-semibold text-gray-900 w-20 inline-block">Phone:</span> {activeOrder.phone}</p>
                          <p className="flex"><span className="font-semibold text-gray-900 w-20 inline-block flex-shrink-0">Address:</span> <span>{activeOrder.address}</span></p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-4 border-b border-gray-200 pb-2">
                            Order Summary
                          </h3>
                          <div className="space-y-3 text-gray-700">
                            <p>
                              <span className="font-semibold text-gray-900 w-20 inline-block">Date:</span>
                              {new Date(activeOrder.date).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 w-20">Status:</span>
                              <select
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer shadow-sm"
                                onChange={async (e) => {
                                  const updatedValue = e.target.value;
                                  try {
                                    const token = localStorage.getItem("token");
                                    await axios.put(
                                      import.meta.env.VITE_BACKEND_URL + "/api/order/" + activeOrder.orderId + "/" + updatedValue,
                                      {
                                        headers: {
                                          Authorization: "Bearer " + token,
                                        },
                                      }
                                    );
                                    toast.success("Status update successfully completed");
                                    setIsLoading(true);
                                    // Local state update logically left as original
                                    const updateOrder = { ...activeOrder, status: updatedValue };
                                  } catch (err) {
                                    toast.error("Status update failed");
                                    console.log(err);
                                  }
                                }}
                              >
                                <option selected disabled>{activeOrder.status}</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="return">Returns</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-2xl font-extrabold text-blue-600">
                            Total: Rs. {activeOrder.total?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Products List */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl mb-4">Purchased Items</h3>
                      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {activeOrder.orderProducts.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                          >
                            <img
                              src={item.productInfo.images}
                              alt="product"
                              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-800">
                                {item.productInfo.name}
                              </h4>
                              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                {item.productInfo.discription}
                              </p>
                              <div className="mt-2 text-gray-700 font-medium bg-gray-100 inline-block px-3 py-1 rounded-md text-sm">
                                Qty: {item.quantity}
                              </div>
                            </div>
                            <div className="font-bold text-lg text-gray-900 whitespace-nowrap">
                              Rs. {(item.productInfo.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end items-center gap-4 mt-4 pt-6 border-t border-gray-100">
                      <button
                        onClick={closeModal}
                        className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { window.print(); }}
                        className="px-6 py-2.5 bg-indigo-50 text-indigo-600 border border-indigo-200 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        Print Invoice
                      </button>
                      <button
                        onClick={() => { window.print(); }}
                        className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Modal>

            {/* MAIN TABLE */}
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="px-6 py-5 font-semibold text-center">Order ID</th>
                  <th className="px-6 py-5 font-semibold text-center">Name</th>
                  <th className="px-6 py-5 font-semibold text-center">Phone</th>
                  <th className="px-6 py-5 font-semibold text-center">Total</th>
                  <th className="px-6 py-5 font-semibold text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                    onClick={() => openModal(item)}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-600">#{item.orderId}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">{item.phone}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      Rs. {item.total?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-700'}`}>
                          {item.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}