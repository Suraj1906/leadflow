import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import leadService from "../services/leadService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Users,
  UserPlus,
  Target,
  TrendingUp,
  ArrowUpRight,
  CalendarDays,
  Download,
  ArrowRight,
  Clock3,
  ChevronDown,
  Building2,
  Globe2,
  Mail,
  CalendarCheck,
  Check,
} from "lucide-react";

const statusStyles = {
  New: "bg-sky-50 text-sky-700 border border-sky-200 shadow-sm shadow-sky-100",
  Contacted:
    "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm shadow-amber-100",
  Qualified:
    "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm shadow-emerald-100",
  Lost: "bg-rose-50 text-rose-700 border border-rose-200 shadow-sm shadow-rose-100",
};

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`}
  />
);

const DashboardSkeleton = () => (
  <div className="max-w-[1600px] mx-auto space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-5 w-80" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <Skeleton className="h-12 w-12" />
          <Skeleton className="mt-5 h-9 w-28" />
          <Skeleton className="mt-3 h-5 w-36" />
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100">
        <Skeleton className="h-6 w-36" />

        <div className="mt-8 flex items-end gap-4 h-48">
          {[45, 70, 55, 85, 60, 95].map((height, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t-lg"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="mx-auto mt-8 h-40 w-40 rounded-full" />
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      <Skeleton className="h-6 w-40" />
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="mt-6 flex items-center gap-4">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-5 w-40" />
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [statsData, setStatsData] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [growthData, setGrowthData] = useState([]);
  const [dateRange, setDateRange] = useState("30days");
  const [showDateMenu, setShowDateMenu] = useState(false);

  const maxGrowth = Math.max(
    ...growthData.map((item) => item.leads),
    1
  );

  const chartData = growthData.map((item) => ({
    ...item,
    value:
      item.leads > 0
        ? Math.max((item.leads / maxGrowth) * 100, 6)
        : 0,
  }));

  const getDateParams = (range) => {
    if (range === "all") return {};

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const days = {
      "7days": 6,
      "30days": 29,
      "90days": 89,
    };

    startDate.setDate(startDate.getDate() - days[range]);

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  };

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const dateParams = getDateParams(dateRange);

        const [statsResponse, leadsResponse, growthResponse] =
          await Promise.all([
            leadService.getStats(dateParams),
            leadService.getLeads({
              ...dateParams,
              page: 1,
              limit: 5,
            }),
            leadService.getGrowth(dateParams),
          ]);

        setStatsData(statsResponse);
        setRecentLeads(leadsResponse.leads || []);
        setGrowthData(growthResponse.growth || []);
      } catch (error) {
        console.error("Dashboard Error:", error);
        toast.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]);

  // Export Leads CSV
  const handleExport = async () => {
    try {
      toast.loading("Preparing your leads export...", {
        id: "export",
      });

      const response = await leadService.getLeads({
        page: 1,
        limit: 10000,
      });

      const leads = response.leads || [];

      if (leads.length === 0) {
        toast.error("No leads available to export", {
          id: "export",
        });
        return;
      }

      const headers = [
        "Name",
        "Email",
        "Phone",
        "Company",
        "Source",
        "Status",
        "Created At",
      ];

      const escapeCSV = (value) =>
        `"${String(value ?? "").replace(/"/g, '""')}"`;

      const rows = leads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.source,
        lead.status,
        lead.createdAt
          ? new Date(lead.createdAt).toLocaleDateString()
          : "",
      ]);

      const csvContent = [
        headers.map(escapeCSV).join(","),
        ...rows.map((row) => row.map(escapeCSV).join(",")),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "leadflow-leads.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success(`${leads.length} leads exported successfully!`, {
        id: "export",
      });
    } catch (error) {
      console.error("Export error:", error);

      toast.error("Unable to export leads. Please try again.", {
        id: "export",
      });
    }
  };

  // Statistics
  const statusCounts = statsData?.statusCounts || {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0,
  };

  const totalLeads = statsData?.totalLeads || 0;

  const statusDistribution = [
    { name: "New", color: "#3986C9", count: statusCounts.New },
    { name: "Qualified", color: "#159C85", count: statusCounts.Qualified },
    { name: "Contacted", color: "#D99A38", count: statusCounts.Contacted },
    { name: "Lost", color: "#D65D69", count: statusCounts.Lost },
  ].map((item) => ({
    ...item,
    percentage: totalLeads
      ? ((item.count / totalLeads) * 100).toFixed(1)
      : "0.0",
  }));

  const distributionGradient = totalLeads
    ? (() => {
        let current = 0;

        const segments = statusDistribution.map((item) => {
          const start = current;
          current += (item.count / totalLeads) * 100;

          return `${item.color} ${start}% ${current}%`;
        });

        return `conic-gradient(${segments.join(", ")})`;
      })()
    : "conic-gradient(#E2E8F0 0% 100%)";

  const conversionRate = totalLeads
    ? ((statusCounts.Qualified / totalLeads) * 100).toFixed(1)
    : "0.0";

  // Premium Stats Cards Data
  const stats = [
    {
      title: "Total Leads",
      value: totalLeads.toLocaleString(),
      icon: Users,
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      iconColor: "text-white",
      accent: "from-blue-500 to-indigo-600",
      glow: "hover:shadow-blue-200/70",
      border: "hover:border-blue-200",
      description: "All registered leads",
      label: "Total database",
    },
    {
      title: "New Leads",
      value: statusCounts.New.toLocaleString(),
      icon: UserPlus,
      iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
      iconColor: "text-white",
      accent: "from-sky-400 to-blue-600",
      glow: "hover:shadow-sky-200/70",
      border: "hover:border-sky-200",
      description: "Awaiting first contact",
      label: "Needs attention",
    },
    {
      title: "Qualified Leads",
      value: statusCounts.Qualified.toLocaleString(),
      icon: Target,
      iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
      iconColor: "text-white",
      accent: "from-emerald-400 to-teal-600",
      glow: "hover:shadow-emerald-200/70",
      border: "hover:border-emerald-200",
      description: "Potential opportunities",
      label: "Sales ready",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      iconColor: "text-white",
      accent: "from-amber-400 to-orange-500",
      glow: "hover:shadow-amber-200/70",
      border: "hover:border-amber-200",
      description: "Qualified lead percentage",
      label: "Performance",
    },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />

            <p className="text-[14px] font-extrabold text-teal-700 tracking-[1.5px] uppercase">
              Workspace Overview
            </p>
          </div>

          <h1 className="text-[32px] sm:text-[38px] font-bold tracking-[-1.2px] leading-tight">
  <span className="text-slate-800">Welcome back, </span>
  <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
    {user?.name?.split(" ")[0] || "User"}
  </span>
  <span className="text-slate-400">.</span>
</h1>

          <p className="text-[16px] text-slate-500 mt-2 font-medium">
            Here's what's happening with your leads today.
          </p>
        </div>

        {/* Date Filter + Export */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <button
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-teal-300 rounded-2xl px-4 py-3 text-[15px] font-bold text-slate-700 shadow-sm hover:shadow-lg hover:shadow-teal-100/70 transition-all duration-300"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center">
                <CalendarDays size={20} className="text-teal-700" />
              </span>

              <span className="text-left">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-extrabold">
                  Date range
                </span>

                <span className="block mt-0.5">
                  {dateRange === "7days" && "Last 7 days"}
                  {dateRange === "30days" && "Last 30 days"}
                  {dateRange === "90days" && "Last 90 days"}
                  {dateRange === "all" && "All Time"}
                </span>
              </span>

              <ChevronDown
                size={18}
                className={`text-slate-400 transition-transform duration-300 ${
                  showDateMenu ? "rotate-180 text-teal-600" : ""
                }`}
              />
            </button>

            {showDateMenu && (
              <div className="absolute right-0 top-full mt-3 w-60 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.16)] z-50 p-2.5">
                <p className="px-3 py-2 text-[11px] font-extrabold tracking-[1.5px] text-slate-400 uppercase">
                  Select period
                </p>

                {[
                  { label: "Last 7 days", value: "7days" },
                  { label: "Last 30 days", value: "30days" },
                  { label: "Last 90 days", value: "90days" },
                  { label: "All Time", value: "all" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDateRange(option.value);
                      setShowDateMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[14px] transition-all duration-200 ${
                      dateRange === option.value
                        ? "bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 font-extrabold shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {option.label}

                    {dateRange === option.value && (
                      <span className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                        <Check size={16} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="group relative overflow-hidden flex items-center gap-2.5 bg-gradient-to-r from-slate-900 via-teal-800 to-emerald-700 hover:from-teal-800 hover:via-emerald-700 hover:to-teal-600 text-white rounded-2xl px-5 py-3.5 text-[15px] font-extrabold shadow-lg shadow-teal-900/15 hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-12" />

            <span className="relative w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center border border-white/20">
              <Download
                size={19}
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              />
            </span>

            <span className="relative">Export Leads</span>

            <ArrowUpRight
              size={18}
              className="relative opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </motion.div>

      {/* Premium Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09, duration: 0.45 }}
              className={`group relative overflow-hidden bg-white border border-slate-200/80 ${stat.border} rounded-2xl p-6 shadow-[0_4px_18px_rgba(15,23,42,0.035)] hover:shadow-xl ${stat.glow} hover:-translate-y-1.5 transition-all duration-300`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.accent}`}
              />

              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-slate-100/70 group-hover:scale-150 transition-transform duration-700 opacity-60" />

              <div className="relative z-10 flex items-center justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon
                    size={26}
                    strokeWidth={2.2}
                    className={stat.iconColor}
                  />
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl group-hover:bg-white transition-colors">
                  {stat.label}
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <p className="text-[15px] font-bold text-slate-500">
                  {stat.title}
                </p>

                <div className="flex items-end justify-between mt-1 gap-2">
                  <h2 className="text-[40px] font-extrabold tracking-tight text-slate-900 tabular-nums">
                    {stat.value}
                  </h2>

                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all`}
                  >
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                <span
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.accent}`}
                />

                <p className="text-[14px] text-slate-500 font-semibold">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Lead Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="xl:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-7 shadow-[0_3px_12px_rgba(15,23,42,0.025)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <TrendingUp size={21} className="text-teal-700" />
                </div>

                <h3 className="text-[21px] font-extrabold tracking-tight text-slate-900">
                  Lead Growth
                </h3>
              </div>

              <p className="text-[15px] text-slate-400 mt-2 font-medium">
                {dateRange === "7days" ||
                dateRange === "30days" ||
                dateRange === "90days"
                  ? "Daily lead acquisition overview"
                  : "Lead acquisition overview"}
              </p>
            </div>

            <span className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-[13px] font-bold text-slate-600 whitespace-nowrap">
              {dateRange === "7days" && "Last 7 days"}
              {dateRange === "30days" && "Last 30 days"}
              {dateRange === "90days" && "Last 90 days"}
              {dateRange === "all" && "Last 6 months"}
            </span>
          </div>

          <div className="mt-9 flex items-end justify-between gap-1 sm:gap-2 h-48">
            {chartData.map((item, index) => {
              const showLabel =
                dateRange === "7days" ||
                (dateRange === "30days" && index % 5 === 0) ||
                (dateRange === "90days" && index % 15 === 0) ||
                (dateRange === "all" && index % 1 === 0);

              return (
                <div
                  key={`${item.year || ""}-${item.month}-${item.day || index}`}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-2 min-w-0"
                >
                  <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">
                    {item.leads}
                  </span>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{
                      duration: 0.7,
                      delay: Math.min(index * 0.02, 0.5),
                    }}
                    title={`${item.leads} leads`}
                    className={`w-full max-w-10 rounded-t-lg ${
                      index === chartData.length - 1
                        ? "bg-teal-600"
                        : "bg-slate-200 hover:bg-teal-300"
                    } transition-colors duration-300`}
                  />

                  <span className="text-[12px] sm:text-[13px] font-medium text-slate-400 whitespace-nowrap">
                    {showLabel
                      ? item.day
                        ? `${item.day} ${item.month}`
                        : item.month
                      : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Lead Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-7 shadow-[0_3px_12px_rgba(15,23,42,0.025)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
              <Target size={21} className="text-slate-700" />
            </div>

            <h3 className="text-[21px] font-extrabold tracking-tight text-slate-900">
              Lead Distribution
            </h3>
          </div>

          <p className="text-[15px] text-slate-400 mt-2 font-medium">
            Overview by current status
          </p>

          <div className="mt-8 flex justify-center">
            <div
              className="w-44 h-44 rounded-full flex items-center justify-center shadow-sm"
              style={{
                background: distributionGradient,
              }}
            >
              <div className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                <span className="text-[30px] font-extrabold tracking-tight text-slate-900">
                  {totalLeads.toLocaleString()}
                </span>

                <span className="text-[13px] text-slate-400 font-semibold mt-0.5">
                  Total Leads
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {statusDistribution.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between group/status"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-[15px] font-semibold text-slate-600 group-hover/status:text-slate-900 transition-colors">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-medium text-slate-400">
                    {item.count}
                  </span>

                  <span className="text-[14px] font-extrabold text-slate-800 min-w-[43px] text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_3px_12px_rgba(15,23,42,0.025)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
      >
        {/* Table Header */}
        <div className="p-6 md:p-7 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                <Users size={22} className="text-slate-700" />
              </div>

              <h3 className="text-[22px] font-extrabold tracking-tight text-slate-900">
                Recent Leads
              </h3>
            </div>

            <p className="text-[15px] text-slate-400 mt-2 font-medium">
              Your latest lead activity
            </p>
          </div>

          <button
            onClick={() => navigate("/leads")}
            className="group flex items-center gap-2 text-[14px] font-bold text-teal-700 hover:text-teal-900 transition-colors"
          >
            View all leads

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Premium Colorful Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 via-slate-50 to-teal-50/60 border-y border-slate-200">
                {["NAME", "COMPANY", "SOURCE", "STATUS", "ACTIVITY"].map(
                  (heading, index) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-[13px] font-extrabold tracking-[1.2px] text-slate-500 whitespace-nowrap"
                    >
                      <span className="flex items-center gap-2">
                        {index === 0 && (
                          <Users size={16} className="text-blue-500" />
                        )}
                        {index === 1 && (
                          <Building2 size={16} className="text-violet-500" />
                        )}
                        {index === 2 && (
                          <Globe2 size={16} className="text-sky-500" />
                        )}
                        {index === 3 && (
                          <Target size={16} className="text-emerald-500" />
                        )}
                        {index === 4 && (
                          <Clock3 size={16} className="text-amber-500" />
                        )}
                        {heading}
                      </span>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    className="group/row relative bg-white hover:bg-gradient-to-r hover:from-teal-50/90 hover:via-cyan-50/60 hover:to-blue-50/70 transition-all duration-300"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 relative">
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-blue-500 scale-y-0 group-hover/row:scale-y-100 transition-transform duration-300 origin-center rounded-r-full" />

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center text-[14px] font-extrabold text-white shadow-md transition-all duration-300 group-hover/row:scale-110 group-hover/row:-rotate-3 ${
                            [
                              "bg-gradient-to-br from-blue-500 to-indigo-600",
                              "bg-gradient-to-br from-teal-400 to-emerald-600",
                              "bg-gradient-to-br from-violet-500 to-purple-600",
                              "bg-gradient-to-br from-orange-400 to-rose-500",
                              "bg-gradient-to-br from-cyan-500 to-blue-600",
                            ][index % 5]
                          }`}
                        >
                          {lead.name
                            ?.split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[16px] font-extrabold text-slate-800 group-hover/row:text-teal-800 transition-colors">
                            {lead.name}
                          </p>

                          <p className="flex items-center gap-1.5 text-[13px] text-slate-400 group-hover/row:text-slate-600 mt-1 transition-colors">
                            <Mail size={14} className="text-blue-400" />
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center group-hover/row:bg-violet-100 transition-colors">
                          <Building2 size={17} className="text-violet-600" />
                        </span>

                        <span className="text-[15px] text-slate-600 font-bold group-hover/row:text-slate-900 transition-colors">
                          {lead.company || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center group-hover/row:bg-sky-100 transition-colors">
                          <Globe2 size={17} className="text-sky-600" />
                        </span>

                        <span className="text-[15px] text-slate-600 font-semibold group-hover/row:text-slate-900 transition-colors">
                          {lead.source || "Direct"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-extrabold ${
                          statusStyles[lead.status] ||
                          "bg-slate-50 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        {lead.status}
                      </span>
                    </td>

                    {/* Activity */}
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2.5 bg-amber-50/80 border border-amber-100 group-hover/row:bg-amber-100/80 px-3 py-2.5 rounded-xl transition-colors">
                        <CalendarCheck
                          size={17}
                          className="text-amber-600"
                        />

                        <span className="text-[14px] text-slate-600 font-bold whitespace-nowrap">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString()
                            : "Recently"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-14 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3">
                      <Users size={27} className="text-slate-400" />
                    </div>

                    <p className="text-[17px] font-bold text-slate-700">
                      No leads found
                    </p>

                    <p className="text-[14px] text-slate-400 mt-1">
                      Your leads will appear here once created.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <p className="text-[14px] text-slate-500 font-medium">
            Showing {recentLeads.length} recent leads
          </p>

          <button
            onClick={() => navigate("/leads")}
            className="group flex items-center gap-1.5 text-[14px] font-bold text-teal-700 hover:text-teal-900 transition-colors"
          >
            See all

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;