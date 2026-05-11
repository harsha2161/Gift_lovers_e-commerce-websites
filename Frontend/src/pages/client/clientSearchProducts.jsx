import axios from "axios";
import { useState } from "react"
import ProductsCard from "../../components/ProductsCards";
import Loading from "../../components/loading";

export default function ClientSearchProductPage(){

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");


  return (
  
    <div className="h-full w-full flex flex-col items-center p-4">
        <input type="text" value={query} name="search" placeholder="Search for products" className="h-[50px] w-[400px] m-2 p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200" onChange={
         
          async (e)=>{
            setQuery(e.target.value)
            setIsLoading(true)
            if(query.length = 0)
            try{
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/search/"+e.target.value)
            setProducts(response.data)
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
          }
        }/>  
     

      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5">
       {
       isLoading ? (
       <Loading/>
        ) : (
        <>
           {
           products.map(
            (item) => (
              <ProductsCard key={item.productId} product={item} />
              )
            )
          }
        </>

          )
        
      }
       

      </div>
    </div>
 
 
        
);
                 
    
    
}