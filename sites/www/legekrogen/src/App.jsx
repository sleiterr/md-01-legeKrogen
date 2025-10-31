import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Header from "./components/Header/Header";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProfileGuest from "./pages/ProfileGuest/ProfileGuest";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useLocalStorage("token", null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <Header token={token} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />

        <Route
          path="/profile-guest"
          element={
            <ProtectedRoute allowedRoles={["admin", "guest"]}>
              <ProfileGuest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}

export default App;
