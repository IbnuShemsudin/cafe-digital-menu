import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8 text-center"
        >

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3a2418] text-white shadow-lg">
            <Coffee size={28} />
          </div>

          <h1 className="font-serif text-3xl font-semibold text-[#3a2418]">
            Cafe Admin
          </h1>

          <p className="mt-2 text-sm text-[#81736a]">
            Manage your digital menu
          </p>

        </motion.div>

        {/* CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="rounded-[28px] border border-[#e7d9ce] bg-white p-7 shadow-[0_20px_60px_rgba(58,36,24,0.08)] sm:p-9"
        >

          <div className="mb-7">
            <h2 className="text-xl font-semibold text-[#3a2418]">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-[#81736a]">
              Sign in to manage your cafe.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#3a2418]">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a27a60]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@cafe.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-4 text-sm text-[#241a15] outline-none transition focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#3a2418]">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a27a60]"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-12 text-sm text-[#241a15] outline-none transition focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#81736a] hover:bg-[#efe5dc]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#8b4f2f] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15 transition hover:bg-[#754126] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>

        </motion.div>

        {/* FOOTER */}

        <p className="mt-6 text-center text-xs text-[#a27a60]">
          Cafe Digital Menu • Admin Portal
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;