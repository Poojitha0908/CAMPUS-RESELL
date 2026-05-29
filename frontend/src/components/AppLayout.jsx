import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationDropdown from "./NotificationDropdown";
import useAuth from "../hooks/useAuth";
import Icon from "./ui/Icon";

const pageTitles = {
  "/": "Dashboard",
  "/add-product": "Add Product",
  "/my-products": "Products",
  "/wishlist": "Wishlist",
  "/chat": "Chats",
  "/profile": "Profile",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/reports": "Reports",
  "/admin/users": "Users",
};

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
];

const isPublicRoute =
  publicRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/product/") ||
  location.pathname.startsWith("/reset-password/");

  const toggleDarkMode = () => {
    setIsDark((value) => !value);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  if (isPublicRoute) {
  return (
    <div className="min-h-screen bg-primary-bg text-text-primary">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#071133] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-lg font-black text-white shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-lg font-black text-white">
                Campus Marketplace
              </h1>

              <p className="text-xs text-cyan-400/90 font-bold">
                Buy • Sell • Connect
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
              Home
            </Link>

            <a href="#products" className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
              Products
            </a>

            {user ? (
              <>
                <Link to="/profile" className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Profile
                </Link>
                <Link to="/my-products" className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  My Products
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-cyan-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

  const title = pageTitles[location.pathname] || (location.pathname.startsWith("/product/") ? "Product Details" : "Campus Resell");

  return (
    <div className="min-h-screen bg-primary-bg text-text-primary transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <div className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#071133] px-4 py-3 shadow-sm backdrop-blur-xl lg:px-8 transition-colors duration-300">
                    <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:bg-slate-800 lg:hidden"
                aria-label="Open sidebar"
              >
                <span className="block h-0.5 w-5 bg-current" />
                <span className="mt-1.5 block h-0.5 w-5 bg-current" />
                <span className="mt-1.5 block h-0.5 w-5 bg-current" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/90">Campus Resell Portal</p>
                <h1 className="truncate text-xl font-black text-white sm:text-2xl tracking-tight">{title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-indigo/50 active:scale-95"
                aria-label="Toggle dark mode"
              >
                <Icon name={isDark ? "sun" : "moon"} />
              </button>
              {user && <NotificationDropdown user={user} />}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
