import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
