
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import {
  LayoutDashboard,
  Users,
  Settings,
  Workflow,
  ChevronLeft,
  Sparkles,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    path: "/leads",
    icon: Users,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="group/sidebar relative flex min-h-screen w-[260px] shrink-0 flex-col overflow-hidden border-r border-slate-100/80 bg-white px-5 py-6">

      {/* Subtle Background Accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-52 w-full bg-gradient-to-b from-sky-50/70 via-blue-50/20 to-transparent" />

      {/* Logo */}
      <div className="relative mb-12 flex items-center justify-between px-1">

        <div className="flex items-center gap-3">

          <div className="group/logo relative">

            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 opacity-20 blur-md transition duration-500 group-hover/logo:opacity-50" />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-[15px] border border-white/20 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-600 shadow-lg shadow-blue-500/25 transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:rotate-3">

              <Workflow
                size={22}
                strokeWidth={2.2}
                className="text-white"
              />

              <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-gradient-to-tr from-white/20 to-transparent" />
            </div>
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-slate-950 via-blue-800 to-sky-700 bg-clip-text font-display text-[22px] font-extrabold tracking-tight text-transparent">
              LeadFlow
            </h1>

            <p className="mt-0.5 font-sans text-[10px] font-bold uppercase tracking-[2.4px] text-slate-400">
              CRM Workspace
            </p>
          </div>
        </div>

        <button
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:-translate-x-0.5 hover:bg-sky-50 hover:text-blue-600"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Workspace Label */}
      <div className="relative mb-4 flex items-center justify-between px-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-slate-400">
          Workspace
        </p>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 space-y-2">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-[13px] font-sans text-[14px] font-semibold transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-gradient-to-r from-sky-50 via-blue-50/80 to-cyan-50/70 text-blue-700 shadow-[0_3px_12px_rgba(59,130,246,0.08)]"
                    : "text-slate-500 hover:translate-x-1 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <>
                      <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-sky-500 to-blue-600" />

                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-100/30 to-transparent" />
                    </>
                  )}

                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-sm shadow-blue-100"
                        : "bg-slate-100/70 group-hover:bg-white group-hover:shadow-sm"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.3 : 1.9}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:scale-110 group-hover:text-blue-600"
                      }`}
                    />
                  </span>

                  <span className="relative z-10 tracking-[-0.1px]">
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="relative z-10 ml-auto h-2 w-2 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-[0_0_9px_rgba(59,130,246,0.4)]" />
                  )}

                  {!isActive && (
                    <ArrowUpRight
                      size={14}
                      className="relative z-10 ml-auto translate-x-[-4px] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-50"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="group/upgrade relative mb-6">

        <div className="absolute -inset-[2px] rounded-[19px] bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400 opacity-30 blur-md transition-all duration-500 group-hover/upgrade:opacity-60" />

        <div className="relative overflow-hidden rounded-[17px] bg-gradient-to-br from-[#172554] via-[#1D4ED8] to-[#0369A1] p-[17px] text-white shadow-lg shadow-blue-900/15 transition-all duration-500 group-hover/upgrade:-translate-y-1 group-hover/upgrade:shadow-xl group-hover/upgrade:shadow-blue-500/20">

          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border border-white/10 transition-transform duration-700 group-hover/upgrade:scale-125" />

          <div className="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-sky-400/20 blur-2xl" />

          <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-blue-950/20 to-transparent" />

          <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-inner backdrop-blur-md transition-all duration-300 group-hover/upgrade:rotate-6 group-hover/upgrade:scale-110">

            <Sparkles
              size={20}
              className="text-amber-200"
              strokeWidth={2}
            />
          </div>

          <div className="relative">

            <div className="mb-1.5 flex items-center gap-1.5">
              <h3 className="font-display text-[15px] font-bold tracking-tight">
                Grow your business
              </h3>

              <span className="rounded-md border border-white/15 bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-100">
                Pro
              </span>
            </div>

            <p className="font-sans text-[12px] leading-[1.7] text-blue-100/90">
              Manage your leads and close more deals with LeadFlow.
            </p>

            <button className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-white py-[10px] text-[12px] font-extrabold tracking-wide text-blue-700 shadow-md shadow-blue-950/10 transition-all duration-300 hover:bg-sky-50 hover:shadow-lg active:scale-[0.97]">

              Explore Plans

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/upgrade:translate-x-0.5 group-hover/upgrade:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-[14px] font-semibold transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-sky-50 to-blue-50 text-blue-700"
              : "text-slate-500 hover:translate-x-1 hover:bg-slate-50 hover:text-slate-900"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-white shadow-sm"
                  : "bg-slate-100/70 group-hover:bg-white group-hover:shadow-sm"
              }`}
            >
              <Settings
                size={18}
                strokeWidth={isActive ? 2.3 : 1.9}
                className={`transition-all duration-500 group-hover:rotate-45 ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-400 group-hover:text-blue-600"
                }`}
              />
            </span>

            Settings
          </>
        )}
      </NavLink>

      {/* Profile */}
      <div className="relative mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">

        <div className="relative shrink-0">

          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 opacity-80" />

          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 text-[13px] font-extrabold text-white shadow-md shadow-blue-200/60">
            {user?.name
              ?.split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U"}
          </div>

          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-extrabold tracking-tight text-slate-800">
            {user?.name || "User"}
          </p>

          <p className="mt-0.5 text-[11px] font-medium text-slate-400">
            Workspace Admin
          </p>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-500 active:scale-95"
        >
          <LogOut size={17} strokeWidth={2} />
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;
