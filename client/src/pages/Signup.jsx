
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Workflow,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Users,
  ChartNoAxesCombined,
  CheckCircle2,
  Sparkles,
  Fingerprint,
  Zap,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: Users,
    title: "Organize every lead",
    desc: "Keep all your prospects in one place.",
    color: "text-sky-300",
    bg: "bg-sky-400/10",
    border: "border-sky-400/15",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Understand your growth",
    desc: "Make smarter decisions with clear insights.",
    color: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/15",
  },
  {
    icon: ShieldCheck,
    title: "Work with confidence",
    desc: "Your workspace stays protected.",
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/15",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (name.trim().length < 2) {
      return toast.error("Name must contain at least 2 characters");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      toast.success("Your account has been created!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    }
  };

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const passwordsMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#F7FAFC]">

      {/* LEFT BRANDING PANEL */}
      <section className="relative hidden min-h-screen w-[49%] flex-col justify-between overflow-hidden bg-[#08182D] p-10 lg:flex xl:p-14 2xl:p-16">

        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[110px]" />

          <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[120px]" />

          <div className="absolute left-[35%] top-[40%] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[110px]" />

          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#10294A]/30 via-transparent to-[#061222]/50" />
        </div>

        {/* Animated Rings */}
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

        {/* Logo */}
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
            Start your journey today

            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67E8F9]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="text-[43px] font-extrabold leading-[1.17] tracking-[-1.8px] text-white xl:text-[53px] 2xl:text-[59px]"
          >
            Everything your business needs to{" "}
            <span className="relative inline-block bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              grow smarter.
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
            Bring your leads, pipeline and customer relationships together.
            Build a stronger business with one powerful workspace.
          </motion.p>

          {/* Feature Cards */}
          <div className="mt-11 space-y-3.5">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                  }}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                  className={`group flex items-center gap-4 rounded-2xl border ${item.border} bg-white/[0.045] p-4 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300 xl:p-5`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-[15px] font-bold text-white xl:text-[16px]">
                      {item.title}
                    </p>

                    <p className="mt-1.5 text-[13px] text-slate-400 xl:text-[14px]">
                      {item.desc}
                    </p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="ml-auto text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-300">
              <Zap size={19} />
            </div>

            <p className="text-[13px] font-medium text-slate-400">
              Everything you need to manage your business in one place.
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

      {/* RIGHT SIGNUP SECTION */}
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
          className="relative z-10 w-full max-w-[470px] py-3"
        >

          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-9 flex items-center gap-3 lg:hidden"
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
          <div className="mb-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-[12px] font-bold uppercase tracking-[1.5px] text-blue-700">
              <Sparkles size={15} />
              Get Started For Free
            </div>

            <h2 className="text-[34px] font-extrabold leading-tight tracking-[-1.3px] text-slate-900 sm:text-[40px]">
              Create your{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                account.
              </span>
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-slate-500 sm:text-[16px]">
              Set up your workspace and start growing your business.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-[18px]">

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-slate-700 sm:text-[15px]">
                Full name
              </label>

              <div className="group relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-[55px] w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-4 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-slate-700 sm:text-[15px]">
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
                  className="h-[55px] w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-4 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-slate-700 sm:text-[15px]">
                Password
              </label>

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
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  className="h-[55px] w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-12 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <p className="flex items-center gap-1.5 pl-1 text-[12px] font-medium text-slate-400">
                <ShieldCheck size={14} className="text-emerald-600" />
                Use at least 8 characters for your password.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-slate-700 sm:text-[15px]">
                Confirm password
              </label>

              <div className="group relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`h-[55px] w-full rounded-xl border bg-white/80 pl-12 pr-12 text-[15px] font-medium text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 ${
                    passwordsMatch
                      ? "border-emerald-400 focus:border-emerald-500 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.08)]"
                      : passwordsMismatch
                        ? "border-rose-300 focus:border-rose-400 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.08)]"
                        : "border-slate-200 hover:border-blue-200 focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.09)]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-blue-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {passwordsMatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 pl-1 text-[12px] font-semibold text-emerald-600"
                >
                  <CheckCircle2 size={14} />
                  Passwords match
                </motion.p>
              )}

              {passwordsMismatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 pl-1 text-[12px] font-semibold text-rose-500"
                >
                  <CheckCircle2 size={14} />
                  Passwords do not match
                </motion.p>
              )}
            </div>

            {/* Terms */}
            <label className="group flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                required
                className="mt-1 h-[17px] w-[17px] shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
              />

              <span className="text-[13px] leading-6 text-slate-500">
                I agree to the{" "}
                <span className="font-bold text-blue-700 transition-colors hover:text-cyan-700">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-bold text-blue-700 transition-colors hover:text-cyan-700">
                  Privacy Policy
                </span>
                .
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { y: -3, scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="group relative flex h-[58px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-[16px] font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.23)] transition-all duration-300 hover:shadow-[0_14px_30px_rgba(37,99,235,0.34)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                {loading ? "Creating account..." : "Create your account"}
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
          <div className="relative my-7 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="mx-4 text-[11px] font-bold tracking-[1.7px] text-slate-400">
              ALREADY A MEMBER?
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Login Link */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
            <p className="text-[15px] font-medium text-slate-500">
              Already have a LeadFlow account?
            </p>

            <Link
              to="/login"
              className="mt-2 inline-flex items-center gap-2 text-[16px] font-extrabold text-blue-700 transition-all duration-200 hover:gap-3 hover:text-cyan-700"
            >
              Sign in to your account
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Security Footer */}
          <div className="mt-7 flex items-center justify-center gap-2.5 text-[13px] font-medium text-slate-400">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Fingerprint size={17} />
            </div>

            Your account is protected with secure authentication.
          </div>

        </motion.div>
      </section>
    </div>
  );
};

export default Signup;
