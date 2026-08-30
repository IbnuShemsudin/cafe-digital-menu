import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     PASSWORD VALIDATION
  ========================================================= */

  const passwordRequirements = {
    length: password.length >= 6,
    passwordMatch:
      password.length > 0 &&
      password === confirmPassword,
  };

  /* =========================================================
     HANDLE REGISTER
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await register(
        cleanName,
        cleanEmail,
        password
      );

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.message ||
          "Unable to create your admin account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        {/* =====================================================
            LOGO
        ====================================================== */}

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
            Create your administrator account
          </p>

        </motion.div>

        {/* =====================================================
            REGISTER CARD
        ====================================================== */}

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

          {/* HEADER */}

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-[#3a2418]">
              Create your account
            </h2>

            <p className="mt-1 text-sm text-[#81736a]">
              Set up your cafe administration account.
            </p>

          </div>

          {/* ===================================================
              ERROR
          ==================================================== */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* ===================================================
              FORM
          ==================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#3a2418]">
                Full name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a27a60]"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Cafe Administrator"
                  autoComplete="name"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-4 text-sm text-[#241a15] outline-none transition placeholder:text-[#b3a49a] focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

            </div>

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
                  disabled={loading}
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-4 text-sm text-[#241a15] outline-none transition placeholder:text-[#b3a49a] focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-12 text-sm text-[#241a15] outline-none transition placeholder:text-[#b3a49a] focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#81736a] transition hover:bg-[#efe5dc] disabled:cursor-not-allowed"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {/* PASSWORD REQUIREMENT */}

              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2 text-xs">

                  <CheckCircle2
                    size={14}
                    className={
                      passwordRequirements.length
                        ? "text-green-600"
                        : "text-[#b3a49a]"
                    }
                  />

                  <span
                    className={
                      passwordRequirements.length
                        ? "text-green-700"
                        : "text-[#81736a]"
                    }
                  >
                    At least 6 characters
                  </span>

                </div>
              )}

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#3a2418]">
                Confirm password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a27a60]"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#dfd1c6] bg-[#fcfaf7] py-3.5 pl-11 pr-12 text-sm text-[#241a15] outline-none transition placeholder:text-[#b3a49a] focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#81736a] transition hover:bg-[#efe5dc] disabled:cursor-not-allowed"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {/* PASSWORD MATCH */}

              {confirmPassword.length > 0 && (
                <div className="mt-2 flex items-center gap-2 text-xs">

                  <CheckCircle2
                    size={14}
                    className={
                      passwordRequirements.passwordMatch
                        ? "text-green-600"
                        : "text-[#b3a49a]"
                    }
                  />

                  <span
                    className={
                      passwordRequirements.passwordMatch
                        ? "text-green-700"
                        : "text-[#81736a]"
                    }
                  >
                    Passwords match
                  </span>

                </div>
              )}

            </div>

            {/* REGISTER BUTTON */}

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

                  Creating account...
                </>
              ) : (
                <>
                  Create account

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>

          {/* ===================================================
              LOGIN LINK
          ==================================================== */}

          <div className="mt-7 border-t border-[#eee3da] pt-6 text-center">

            <p className="text-sm text-[#81736a]">
              Already have an admin account?
            </p>

            <Link
              to="/admin/login"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#8b4f2f] transition hover:text-[#754126]"
            >
              Sign in instead
              <ArrowRight size={15} />
            </Link>

          </div>

        </motion.div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <p className="mt-6 text-center text-xs text-[#a27a60]">
          Cafe Digital Menu • Admin Portal
        </p>

      </div>

    </div>
  );
}

export default AdminRegister;
