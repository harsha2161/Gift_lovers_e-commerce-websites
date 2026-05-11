import { Link, useNavigate } from "react-router-dom"

export default function ProductsCard(props){

    const product = props.product
    const navigate = useNavigate()
   
    return (
      <Link to={"/overview/"+product.productId} className="h-[380px] w-[300px] bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden my-3">

            <img src={product.img[0]} alt="product" className="h-[240px] w-full object-cover"/>
                
            <div className="p-4 flex flex-col gap-3">
                
                <h2 className="text-lg font-semibold text-green-800">{product.productName}</h2>
                
                <div className="flex items-center justify-between">
                   
                    <h1 className="text-green-700 font-bold text-lg">Rs: {product.lablePrice}</h1>
                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg shadow hover:bg-green-700 hover:scale-105 transition" >Buy Now</button>
                        
                </div>
                
                
            </div>
            
    </Link>
    )
}