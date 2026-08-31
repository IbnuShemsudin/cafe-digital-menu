import { motion } from "framer-motion";
import {
  Coffee,
  ShieldCheck,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function AdminRegister() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF3E7] flex items-center justify-center px-5 py-10">

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

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3A281F] text-white shadow-lg">
            <Coffee size={28} />
          </div>

          <h1 className="[font-family:'Fraunces',serif] text-3xl font-semibold text-[#1F140D]">
            HODADIS CAFE
          </h1>

          <p className="mt-2 [font-family:'IBM_Plex_Mono',monospace] text-[10px] uppercase tracking-[0.2em] text-[#B5502D]">
            Admin Portal
          </p>

        </motion.div>

        {/* =====================================================
            ACCESS CARD
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
          className="rounded-[28px] border border-[#E4D3BE] bg-white p-8 text-center shadow-[0_20px_60px_rgba(58,36,24,0.08)] sm:p-10"
        >

          {/* ICON */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#B5502D]/10 text-[#B5502D]">

            <ShieldCheck size={32} />

          </div>

          {/* TITLE */}

          <h2 className="mt-6 [font-family:'Fraunces',serif] text-2xl font-semibold text-[#1F140D]">
            Administrator Access Only
          </h2>

          {/* DESCRIPTION */}

          <p className="mt-3 text-sm leading-6 text-[#6B564A]">
            New administrator accounts cannot be
            created from the public website.
          </p>

          <p className="mt-2 text-sm leading-6 text-[#6B564A]">
            The cafe administrator account is created
            securely by the system owner.
          </p>

          {/* ===================================================
              LOGIN BUTTON
          ==================================================== */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/login")
            }
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B5502D] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#B5502D]/15 transition hover:bg-[#9C4324] active:scale-[0.99]"
          >

            <LogIn size={18} />

            Admin Login

          </button>

          {/* ===================================================
              BACK TO MENU
          ==================================================== */}

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8B4F2F] transition hover:text-[#754126]"
          >

            <ArrowLeft size={16} />

            Back to menu

          </Link>

        </motion.div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <p className="mt-6 text-center text-xs text-[#A27A60]">
          HODADIS CAFE • Secure Admin Portal
        </p>

      </div>

    </div>
  );
}

export default AdminRegister;
