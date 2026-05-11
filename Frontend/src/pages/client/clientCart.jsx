import { useState } from "react"
import { addCart, clearCart, getCart, removeFromCart ,getTotle} from "../../utils/cart"
import { FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function ClientCart(){
  
    const [cart, setCart] = useState(getCart())

    return(
        <div className="w-full h-full flex justify-center items-center flex-row ">
            <div className="w-[50%] h-full flex-col flex items-center overflow-auto">
            {
                cart.map(
                    (item) => {
                        return(
                            
                            <div key={item.productId} className="w-[600px] h-[100px] bg-primary shadow-2xl flex flex-row rounded-2xl m-2 flex items-center ove">
                                <img src={item.img} alt="pic" className="w-[100px] h-[100px] rounded-2xl ojbect-cover"/>

                                <div className="w-[300px] p-2 flex-col flex  font-bold">
                                    <h1>{item.productName}</h1>
                                    <h1>Rs: {item.lablePrice}</h1>
                                </div>
                                
                                <div className="flex justify-center items-center"> 
                                    <div className="bg-primary w-[120px] h-[45px] rounded-2xl shadow-lg flex items-center justify-between p-2">        
                                        <button className="w-8 h-8 flex items-center justify-center bg-amber-200 hover:bg-amber-300 rounded-full text-lg font-bold transition" onClick={
                                            () => {
                                                addCart(item, 1)
                                                setCart(getCart())
                                            }
                                        }>+</button>
                                        <h1 className="text-lg font-semibold ">{item.qty}</h1>
                                        <button className="w-8 h-8 flex items-center justify-center bg-amber-200 hover:bg-amber-300 rounded-full text-lg font-bold transition" onClick={
                                            () => {
                                                addCart(item, -1)
                                                setCart(getCart())
                                            }
                                        }>-</button>
                                    </div>
                                </div>
                                
                                <h1 className="p-8">Price Rs: {item.qty * item.lablePrice}</h1>
                                <button className=" hover:bg-red-600 rext-white rounded-full p-2" onClick={
                                    () => {
                                        removeFromCart(item.productId)
                                        setCart(getCart())
                                    }
                                }><FaTrashAlt/></button>  

                            </div>
                            
                        )
                    }
                )
            }
            
            </div>

          <div className="h-full w-[50%] flex justify-center items-center bg-gray-100">
            <div className="w-[400px] bg-white shadow-2xl rounded-lg p-6">

                    <h1 className="text-2xl font-semibold mb-6">Order Summary</h1>

                    <div className="space-y-3 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal (0 items)</span>
                            <span>Rs. {getTotle()}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>Rs. 0</span>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 text-lg">
                        <span>Total</span>
                        <span className="text-orange-500">Rs. {getTotle()}</span>
                    </div>
                    <Link to="/checkout" state={
                        {
                            cart : cart
                        }
                        }><button className="w-full mt-6 bg-orange-500 text-white py-3 rounded hover:bg-orange-600 font-semibold">PROCEED TO CHECKOUT</button>
                    
                    </Link>
                    
            </div>

        </div>        
</div>
        
    )
}
