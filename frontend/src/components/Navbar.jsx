import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#071133] px-6 py-3 flex justify-between items-center backdrop-blur-xl">
  
  <Link to="/" className="text-xl font-black text-cyan-400">
    Campus Resell
  </Link>

  <div className="flex items-center gap-4">

    <Link to="/" className="text-slate-200 hover:text-cyan-400 transition">
      Home
    </Link>

    {user ? (
      <>
        <Link to="/add-product">Add Product</Link>
        <Link to="/my-products" className="text-blue-500">My Products</Link>
        <Link to="/wishlist" className="hover:text-blue-500">Wishlist</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/profile">Profile</Link>

        {/* 🔔 Notifications */}
        <NotificationDropdown user={user} />

        {user.isAdmin && (
          <>
            <Link to="/admin/dashboard" className="hover:text-blue-500 font-bold text-indigo-600">Admin Dashboard</Link>
            <Link to="/admin/reports">Admin Reports</Link>
            <Link to="/admin/users">Admin Users</Link>
          </>
        )}

        {/* ✅ SINGLE Avatar ONLY */}
        <Link to="/profile">
          {user?.avatar ? (
            <img
              src={`http://localhost:5000/${user.avatar}`}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border cursor-pointer"
            />
          ) : (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-accent-indigo to-indigo-400 text-xs font-black text-white shadow-md shadow-indigo-500/20 border border-indigo-500/20 select-none uppercase cursor-pointer">
              {(user?.name?.[0] || "U")}
            </span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}

  </div>
</nav>
  );
};

export default Navbar;