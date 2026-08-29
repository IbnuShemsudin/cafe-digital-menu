import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MenuHome from "./pages/MenuHome";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";

import { useAuth } from "./context/AuthContext";


/*
|--------------------------------------------------------------------------
| Protected Admin Route
|--------------------------------------------------------------------------
*/

function ProtectedAdminRoute({ children }) {
  const { admin, loading } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | Authentication Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#eadfd6] border-t-[#8b4f2f]" />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not Authenticated
  |--------------------------------------------------------------------------
  */

  if (!admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Authenticated
  |--------------------------------------------------------------------------
  */

  return children;
}


/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
*/

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            CUSTOMER MENU
        ===================================================== */}

        <Route
          path="/"
          element={<MenuHome />}
        />


        {/* =====================================================
            ADMIN LOGIN
        ===================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================================
            ADMIN DASHBOARD
        ===================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Keep old dashboard URL working */}

        <Route
          path="/admin/dashboard"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />


        {/* =====================================================
            ADMIN MENU
        ===================================================== */}

        <Route
          path="/admin/menu"
          element={
            <ProtectedAdminRoute>
              <AdminMenu />
            </ProtectedAdminRoute>
          }
        />


        {/* =====================================================
            FUTURE ADMIN PAGES
        ===================================================== */}

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <ComingSoon title="Categories" />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <ComingSoon title="Settings" />
            </ProtectedAdminRoute>
          }
        />


        {/* =====================================================
            UNKNOWN ROUTES
        ===================================================== */}

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


/*
|--------------------------------------------------------------------------
| Coming Soon
|--------------------------------------------------------------------------
*/

function ComingSoon({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-5">

      <div className="rounded-3xl border border-[#eadfd6] bg-white p-10 text-center shadow-sm">

        <h1 className="font-serif text-2xl font-bold text-[#3a2418]">
          {title}
        </h1>

        <p className="mt-2 text-sm text-[#81736a]">
          This section is coming soon.
        </p>

      </div>

    </div>
  );
}

export default App;