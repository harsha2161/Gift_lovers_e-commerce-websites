import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheck, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your actual backend call
    // axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews").then((res) => { ... })

    // Simulating backend data load
    setTimeout(() => {
      setReviews([
        { _id: "R1", productName: "Wireless Headphones", customerName: "Kamal Perera", rating: 5, comment: "Excellent bass and battery life!", date: "2023-10-26", status: "Approved" },
        { _id: "R2", productName: "Smart Watch", customerName: "Nimali Silva", rating: 4, comment: "Good watch, but the strap could be better.", date: "2023-10-25", status: "Pending" },
        { _id: "R3", productName: "Gaming Mouse", customerName: "Kasun Kalhara", rating: 2, comment: "Scroll wheel stopped working after a week.", date: "2023-10-24", status: "Pending" },
        { _id: "R4", productName: "Mechanical Keyboard", customerName: "Amila Fernando", rating: 5, comment: "Love the tactile feel. Very highly recommended.", date: "2023-10-22", status: "Approved" },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Helper function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex text-sm">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"} />
        ))}
      </div>
    );
  };

  // Mock function for approving a review
  const handleApprove = (id) => {
    // axios.put(...)
    toast.success("Review approved successfully");
    setReviews(reviews.map(rev => rev._id === id ? { ...rev, status: "Approved" } : rev));
  };

  // Mock function for deleting a review
  const handleDelete = (id) => {
    // axios.delete(...)
    if(window.confirm("Are you sure you want to delete this review?")) {
      toast.success("Review deleted");
      setReviews(reviews.filter(rev => rev._id !== id));
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative pb-6">
      
      {/* Header Section */}
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          Customer Reviews
        </h2>
        <p className="text-gray-500 mt-2 text-sm">Manage, approve, or remove feedback from your customers.</p>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-200 flex-1 relative">
        
        {!isLoading ? (
          <div className="overflow-x-auto h-full custom-scrollbar">
            <table className="w-full text-sm text-left whitespace-nowrap">
              
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-5">Product & Customer</th>
                  <th className="px-6 py-5">Rating</th>
                  <th className="px-6 py-5">Comment</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {reviews.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                    
                    {/* Product & Customer Details */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.productName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">by {item.customerName}</div>
                    </td>
                    
                    {/* Rating Stars */}
                    <td className="px-6 py-4">
                      {renderStars(item.rating)}
                    </td>
                    
                    {/* Comment (Truncated to prevent massive rows) */}
                    <td className="px-6 py-4">
                      <div className="max-w-[250px] truncate text-gray-600" title={item.comment}>
                        {item.comment}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {item.date}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}
                      `}>
                        {item.status}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-3">
                        
                        {/* Approve Button (Only show if pending) */}
                        {item.status === "Pending" && (
                          <button 
                            onClick={() => handleApprove(item._id)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="Approve Review"
                          >
                            <FaCheck className="text-lg" />
                          </button>
                        )}
                        
                        {/* Delete/Reject Button */}
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete Review"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {reviews.length === 0 && (
              <div className="w-full py-12 flex flex-col items-center justify-center text-gray-500">
                <FaStar className="text-4xl text-gray-300 mb-3" />
                <p>No reviews found.</p>
              </div>
            )}
          </div>
        ) : (
          /* Loading Spinner */
          <div className="w-full h-full flex justify-center items-center absolute inset-0 bg-white/80 z-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}