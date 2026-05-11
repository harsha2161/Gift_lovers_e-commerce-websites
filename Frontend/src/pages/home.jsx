import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ClientProductPage from "./client/clientProduct";
import ProductOverviewPage from "./client/ProductOverview";
import ClientCart from "./client/clientCart";
import ClientCheckout from "./client/cllientCheckout";
import Footer from "../components/Footer";
import ClientSearchProductPage from "./client/clientSearchProducts";
import ClientHomePage from "./client/clientHome";



export default function Home(){
    
   return(
    
    <div className="w-full h-full flex flex-col items-center">
        <div className="w-full h-[full]  items-cter">
            <Header/>
            <Routes path="/*">
                <Route path="/home" element={<ClientHomePage/>} />
                <Route path="/products" element={<ClientProductPage/>} />
                <Route path="/about" element={<h1>about</h1>} />
                <Route path="/contacts" element={<h1>contscts</h1>} />
                <Route path="/overview/:id" element={<ProductOverviewPage/>} />
                <Route path="/cart" element={<ClientCart/>} />
                <Route path="/checkout" element={<ClientCheckout/>} />
                <Route path="/search" element={<ClientSearchProductPage/>} />
                <Route path="/*" element={<h1>404 not found</h1>} />
            </Routes>
        </div>
       <Footer/>
    </div>
    
   )
}