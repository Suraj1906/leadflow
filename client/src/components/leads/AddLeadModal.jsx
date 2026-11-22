
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserPlus,
  Plus,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Loader2,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import leadService from "../../services/leadService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
};

const AddLeadModal = ({ onClose, onLeadAdded }) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await leadService.createLead({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
      });

      toast.success("Lead created successfully!");
      onLeadAdded();
      onClose();
    } catch (error) {
      console.error("Create lead error:", error);
      toast.error(
        error.response?.data?.message || "Unable to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-slate-50/80 py-3.5 pl-12 pr-4 text-[14px] font-medium text-slate-700 outline-none transition-all duration-300 placeholder:font-normal placeholder:text-slate-400 hover:border-blue-200 focus:bg-white focus:ring-4 ${
      errors[field]
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/10"
        : "border-slate-200 focus:border-blue-400 focus:ring-blue-500/10"
    }`;

  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "e.g. John Smith",
      icon: User,
      type: "text",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "john@company.com",
      icon: Mail,
      type: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g. +91 9876543210",
      icon: Phone,
      type: "text",
    },
    {
      name: "company",
      label: "Company",
      placeholder: "e.g. Acme Inc.",
      icon: Building2,
      type: "text",
    },
  ];

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
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !loading) onClose();
        }}
      >
        <motion.div
          variants={modalVariants}
          className="my-auto w-full max-w-xl overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_30px_90px_-20px_rgba(15,23,42,0.4)]"
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-blue-100/60 bg-gradient-to-r from-[#eff6ff] via-[#f0f9ff] to-[#ecfeff] px-6 py-5 sm:px-7">
            <div className="pointer-events-none absolute -right-12 -top-20 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
                  <UserPlus size={22} strokeWidth={2.1} />
                  <div className="absolute inset-0 rounded-[15px] bg-gradient-to-t from-black/10 to-white/10" />
                </div>

                <div>
                  <h2 className="text-[21px] font-bold tracking-tight text-slate-800">
                    Add New Lead
                  </h2>
                  <p className="mt-1 text-[13px] font-medium text-slate-500">
                    Add a new contact to your pipeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 text-slate-400 shadow-sm transition-all duration-300 hover:rotate-90 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Form */}
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 px-6 py-6 sm:grid-cols-2 sm:px-7">
              {fields.map((field, index) => {
                const Icon = field.icon;

                return (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.045,
                      duration: 0.3,
                    }}
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-[14px] font-semibold text-slate-700"
                    >
                      {field.label}
                      <span className="ml-1 text-rose-500">*</span>
                    </label>

                    <div className="relative">
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                          errors[field.name]
                            ? "text-rose-400"
                            : "text-slate-400"
                        }`}
                      />

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        disabled={loading}
                        className={inputClass(field.name)}
                      />
                    </div>

                    {errors[field.name] && (
                      <p className="mt-1.5 text-[12px] font-medium text-rose-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </motion.div>
                );
              })}

              {/* Source */}
              <div>
                <label
                  htmlFor="source"
                  className="mb-2 block text-[14px] font-semibold text-slate-700"
                >
                  Lead Source
                </label>

                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    disabled={loading}
                    className={`${inputClass("source")} appearance-none pr-10`}
                  >
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-[14px] font-semibold text-slate-700"
                >
                  Lead Status
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                    className={`${inputClass("status")} appearance-none pr-10`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-gradient-to-r from-slate-50/90 to-blue-50/40 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Create Lead
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddLeadModal;
