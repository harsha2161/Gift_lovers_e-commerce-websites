
import { useLocation } from "react-router-dom";
import Loading from "../../components/loading";

export default function ClientProfile(){

   const location = useLocation()
    
   const user = location.state
   

    return(
        <div className="h-min-screen w-full flex items-center justify-center">
            <div className="h-screen w-[70%] shadow-2xl flex-col flex items-center">
                 <img src={user.img} alt="profile pic" className="h-50 rounded-full object-cover m-4" />

            </div>

           
        </div>
    )
}