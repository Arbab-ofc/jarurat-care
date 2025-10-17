import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiHome, FiUsers, FiAlertTriangle } from "react-icons/fi";

export default function Error404() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="min-h-[70vh] w-full bg-slate-950 text-slate-100 grid place-items-center">
      
      {!reduce && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.3), transparent 65%)",
            }}
            animate={{ x: [0, 30, -10, 0], y: [0, -20, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(99,102,241,0.3), transparent 65%)",
            }}
            animate={{ x: [0, -20, 10, 0], y: [0, 20, -15, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <main className="relative z-10 w-full max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          role="alert"
          aria-live="assertive"
          className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 shadow-2xl text-center"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-rose-500/15">
              <FiAlertTriangle className="text-3xl text-rose-300" />
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            404 — Page Not Found
          </h1>

          <p className="mt-3 text-slate-300">
            The route <code className="text-emerald-300">{pathname}</code> doesn’t exist,
            or may have moved.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
            >
              <FiHome className="text-lg" />
              Go to Home
            </Link>

            <Link
              to="/patients"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
            >
              <FiUsers className="text-lg" />
              View Patients
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Tip: Check the URL or use the navigation menu to find what you need.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
