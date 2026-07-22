import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ArrowLeft,
  Home,
  FileQuestion,
} from "lucide-react";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 Page Not Found | SmartPOS</title>
        <meta
          name="description"
          content="The requested page could not be found on SmartPOS."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-900 text-slate-100 select-none">
        <div className="max-w-2xl w-full text-center space-y-8 py-8 relative">
          {/* Decorative Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

          {/* 1. Large 404 Hero Illustration */}
          <div className="relative inline-block">
            {/* Big Glitch-style 404 text */}
            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-slate-700 via-slate-800 to-slate-950 tracking-widest font-mono">
              404
            </h1>

            {/* Floating Icon Badge in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-center animate-bounce">
              <FileQuestion className="w-10 h-10 text-sky-400" />
            </div>
          </div>

          {/* 2. Message Title & Description */}
          <div className="space-y-3 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Page Not Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Oops! The page you are looking for doesn't exist, was removed, or
              might belong to a different store branch.
            </p>
          </div>

          {/* 3. Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* 4. Helpful Quick Links Box */}
          <div className="pt-6 border-t border-slate-800/80 max-w-lg mx-auto">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Looking for something specific?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Link
                to="/sales/new"
                className="flex items-center gap-2.5 p-2.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-300 hover:text-sky-400 transition-all group"
              >
                <ShoppingCart className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">POS Terminal</span>
              </Link>

              <Link
                to="/products/all"
                className="flex items-center gap-2.5 p-2.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-300 hover:text-emerald-400 transition-all group"
              >
                <Package className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">Products</span>
              </Link>

              <Link
                to="/dashboard"
                className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-400 transition-all group"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">Dashboard</span>
              </Link>
            </div>
          </div>

          {/* System Footer Note */}
          <div className="text-[11px] text-slate-600 font-mono">
            SmartPOS Error Code:{" "}
            <span className="text-slate-500">HTTP_404_PAGE_NOT_FOUND</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
