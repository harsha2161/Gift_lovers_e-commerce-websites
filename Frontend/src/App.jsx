import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "./routes";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
