import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Editor from "./components/Editor/Editor";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={["user", "editor", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={["editor", "admin"]}>
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}
