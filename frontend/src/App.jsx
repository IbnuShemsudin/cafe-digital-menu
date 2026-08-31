import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MenuHome from "./pages/MenuHome";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSettings from "./pages/admin/AdminSettings";

import { useAuth } from "./context/AuthContext";

/* =========================================================
   PROTECTED ADMIN ROUTE
========================================================= */

function ProtectedAdminRoute({ children }) {
  const { admin, loading } = useAuth();

  /* =======================================================
     AUTH LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#eadfd6] border-t-[#8b4f2f]" />

          <p className="text-sm font-medium text-[#81736a]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     NOT AUTHENTICATED
  ======================================================= */

  if (!admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            CUSTOMER MENU
        ================================================= */}

        <Route
          path="/"
          element={<MenuHome />}
        />

        {/* =================================================
            ADMIN LOGIN
        ================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =================================================
            ADMIN REGISTER
        ================================================= */}

        <Route
          path="/admin/register"
          element={
            <ProtectedAdminRoute>
              <AdminRegister />
            </ProtectedAdminRoute>
          }
        />

        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* =================================================
            OLD DASHBOARD URL
        ================================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        {/* =================================================
            ADMIN MENU
        ================================================= */}

        <Route
          path="/admin/menu"
          element={
            <ProtectedAdminRoute>
              <AdminMenu />
            </ProtectedAdminRoute>
          }
        />

        {/* =================================================
            ADMIN CATEGORIES
        ================================================= */}

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <AdminCategories />
            </ProtectedAdminRoute>
          }
        />

        {/* =================================================
            ADMIN SETTINGS
        ================================================= */}

       <Route
  path="/admin/settings"
  element={
    <ProtectedAdminRoute>
      <AdminSettings />
    </ProtectedAdminRoute>
  }
/>

        {/* =================================================
            UNKNOWN ROUTES
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

/* =========================================================
   COMING SOON
========================================================= */

function ComingSoon({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-5">

      <div className="w-full max-w-md rounded-[30px] border border-[#eadfd6] bg-white p-8 text-center shadow-[0_15px_50px_rgba(58,36,24,0.08)] sm:p-10">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4ebe4]">
          <span className="text-2xl">☕</span>
        </div>

        <h1 className="mt-5 font-serif text-2xl font-bold text-[#3a2418]">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#81736a]">
          This section is coming soon.
        </p>

      </div>

    </div>
  );
}

export default App;