
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  AlertTriangle,
  Loader2,
  Mail,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import leadService from "../../services/leadService";

const DeleteLeadModal = ({ lead, onClose, onLeadDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await leadService.deleteLead(lead._id);

      toast.success("Lead deleted successfully!");
      onLeadDeleted();
      onClose();
    } catch (error) {
      console.error("Delete lead error:", error);
      toast.error(
        error.response?.data?.message || "Unable to delete lead"
      );
    } finally {
      setLoading(false);
    }
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(5px)",
      transition: { duration: 0.25 },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 25,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 15,
      transition: {
        duration: 0.18,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !loading) onClose();
        }}
      >
        <motion.div
          variants={modalVariants}
          className="my-auto w-full max-w-md overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_30px_90px_-20px_rgba(15,23,42,0.4)]"
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-rose-100/70 bg-gradient-to-r from-[#fff1f2] via-[#fff7f7] to-[#fef2f2] px-6 py-5">
            <div className="pointer-events-none absolute -right-12 -top-20 h-40 w-40 rounded-full bg-rose-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/20">
                  <AlertTriangle size={22} strokeWidth={2.1} />
                </div>

                <div>
                  <h2 className="text-[21px] font-bold tracking-tight text-slate-800">
                    Delete Lead
                  </h2>
                  <p className="mt-1 text-[13px] font-medium text-slate-500">
                    Confirmation required
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 text-slate-400 shadow-sm transition-all duration-300 hover:rotate-90 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Lead Preview */}
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 p-4">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-100/30 blur-2xl" />

              <div className="relative flex items-center gap-3.5">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md shadow-blue-500/20">
                  {lead.name?.charAt(0)?.toUpperCase() || "L"}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-bold text-slate-800">
                    {lead.name}
                  </p>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5">
                    <Mail size={13} className="shrink-0 text-slate-400" />
                    <p className="truncate text-[12px] font-medium text-slate-500">
                      {lead.email}
                    </p>
                  </div>
                </div>

                <div className="hidden rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-600 sm:block">
                  LEAD
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mb-5">
              <h3 className="text-[17px] font-bold tracking-tight text-slate-800">
                Are you sure you want to delete this lead?
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
                This will permanently remove{" "}
                <span className="font-bold text-slate-700">
                  {lead.name}
                </span>{" "}
                from your lead directory. You won't be able to undo this
                action.
              </p>
            </div>

            {/* Warning Note */}
            <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3.5">
              <ShieldAlert
                size={19}
                className="mt-0.5 shrink-0 text-rose-500"
              />

              <div>
                <p className="text-[13px] font-bold text-rose-700">
                  This action is permanent
                </p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-rose-600/80">
                  The lead information will be removed from your directory.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-gradient-to-r from-slate-50/90 to-rose-50/30 px-6 py-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-rose-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-600/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Lead
                  </>
                )}
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteLeadModal;
