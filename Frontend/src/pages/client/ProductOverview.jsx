import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider"
import Loading from "../../components/loading"
import { addCart, clearCart, getCart, removeFromCart } from "../../utils/cart"

export default function ProductOverviewPage(){

    const params = useParams()
   
    const productId = params.id
    const [status, setStatus] = useState("loading")  // loading succes , error
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    useEffect(
            () => {
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId).then(
                    (responce) => {
                        console.log(responce.data)
                        setProduct(responce.data)
                        setStatus("success")
                        
                    }
                ).catch(
                    (error) => {
                        console.log(Response)
                        setStatus("error")
                        toast.error("Error Fetching Produuct detials")
                    }
                )
            }
    ,[])

    return (
        <>
        {
        status == "success" && (
          
            <div className="h-full w-full flex flex-col md:flex-row md:flex items-center border">
            <h1 className="w-full md:hidden text-center text-4xl font-semibold my-10">{product.productName} </h1>

                <div className="w-full md:w-[50%] h-[600px] flex items-cener justify-center md:items-center shadow-2xl">
                <ImageSlider images={product.img} />
                </div>

                <div className="w-[full] md:w-[50%] h-full flex justify-center items-center">
                   <div className="w-500px h-[600px] flex flex-col items-center text-4xl font-semibold">
                        <h1 className="w-full hidden md:block text-center ">{product.productName}
                            {
                                product.altName.map((altName,index) => {
                                    return(
                                        <span key={index} className="text-3xl text-accent2 "> { "|"+ altName}</span>
                                    )
                                })
                             }
                             </h1>

                             <h1 className="w-full text-center my-2 text-sm text-gray-600 font-semibold">{product.productId}</h1>
                             <p className="w-full text-center my-2 font-semibold text-xl">{product.description}</p>
                             <p className="w-full text-center my-2 font-bold text-2xl"> Price Rs: {product.lablePrice.toFixed(2)}</p>

                            <div className="w-[400px] h-[270px] flex justify-center items-center gap-2 shadow-2xl">
                                <button className="bg-accent rounded-2xl  p-2 cursor-pointer text-primary" onClick={
                                   () => {
                                    addCart(product, 1)
                                    console.log(getCart())
                                   }
                                    }
                                >Add Cart</button>
                                <button className="bg-accent rounded-2xl  p-2 cursor-pointer text-secondary" onClick={
                                    () => {
                                        navigate("/checkout", {
                                            state : {
                                                cart : [
                                                     {
                                                    productId : product.productId,
                                                    productName : product.productName,
                                                    img : product.img[0],
                                                    lablePrice : product.lablePrice,
                                                    qty : 1,
                                                    }   
                                                ]
                                            }
                                        })
                                    }
                                }>Buy Now</button>
                            </div>
                   </div>
                </div>

            </div>
              
                )}

        {
            status == "loading" && <Loading />
        }

        {
            status == "error" && <h1>{toast.error("some error ")}</h1>
        }



        </>
        

        )   
}