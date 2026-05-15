import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function PageNotFound(){

    const navigate = useNavigate()

    function navigateHome(){
        navigate("/home")
    }
    return(
         <div className="min-h-screen w-full flex justify-center items-center">
            <div className="h-[300px] w-[500px] flex-col flex justify-center items-center bg-bgcolor1 border-accent rounded-2xl gap-7 shadow-2xl">
                <h1 className="font-bold text-3xl  pb-4"> <span>404</span> Page Not Found</h1>
                <ImCross className="text-red-600 text-5xl"/>
                <button onClick={navigateHome} className="bg-bgcolor2 p-4 rounded-2xl text-bgcolor1 font-bold text-2xl">
                    Back To Home  
                </button>
            </div>
         </div>
       
    )
}