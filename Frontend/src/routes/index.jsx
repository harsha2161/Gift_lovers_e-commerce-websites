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
import ClientSearchProductPage from "../pages/client/clientSearchProducts";

// Admin Pages
import AdminDashboard from "../pages/admin/adminDashbourd";
import AdminProductPage from "../pages/admin/adminProduct";
import AdminReviewPage from "../pages/admin/adminreviews";
import { AdminOrder } from "../pages/admin/adminOrders";
import { AdminUser } from "../pages/admin/adminUsers";
import AddProductPage from "../pages/admin/addProductPage";
import EditProductPage from "../pages/admin/editProductPage";
import DeleteProduct from "../pages/admin/deleteProductPage";

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
        path: "editProdute", // Intentionally keeping the typo to match existing links if any
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
        path: "search",
        element: <ClientSearchProductPage />
      },
      {
        path: "*",
        element: <h1>404 not found</h1>
      }
    ]
  }
]);
