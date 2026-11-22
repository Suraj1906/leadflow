
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { X } from "lucide-react";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({
  children,
  searchValue = "",
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <div className="relative">
                <Sidebar />

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-5 -right-12 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600"
                >
                  <X size={19} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">

        <Navbar
          onMenuClick={() => setIsMobileMenuOpen(true)}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />

        <main className="flex-1 p-5 md:p-8 overflow-x-hidden">
          {children || <Outlet />}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
