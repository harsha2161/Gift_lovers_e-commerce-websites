import axios from "axios";
import { useEffect, useState } from "react"
import ProductsCard from "../../components/ProductsCards";
import Loading from "../../components/loading";

export default function ClientProductPage(){

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(
        () => {
             if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/").then(
                    (res) =>{
                        console.log(res.data)
                        setProducts(res.data)
                        setIsLoading(false)
                    }    
                )
                }
            }, [isLoading]
       
    )
   

  return (
  
    <div className="h-screen w-full flex flex-col items-center p-4">
     
     

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