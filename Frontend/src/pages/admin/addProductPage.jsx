import axios from "axios";
import { useState } from "react";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  // using use state hook to save input details to variable
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [altname, setAltname] = useState("");
  const [description, setDescription] = useState("");
  const [lablePrice, setLablePrice] = useState("0");
  const [stokes, setStokes] = useState("0");
  const [image, setImage] = useState([]);

  const navigate = useNavigate();

  async function AddProduct() {
    // get token in local storage and check and sent error msg
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("please login first");
    }
    // check image added or nor added
    if (image.length <= 0) {
      toast.error("pleace add one or more images");
      return;
    }
    // make arr for store the all images links
    const promisesArray = [];

    // read image fill arr and upload images to database and save links to imagesUrl
    for (let i = 0; i < image.length; i++) {
      promisesArray[i] = mediaUpload(image[i]);
    }

    try {
      const imagesUrls = await Promise.all(promisesArray).then();
      console.log(imagesUrls);

      const altNamesArray = altname.split(","); // devide by array and save words to arry

      // make products json and after using to backend call and attact sent to backend (line 54)
      const products = {
        productId: productId,
        productName: productName,
        altName: altNamesArray,
        description: description,
        stoke: stokes,
        img: imagesUrls,
        lablePrice: lablePrice,
      };
      // call to back end with product detiles json attact to sent backend
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/product/addProduct", products, {
          headers: {
            Authorization: "Bearer " + token, // added Bearer word to token, there  for need to back end try remove to Bearer word
          },
        })
        .then((res) => {
          toast.success("Products added Successfully");
          navigate("/admin/products");
        });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 flex justify-center py-10 px-6 custom-scrollbar">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-gray-100 p-8 h-max">
        <div className="mb-8 border-b border-gray-100 pb-5">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            Add New Product
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Fill in the details below to add a new item to your inventory.</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Product ID & Product Name (Grid Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Product ID</label>
              <input
                type="text"
                placeholder="P954"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                placeholder="Bluetooth Mouse"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>
          </div>

          {/* Alt Names */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Alt Names <span className="text-gray-400 font-normal text-xs">(comma separated)</span></label>
            <input
              type="text"
              placeholder="mouse, wireless mouse, tech"
              className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={(e) => setAltname(e.target.value)}
              value={altname}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows="3"
              placeholder="Enter product description here..."
              className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
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
                placeholder="30000"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setLablePrice(e.target.value)}
                value={lablePrice}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Stock</label>
              <input
                type="number"
                placeholder="45"
                className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setStokes(e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Upload Images</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer relative">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    Upload files
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
                {image.length > 0 && <p className="text-sm font-bold text-green-600 mt-2">{image.length} file(s) selected</p>}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={AddProduct}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}