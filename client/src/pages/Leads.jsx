
import { useEffect, useState } from "react";
import AddLeadModal from "../components/leads/AddLeadModal";
import EditLeadModal from "../components/leads/EditLeadModal";
import DeleteLeadModal from "../components/leads/DeleteLeadModal";

import {
  Search,
  Plus,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  RefreshCw,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  Globe2,
  Pencil,
  Trash2,
  UserRound,
  ArrowUpDown,
  BadgeCheck,
  Settings2,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import leadService from "../services/leadService";

const statusStyles = {
  New: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Lost: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const avatarStyles = [
  "from-teal-500 to-emerald-600 shadow-teal-600/15",
  "from-blue-500 to-indigo-600 shadow-blue-600/15",
  "from-violet-500 to-purple-600 shadow-violet-600/15",
  "from-amber-500 to-orange-600 shadow-amber-600/15",
  "from-rose-500 to-pink-600 shadow-rose-600/15",
  "from-cyan-500 to-blue-600 shadow-cyan-600/15",
];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await leadService.getLeads({
        search,
        status,
        page,
        limit: 8,
        sortBy,
        order,
      });

      setLeads(response.leads || []);
      setTotalPages(response.totalPages || 1);
      setTotalLeads(response.totalLeads || 0);
    } catch (error) {
      console.error("Fetch leads error:", error);
      toast.error(
        error.response?.data?.message || "Unable to load leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 350);

    return () => clearTimeout(timer);
  }, [search, status, page, sortBy, order]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";
  };

  const renderActions = (lead) => (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setEditingLead(lead)}
        title="Edit lead"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
      >
        <Pencil size={16} />
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setDeletingLead(lead)}
        title="Delete lead"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 size={16} />
      </motion.button>
    </div>
  );

  const renderAvatar = (lead, index, size = "h-11 w-11") => (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
        avatarStyles[index % avatarStyles.length]
      } text-[15px] font-bold text-white shadow-md ring-2 ring-white`}
    >
      {lead.name?.charAt(0)?.toUpperCase() || "L"}
    </div>
  );

  const renderStatus = (lead) => (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-bold ring-1 ring-inset ${
        statusStyles[lead.status] ||
        "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {lead.status}
    </span>
  );

  return (
    <div className="min-w-0 space-y-7">

      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-700">
            <Users size={17} />
            Lead Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[38px]">
            All Leads
          </h1>

          <p className="mt-2 text-[14px] text-slate-500 sm:text-[15px]">
            Manage, track and organize all your business leads.
          </p>
        </div>

        {/* Add New Lead */}
        <motion.button
          type="button"
          onClick={() => setShowAddModal(true)}
          whileHover={{ y: -3, scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          className="group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600 px-6 py-3.5 text-[16px] font-bold tracking-wide text-white shadow-[0_8px_22px_rgba(5,150,105,0.22)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(5,150,105,0.32)]"
        >
          <span className="absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:rotate-90">
            <Plus size={19} strokeWidth={2.5} />
          </span>

          Add New Lead
        </motion.button>
      </motion.div>

      {/* Total Leads Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
      >
        <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-teal-100/40 blur-3xl transition-all duration-500 group-hover:bg-teal-200/50" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-800 shadow-sm">
            <Users size={25} />
          </div>

          <div>
            <p className="text-[14px] font-medium text-slate-500">
              Total Leads
            </p>
            <p className="mt-0.5 text-[30px] font-bold tracking-tight text-slate-900">
              {totalLeads.toLocaleString()}
            </p>
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3.5 py-2 text-xs font-semibold text-emerald-700 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live Data
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="group relative min-w-0 flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search leads by name..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-[15px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* Status Filter */}
          <div className="group relative sm:w-52">
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600"
            />

            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 text-[14px] font-semibold text-slate-700 outline-none transition-all duration-200 hover:border-emerald-300 hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-emerald-600"
            />
          </div>

          {/* Sort Filter */}
          <div className="group relative sm:w-48">
            <ArrowUpDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal-700"
            />

            <select
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split("-");
                setSortBy(field);
                setOrder(direction);
                setPage(1);
              }}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 text-[14px] font-semibold text-slate-700 outline-none transition-all duration-200 hover:border-teal-300 hover:bg-white focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-teal-700"
            />
          </div>

          {/* Refresh */}
          <motion.button
            type="button"
            onClick={fetchLeads}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Leads Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      >

        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-[21px] font-bold tracking-tight text-slate-800">
              Lead Directory
            </h2>

            <p className="mt-1 text-[14px] font-medium text-slate-500">
              Showing {leads.length} of {totalLeads} leads
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[13px] font-semibold text-slate-500 sm:flex">
            <Users size={15} className="text-teal-700" />
            Lead Records
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden xl:block">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "13%" }} />
            </colgroup>

            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/80 text-[13px] font-bold uppercase tracking-wider text-slate-500">

                <th className="px-3 py-4 2xl:px-4">
                  <div className="flex items-center gap-2">
                    <UserRound size={16} className="shrink-0 text-teal-600" />
                    Lead
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={15} className="shrink-0 text-blue-600" />
                    Company
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <Phone size={15} className="shrink-0 text-emerald-600" />
                    Phone
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <Globe2 size={15} className="shrink-0 text-violet-600" />
                    Source
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck size={15} className="shrink-0 text-amber-600" />
                    Status
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <Settings2 size={15} className="shrink-0 text-slate-500" />
                    Actions
                  </div>
                </th>

                <th className="px-2 py-4">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="shrink-0 text-indigo-600" />
                    Created
                  </div>
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 7 }).map((_, cell) => (
                      <td className="px-3 py-5" key={cell}>
                        <div className="h-4 w-full max-w-[85px] animate-pulse rounded-md bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : leads.length > 0 ? (
                leads.map((lead, index) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                    className="group transition-all duration-300 hover:bg-[#F3F8F7] hover:shadow-[inset_3px_0_0_0_#0D9488]"
                  >

                    {/* Lead */}
                    <td className="px-3 py-4 2xl:px-4">
                      <div className="flex min-w-0 items-center gap-2.5">
                        {renderAvatar(lead, index, "h-10 w-10")}

                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold text-slate-800 transition-colors group-hover:text-teal-800">
                            {lead.name}
                          </p>

                          <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[13px] text-slate-500">
                            <Mail size={13} className="shrink-0 text-teal-600" />
                            <span className="truncate">{lead.email}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-2 py-4">
                      <div className="flex min-w-0 items-center gap-1.5 text-[14px] font-medium text-slate-600">
                        <Building2 size={15} className="shrink-0 text-blue-600" />
                        <span className="truncate">{lead.company || "—"}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-2 py-4">
                      <div className="flex min-w-0 items-center gap-1.5 text-[14px] font-medium text-slate-600">
                        <Phone size={14} className="shrink-0 text-emerald-600" />
                        <span className="truncate">{lead.phone || "—"}</span>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-2 py-4">
                      <div className="flex min-w-0 items-center gap-1.5 text-[14px] font-medium text-slate-600">
                        <Globe2 size={14} className="shrink-0 text-violet-600" />
                        <span className="truncate">{lead.source || "—"}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-2 py-4">
                      {renderStatus(lead)}
                    </td>

                    {/* Actions */}
                    <td className="px-2 py-4">
                      {renderActions(lead)}
                    </td>

                    {/* Created */}
                    <td className="px-2 py-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-slate-500">
                        <CalendarDays size={14} className="shrink-0 text-amber-600" />
                        {formatDate(lead.createdAt)}
                      </span>
                    </td>

                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <Users size={27} />
                    </div>

                    <h3 className="mt-4 text-[18px] font-bold text-slate-800">
                      No leads found
                    </h3>

                    <p className="mt-1 text-[14px] text-slate-500">
                      {search || status
                        ? "Try changing your search or filters."
                        : "Your leads will appear here once you add them."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLET + MOBILE RESPONSIVE CARDS */}
        <div className="grid grid-cols-1 gap-3 bg-slate-50/50 p-3 sm:p-4 xl:hidden">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 animate-pulse rounded-full bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-44 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))
          ) : leads.length > 0 ? (
            leads.map((lead, index) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-5"
              >

                {/* Card Lead Header */}
                <div className="flex min-w-0 items-center gap-3">
                  {renderAvatar(lead, index)}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] font-bold text-slate-800">
                      {lead.name}
                    </p>

                    <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[13px] text-slate-500">
                      <Mail size={14} className="shrink-0 text-teal-600" />
                      <span className="truncate">{lead.email}</span>
                    </p>
                  </div>

                  {renderStatus(lead)}
                </div>

                {/* Card Details */}
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-slate-100 pt-4">

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      Company
                    </p>
                    <p className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-slate-700">
                      <Building2 size={15} className="shrink-0 text-blue-600" />
                      <span className="truncate">{lead.company || "—"}</span>
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>
                    <p className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-slate-700">
                      <Phone size={15} className="shrink-0 text-emerald-600" />
                      <span className="truncate">{lead.phone || "—"}</span>
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      Source
                    </p>
                    <p className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-slate-700">
                      <Globe2 size={15} className="shrink-0 text-violet-600" />
                      <span className="truncate">{lead.source || "—"}</span>
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      Created
                    </p>
                    <p className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-slate-700">
                      <CalendarDays size={15} className="shrink-0 text-amber-600" />
                      <span className="truncate">{formatDate(lead.createdAt)}</span>
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[13px] font-semibold text-slate-400">
                    Lead Actions
                  </span>
                  {renderActions(lead)}
                </div>

              </motion.div>
            ))
          ) : (
            <div className="rounded-2xl bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Users size={27} />
              </div>

              <h3 className="mt-4 text-[18px] font-bold text-slate-800">
                No leads found
              </h3>

              <p className="mt-1 text-[14px] text-slate-500">
                {search || status
                  ? "Try changing your search or filters."
                  : "Your leads will appear here once you add them."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:px-6">

          <p className="text-[14px] font-medium text-slate-500">
            Page{" "}
            <span className="font-bold text-slate-800">{page}</span>
            {" "}of{" "}
            <span className="font-bold text-slate-800">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => current - 1)}
              whileHover={page > 1 ? { y: -2 } : {}}
              whileTap={{ scale: 0.96 }}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
              Previous
            </motion.button>

            <motion.button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((current) => current + 1)}
              whileHover={page < totalPages ? { y: -2 } : {}}
              whileTap={{ scale: 0.96 }}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={17} />
            </motion.button>
          </div>
        </div>

      </motion.div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onLeadAdded={fetchLeads}
        />
      )}

      {/* Edit Lead Modal */}
      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onLeadUpdated={fetchLeads}
        />
      )}

      {/* Delete Lead Modal */}
      {deletingLead && (
        <DeleteLeadModal
          lead={deletingLead}
          onClose={() => setDeletingLead(null)}
          onLeadDeleted={fetchLeads}
        />
      )}

    </div>
  );
};

export default Leads;
