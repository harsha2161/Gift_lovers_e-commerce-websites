import { createBrowserRouter } from "react-router-dom";

// Layouts
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import LogIn from "../pages/login";
import SignUp from "../pages/signup";
import ForgotPassword from "../pages/forgotPassword";

// Client Pages
import ClientHomePage from "../pages/client/clientHome";
import ClientProductPage from "../pages/client/clientProduct";
import ProductOverviewPage from "../pages/client/ProductOverview";
import ClientCart from "../pages/client/clientCart";
import ClientCheckout from "../pages/client/cllientCheckout";
import ClientPayment from "../pages/client/clientPayment";

// Admin Pages
import AdminDashboard from "../pages/admin/adminDashbourd";
import AdminProductPage from "../pages/admin/adminProduct";
import AdminReviewPage from "../pages/admin/adminreviews";
import { AdminOrder } from "../pages/admin/adminOrders";
import { AdminUser } from "../pages/admin/adminUsers";
import AddProductPage from "../pages/admin/addProductPage";
import EditProductPage from "../pages/admin/editProductPage";
import DeleteProduct from "../pages/admin/deleteProductPage";

//states pages
import PageNotFound from "../components/states/404 page not fount";
import ClientProfile from "../pages/client/clientProfile";

export const router = createBrowserRouter([
  // Auth & Standalone routes
  {
    path: "/login",
    element: <LogIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: "products",
        element: <AdminProductPage />
      },
      {
        path: "review",
        element: <AdminReviewPage />
      },
      {
        path: "order",
        element: <AdminOrder />
      },
      {
        path: "users",
        element: <AdminUser />
      },
      {
        path: "addproduct",
        element: <AddProductPage />
      },
      {
        path: "editProdute", 
        element: <EditProductPage />
      },
      {
        path: "deleteprodute",
        element: <DeleteProduct />
      }
    ]
  },

  // Client Routes
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ClientHomePage />
      },
      {
        path: "home",
        element: <ClientHomePage />
      },
      {
        path: "products",
        element: <ClientProductPage />
      },
      {
        path: "about",
        element: <h1>about</h1>
      },
      {
        path: "contacts",
        element: <h1>contacts</h1>
      },
      {
        path: "overview/:id",
        element: <ProductOverviewPage />
      },
      {
        path: "cart",
        element: <ClientCart />
      },
      {
        path: "checkout",
        element: <ClientCheckout />
      },
      {
        path: "payment",
        element: <ClientPayment />,
      },
      { path: "profile",
        element: <ClientProfile/>
      },
      {
        path: "*",
        element: <PageNotFound/>
      }
    ]
  }
]);
