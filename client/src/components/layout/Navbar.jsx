
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  Command,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const Navbar = ({ onMenuClick, searchValue = "", onSearchChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <header className="relative sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-100/80 bg-white/95 px-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] backdrop-blur-xl md:px-8">

      {/* Top Blue Accent */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 opacity-80" />

      {/* Left Section */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 hover:scale-105 hover:bg-sky-50 hover:text-blue-600 active:scale-95 lg:hidden"
        >
          <Menu size={21} strokeWidth={2} />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h2 className="bg-gradient-to-r from-slate-950 via-blue-800 to-sky-700 bg-clip-text text-[21px] font-extrabold tracking-tight text-transparent">
              Workspace
            </h2>

            <span className="flex items-center gap-1 rounded-md border border-blue-100/70 bg-gradient-to-r from-sky-50 to-blue-50 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-blue-600">
              <Sparkles size={11} />
              PRO
            </span>
          </div>

          <p className="mt-0.5 text-[13px] font-medium tracking-tight text-slate-400">
            Manage your business efficiently
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Search */}
        <div className="group/search hidden w-[280px] items-center gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-3.5 py-[11px] transition-all duration-300 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-[0_3px_12px_rgba(59,130,246,0.07)] focus-within:ring-4 focus-within:ring-blue-50/80 md:flex lg:w-[340px]">

          <Search
            size={19}
            strokeWidth={2}
            className="shrink-0 text-slate-400 transition-colors duration-300 group-focus-within/search:text-blue-600"
          />

          <input
            type="text"
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full border-none bg-transparent text-[14px] font-medium text-slate-700 outline-none placeholder:text-slate-400"
          />

          <div className="hidden items-center gap-1 rounded-md border border-slate-200/80 bg-white px-1.5 py-1 text-[11px] font-semibold text-slate-400 shadow-sm lg:flex">
            <Command size={12} />
            K
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              showNotifications
                ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100"
                : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            <Bell
              size={21}
              strokeWidth={1.9}
              className={
                showNotifications
                  ? "animate-[wiggle_0.5s_ease-in-out]"
                  : "transition-transform duration-300 hover:rotate-[-10deg]"
              }
            />

            <span className="absolute right-[9px] top-[9px] h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.4)] ring-[2.5px] ring-white" />
          </button>

          {showNotifications && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_15px_45px_rgba(15,23,42,0.12)] duration-200">

              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900">
                  Notifications
                </h3>

                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[12px] font-bold text-blue-600">
                  Updates
                </span>
              </div>

              <div className="py-6 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100/60 bg-gradient-to-br from-sky-50 to-blue-50">
                  <Bell size={22} className="text-blue-500" />
                </div>

                <p className="text-[14px] font-bold text-slate-700">
                  You're all caught up!
                </p>

                <p className="mt-1 text-[13px] text-slate-400">
                  No new notifications.
                </p>

              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent sm:block" />

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className={`group flex items-center gap-2.5 rounded-xl border p-1.5 transition-all duration-300 ${
              showProfile
                ? "border-blue-100 bg-blue-50/70"
                : "border-transparent hover:border-slate-100 hover:bg-slate-50"
            }`}
          >

            {/* Avatar */}
            <div className="relative">

              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 opacity-80" />

              <div className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-white bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 text-[14px] font-extrabold text-white shadow-md shadow-blue-200/50 transition-transform duration-300 group-hover:scale-105">

                {user?.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U"}

              </div>

              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />

            </div>

            {/* User Details */}
            <div className="hidden text-left sm:block">
              <p className="text-[14px] font-extrabold tracking-tight text-slate-800">
                {user?.name || "User"}
              </p>

              <p className="text-[12px] font-medium text-slate-400">
                Admin
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-slate-400 transition-transform duration-300 group-hover:text-blue-600 sm:block ${
                showProfile ? "rotate-180 text-blue-600" : ""
              }`}
            />

          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,0.12)] duration-200">

              {/* Dropdown Header */}
              <div className="mb-1 border-b border-slate-100 px-3 py-3">
                <p className="truncate text-[14px] font-extrabold text-slate-800">
                  {user?.name || "User"}
                </p>

                <p className="mt-0.5 text-[12px] font-medium text-slate-400">
                  Workspace Admin
                </p>
              </div>

              {/* My Profile */}
              <button className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 transition-colors duration-200 group-hover/item:bg-white">
                  <User size={18} className="text-slate-500 group-hover/item:text-blue-600" />
                </span>

                My Profile

                <ArrowUpRight
                  size={14}
                  className="ml-auto opacity-0 transition-opacity group-hover/item:opacity-60"
                />
              </button>

              {/* Settings */}
              <button className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 transition-colors duration-200 group-hover/item:bg-white">
                  <Settings size={18} className="text-slate-500 group-hover/item:text-blue-600" />
                </span>

                Settings

                <ArrowUpRight
                  size={14}
                  className="ml-auto opacity-0 transition-opacity group-hover/item:opacity-60"
                />
              </button>

              <div className="mx-1 my-2 h-px bg-slate-100" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-red-500 transition-all duration-200 hover:bg-red-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 transition-colors duration-200 group-hover/item:bg-white">
                  <LogOut size={18} className="text-red-500" />
                </span>

                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
