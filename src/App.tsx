import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login.tsx";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Revenue from "./pages/Revenue";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Ads from "./pages/Ads.tsx";
import AdminPackagesPage from "./pages/Packages.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="posts" element={<Posts />} />
            <Route path="users" element={<Users />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
