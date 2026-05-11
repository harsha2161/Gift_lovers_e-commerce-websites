import { useLocation } from "react-router-dom"

export default function ClientOrderProduct(){
    
    const location = useLocation()
    const product = location.state

    return (

        <div className="w-full h-screen  flex  items-center justify-center">
            <div className=" w-[1000px] h-[500px] shadow-2xl border-2 ">
                <img src={product.img} alt="product picture" className="w-[200px] h-[150px] object-center "/>
                <div className="h-[500px] w-[calc(100%-500px)] border-r-0">
                    <button className="bg-green-600 border pointer-coarse m-5">Order now</button>
                </div>
            </div>
        </div>
       
    )
}