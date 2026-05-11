import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function DeleteProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const productId = location.state.productId;

  async function deleteHadel() {
    if (navigate == null) {
      toast.error("Product not Found");
    }

    try {
      const response = await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId
      );
      toast.success("delete Successfull");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Delete failed");
      console.log(err);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white border border-red-100 shadow-2xl flex flex-col items-center justify-center rounded-2xl p-8 transform transition-all">
        
        {/* Warning Icon Graphic */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-red-100">
          <span className="text-4xl">⚠️</span>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 text-center">
          Delete Product?
        </h2>
        
        <p className="text-gray-500 text-center mt-3 mb-8 px-4 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-gray-800">#{productId}</span>? This action cannot be undone and will permanently remove it from your inventory.
        </p>

        <div className="flex w-full gap-4">
          <button
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            onClick={() => {
              navigate("/admin/products");
            }}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-colors duration-200"
            onClick={deleteHadel}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}