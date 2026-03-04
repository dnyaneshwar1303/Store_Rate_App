import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";


function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">Store Rating App</h1>
        <div className="space-x-4">
          <Link 
            to="/signup" 
            className="hover:text-purple-400 transition duration-300"
          >
            Signup
          </Link>

          <Link 
            to="/login" 
            className="hover:text-blue-400 transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;