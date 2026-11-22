
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Leads from "./pages/Leads";

const LeadsPlaceholder = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-8">
    <h1 className="text-2xl font-extrabold text-gray-900">
      Leads Management
    </h1>
    <p className="text-sm text-gray-500 mt-2">
      Your leads management page will be available here.
    </p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-8">
    <h1 className="text-2xl font-extrabold text-gray-900">
      Settings
    </h1>
    <p className="text-sm text-gray-500 mt-2">
      Workspace settings will be available here.
    </p>
  </div>
);

const GuestRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/settings" element={<SettingsPlaceholder />} />
          </Route>
        </Route>

        {/* Default Route */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
