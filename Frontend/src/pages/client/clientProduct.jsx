import axios from "axios";
import { useEffect, useState } from "react";
import ProductsCard from "../../components/ProductsCards";
import ProductSkeleton from "../../components/ProductSkeleton";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Loading from "../../components/loading";

export default function ClientProductPage() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {

    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((res) => {
        setProducts(res.data);

      }).catch((err) => {
        console.error("Error fetching products:", err);

      }).finally(() => {
        setIsLoading(false);
      })
  },[isLoading]);

  const filteredProducts = products.filter((product) => {
      if (!query) return true;
      const searchLower = query.toLowerCase();
      return (
        product.productName?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) 
      );
    }).sort((a, b) => {
      if (sortOrder === "asc") return a.lablePrice - b.lablePrice;
      if (sortOrder === "desc") return b.lablePrice - a.lablePrice;
      return 0;
    });

  return (
    <div className="min-h-screen w-full bg-bgcolor1 flex flex-col items-center pb-12">
    
    {/*top section*/}  
      <div className="w-full bg-bgcolor2  text-white py-16 px-4 md:px-8 shadow-inner relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Discover Our Collection</h1>
          <p className="text-emerald-100 max-w-2xl text-lg mb-4"> Explore our curated selection of premium
          products tailored just for you. Find exactly what you're looking for with ease.</p>

          {/*Search and Filter*/}
          <div className="flex flex-col sm:flex-row gap-2 w-auto max-w-4xl mx-auto p-2 bg-white text-black rounded-2xl">
  
            {/* Search Bar Container */}
            <div className="relative flex items-center flex-1">
              <div className="absolute left-3 flex items-center">
                <FaSearch className="text-black" />
              </div>

              <input type="text" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 bg-white focus:outline-none placeholder-gray-500 rounded-2xl"/>
            </div>

            {/* Filter Bar Container */}
            <div className="w-full sm:w-48"> 
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
              className="w-full h-full px-3 py-2 bg-white border border-black rounded-2xl outline-none cursor-pointer">
                  <option value="none" selected >Sort by Price</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
              </select>
            </div>

          </div>

        </div>
      </div>

    {/*Products Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
       
        {!isLoading && (
          <div className="mb-6 flex justify-between items-center">

            <h2 className="text-2xl font-bold text-gray-800"> {query ? `Search Results for "${query}"` : "All Products"}</h2>
            <span className="text-gray-500 font-medium bg-gray-200 px-3 py-1 rounded-full text-sm">{filteredProducts.length}items</span>
          
          </div>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 place-items-center">
          {isLoading ? (
           <div>
            
           </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductsCard key={item.productId} product={item} />
            ))
          ) : (
            
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md"> We couldn't find anything matching "{query}". Try adjusting your search terms or filters.</p>
              
              <button className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
              onClick={() => setQuery("")} >Clear Search</button>
           
            </div>
          )}

        </div>
      </div>
    </div>
  );
}