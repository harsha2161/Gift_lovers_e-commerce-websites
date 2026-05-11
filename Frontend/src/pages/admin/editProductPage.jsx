import axios from "axios";
import { useState } from "react";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProductPage() {
  const location = useLocation();

  // using use state hook to save input details to variable
  const [productId, setProductId] = useState(location.state.productId);
  const [productName, setProductName] = useState(location.state.productName);
  const [altname, setAltname] = useState(location.state.altName.join(",")); // using join command
  const [description, setDescription] = useState(location.state.description);
  const [lablePrice, setLablePrice] = useState(location.state.lablePrice);
  const [stokes, setStokes] = useState(location.state.stoke);
  const [image, setImage] = useState([]);

  // react hooks for navigate page and read a transfer data
  const navigate = useNavigate();

  console.log(location);

  async function UpdateProduct() {
    // get token in local storage and check and sent error msg
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("please login first");
    }

    let imagesUrls = location.state.img; 
    const promisesArray = []; // make arr for store the all images links

    // read image fill arr and upload images to database and save links to imagesUrl
    for (let i = 0; i < image.length; i++) {
      promisesArray[i] = mediaUpload(image[i]);
    }

    try {
      if (image.length > 0) {
        imagesUrls = await Promise.all(promisesArray); 
        console.log(imagesUrls);
      }

      const altNamesArray = altname.split(","); // divide by array and save words to array

      // make products json to send to backend
      const products = {
        productId: productId,
        productName: productName,
        altName: altNamesArray,
        description: description,
        stoke: stokes,
        img: imagesUrls,
        lablePrice: lablePrice,
      };

      // call to backend with product details
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
          products,
          {
            headers: {
              Authorization: "Bearer " + token, 
            },
          }
        )
        .then((res) => {
          toast.success("Product Updated Successfully");
          navigate("/admin/products");
        });
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "An error occurred");
    }
  }

  return (
    // Centered layout matching the dashboard aesthetic
    <div className="w-full h-full overflow-y-auto flex justify-center pb-10 custom-scrollbar">
      <div className="w-full max-w-4xl h-max">
        
        {/* Header Section */}
        <div className="mb-8 border-b border-gray-100 pb-5">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide flex justify-between items-center">
            Edit Product
            <span className="text-sm font-semibold bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              Editing #{productId}
            </span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Update the details for the selected product below.</p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-6">
          
          {/* Product ID & Product Name (Grid Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Product ID</label>
              <input
                disabled // Cannot edit product ID
                type="text"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed shadow-inner transition-all duration-200 focus:outline-none"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>
          </div>

          {/* Alt Names */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Alt Names <span className="text-gray-400 font-normal text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              onChange={(e) => setAltname(e.target.value)}
              value={altname}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows="4"
              className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Price & Stock (Grid Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Label Price (Rs)</label>
              <input
                type="number"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setLablePrice(e.target.value)}
                value={lablePrice}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Stock Available</label>
              <input
                type="number"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setStokes(e.target.value)}
                value={stokes}
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Update Images <span className="text-gray-400 font-normal text-xs">(optional - leaves old images if empty)</span>
            </label>
            <div className="mt-2 flex justify-center px-6 pt-6 pb-8 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer relative group">
              <div className="space-y-2 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                    Click to upload new files
                  </span>
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      setImage(e.target.files);
                      console.log(e.target.files);
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                
                {/* File selection indicator */}
                {image.length > 0 && (
                  <div className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-lg border border-green-200">
                    {image.length} new file(s) selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100 mt-2">
            <button
              onClick={UpdateProduct}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-lg"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}