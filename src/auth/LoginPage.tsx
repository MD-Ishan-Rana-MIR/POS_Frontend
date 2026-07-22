import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
  AlertCircle,
} from "lucide-react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // UI Flow States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Client-Side Validation
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    // Simulate Auth API Request
    setTimeout(() => {
      setIsLoading(false);
      // Example demo validation
      if (email === "demo@smartpos.com" && password === "password123") {
        navigate("/dashboard");
      } else {
        // Simple demo credentials prompt for quick testing
        setErrorMessage(
          "Invalid credentials. Use demo@smartpos.com / password123",
        );
      }
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Login | SmartPOS System</title>
        <meta
          name="description"
          content="Access your SmartPOS terminal dashboard to manage sales, inventory, and analytics."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-slate-950 flex font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
        {/* ================= LEFT COLUMN: Branding & Showcase ================= */}
        <div className="hidden lg:flex flex-1 relative bg-slate-900 border-r border-slate-800/80 p-12 flex-col justify-between overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-600 to-sky-400 rounded-xl shadow-lg shadow-sky-500/20">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Smart<span className="text-sky-400">POS</span>
            </span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-md space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Grade Security</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Manage sales, stock, and customers in real time.
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed">
              Streamline your retail operations with accurate real-time
              inventory tracking, lightning-fast counter checkout, and
              comprehensive sales reporting.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2">
              {[
                "Lightning-fast offline & online sync",
                "Integrated payment gateway processing",
                "Automated low-stock inventory alerts",
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-300 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-xs text-slate-400">
            © {new Date().getFullYear()} SmartPOS System Inc. All rights
            reserved.
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Interactive Login Form ================= */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="p-2 bg-sky-500 rounded-lg">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Smart<span className="text-sky-400">POS</span>
            </span>
          </div>

          <div className="w-full max-w-sm space-y-7">
            {/* Header Text */}
            <div className="space-y-1.5 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-400">
                Welcome back! Please enter your credentials to continue.
              </p>
            </div>

            {/* Error Alert Box */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950 rounded-sm cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                    Remember me for 30 days
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 px-4 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:opacity-60 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/80" />
              </div>
              <span className="relative px-3 bg-slate-950 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Quick Demo Helper Hint */}
            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 text-center">
              Demo Credentials:{" "}
              <span className="font-mono text-sky-400">demo@smartpos.com</span>{" "}
              / <span className="font-mono text-sky-400">password123</span>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
