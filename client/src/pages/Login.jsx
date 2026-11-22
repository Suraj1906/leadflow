
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Workflow,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ChartNoAxesCombined,
  Users,
  Zap,
  Sparkles,
  CheckCircle2,
  Fingerprint,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: Users,
    title: "Lead Management",
    desc: "Keep every opportunity organized",
    color: "text-sky-300",
    bg: "bg-sky-400/10",
    border: "border-sky-400/15",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Smart Analytics",
    desc: "Make decisions with confidence",
    color: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/15",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workspace",
    desc: "Your business data stays protected",
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/15",
  },
  {
    icon: Zap,
    title: "Faster Workflow",
    desc: "Spend more time growing your business",
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/15",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      await login(formData);
      toast.success("Welcome back to LeadFlow!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#F7FAFC]">

      {/* LEFT BRANDING PANEL */}
      <section className="relative hidden min-h-screen w-[49%] flex-col justify-between overflow-hidden bg-[#08182D] p-10 lg:flex xl:p-14 2xl:p-16">

        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[110px]" />

          <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[120px]" />

          <div className="absolute left-[35%] top-[40%] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[110px]" />

          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#10294A]/30 via-transparent to-[#061222]/50" />
        </div>

        {/* Decorative Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -right-40 top-[18%] h-[430px] w-[430px] rounded-full border border-white/[0.07]"
        >
          <div className="absolute left-20 top-8 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22D3EE]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -right-24 top-[23%] h-[300px] w-[300px] rounded-full border border-dashed border-blue-300/10"
        />

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-500 shadow-[0_8px_25px_rgba(37,99,235,0.35)]">
            <Workflow size={26} strokeWidth={2.3} className="text-white" />

            <div className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#08182D] bg-cyan-300" />
          </div>

          <div>
            <h2 className="text-[27px] font-extrabold tracking-[-1px] text-white">
              Lead<span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">Flow</span>
            </h2>

            <p className="mt-[-3px] text-[10px] font-semibold uppercase tracking-[2.5px] text-blue-200/60">
              Smart CRM Platform
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 my-12 max-w-[590px]">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-sky-300/20 bg-sky-300/[0.08] px-4 py-2.5 text-[13px] font-semibold text-sky-200 shadow-lg shadow-blue-950/10 backdrop-blur-xl"
          >
            <Sparkles size={16} className="text-cyan-300" />
            Your smarter CRM workspace

            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67E8F9]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="text-[43px] font-extrabold leading-[1.17] tracking-[-1.8px] text-white xl:text-[53px] 2xl:text-[59px]"
          >
            Turn every lead into your next{" "}
            <span className="relative inline-block bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              big opportunity.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-sky-400 to-cyan-300"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 max-w-[490px] text-[16px] leading-[1.9] text-slate-300/75 xl:text-[18px]"
          >
            Organize your pipeline, build meaningful relationships and grow
            your business with one powerful workspace designed to move you
            forward.
          </motion.p>

          {/* Feature Cards */}
          <div className="mt-11 grid grid-cols-2 gap-3.5">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                  }}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                  className={`group flex items-start gap-3.5 rounded-2xl border ${item.border} bg-white/[0.045] p-4 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300 xl:p-5`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-white xl:text-[15px]">
                      {item.title}
                    </p>

                    <p className="mt-1.5 text-[12px] leading-5 text-slate-400 xl:text-[13px]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["S", "A", "R", "M"].map((letter, index) => (
                <div
                  key={letter}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#10213A] text-[11px] font-bold text-white ${
                    [
                      "bg-blue-500",
                      "bg-cyan-600",
                      "bg-indigo-500",
                      "bg-emerald-600",
                    ][index]
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>

            <p className="text-[12px] font-medium text-slate-400">
              One workspace. Better relationships. Smarter growth.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-[12px] font-medium text-slate-500">
            © 2026 LeadFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[12px] font-medium text-slate-400">
            <ShieldCheck size={15} className="text-emerald-400" />
            Secure workspace
          </div>
        </div>
      </section>

      {/* RIGHT LOGIN SECTION */}
      <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

        {/* Light Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-sky-100/70 blur-[100px]" />

          <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-100/60 blur-[100px]" />

          <div className="absolute right-[15%] top-[45%] h-56 w-56 rounded-full bg-cyan-100/40 blur-[90px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[470px]"
        >

          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center gap-3 lg:hidden"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
              <Workflow size={25} className="text-white" />
            </div>

            <div>
              <h2 className="text-[26px] font-extrabold tracking-tight text-slate-900">
                Lead<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Flow</span>
              </h2>

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
                Smart CRM Platform
              </p>
            </div>
          </motion.div>

          {/* Form Header */}
          <div className="mb-9">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-[12px] font-bold uppercase tracking-[1.5px] text-blue-700">
              <Sparkles size={15} />
              Welcome Back
            </div>

            <h2 className="text-[34px] font-extrabold leading-tight tracking-[-1.3px] text-slate-900 sm:text-[40px]">
              Sign in to your{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                account.
              </span>
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-slate-500 sm:text-[16px]">
              Welcome back! Enter your details to access your workspace.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="space-y-2.5">
              <label className="block text-[15px] font-bold text-slate-700">
                Email address
              </label>

              <div className="group relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-[58px] w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-4 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <label className="text-[15px] font-bold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>

              <div className="group relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-[58px] w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-12 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="group flex w-fit cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-[17px] w-[17px] cursor-pointer rounded border-slate-300 accent-blue-600 transition-all"
              />

              <span className="text-[14px] font-medium text-slate-500 transition-colors group-hover:text-slate-700">
                Remember me
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { y: -3, scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="group relative flex h-[59px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-[16px] font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.23)] transition-all duration-300 hover:shadow-[0_14px_30px_rgba(37,99,235,0.34)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                {loading ? "Signing in..." : "Sign in to workspace"}
              </span>

              {!loading && (
                <ArrowRight
                  size={20}
                  className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                />
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-9 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="mx-4 text-[11px] font-bold tracking-[1.7px] text-slate-400">
              NEW TO LEADFLOW?
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Signup Link */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
            <p className="text-[15px] font-medium text-slate-500">
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="mt-2 inline-flex items-center gap-2 text-[16px] font-extrabold text-blue-700 transition-all duration-200 hover:gap-3 hover:text-cyan-700"
            >
              Create an account
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Security Footer */}
          <div className="mt-9 flex items-center justify-center gap-2.5 text-[13px] font-medium text-slate-400">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Fingerprint size={17} />
            </div>

            Protected by secure authentication
          </div>

        </motion.div>
      </section>
    </div>
  );
};

export default Login;
