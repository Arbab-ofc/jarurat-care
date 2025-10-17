import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import TestimonialCarousel from "../components/carousel/TestimonialCarousel";
import { FiShield, FiZap, FiSmartphone } from "react-icons/fi";

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full bg-slate-950 text-slate-100">
      
      <section className="relative overflow-hidden">
        
        {!reduce && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(16,185,129,0.35), transparent 70%)",
              }}
              animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(99,102,241,0.35), transparent 70%)",
              }}
              animate={{ x: [0, -30, 10, 0], y: [0, 20, -10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 md:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            Patient records ,{" "}
            <span className="text-emerald-400">fast</span> &{" "}
            <span className="text-indigo-400">frictionless</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-4 max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl"
          >
            Jarurat Care makes adding, updating, and tracking patients effortless
            with a sleek, responsive dashboard. Built with modern tooling and
            responsive UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/patients"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
            >
              View Patients
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
            >
              Learn More
            </Link>
          </motion.div>

          
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                  <FiZap className="text-xl" />
                </span>
                <div>
                  <p className="font-semibold text-slate-100">Blazing Fast</p>
                  <p className="text-slate-400">Search & CRUD in seconds</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <FiShield className="text-xl" />
                </span>
                <div>
                  <p className="font-semibold text-slate-100">Reliable</p>
                  <p className="text-slate-400">Local persistence + a11y</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                  <FiSmartphone className="text-xl" />
                </span>
                <div>
                  <p className="font-semibold text-slate-100">Responsive</p>
                  <p className="text-slate-400">Mobile • Tablet • Desktop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Clean CRUD Workflow",
                desc: "Add, edit, delete patients with toast feedback, confirm dialogs, and graceful errors.",
              },
              {
                title: "Modern Motion",
                desc: "Smooth transitions and micro-interactions powered by Framer Motion.",
              },
              {
                title: "Smart Search",
                desc: "Case-insensitive, debounced filtering for instant results.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6"
              >
                <h3 className="text-lg font-semibold text-slate-100">
                  {f.title}
                </h3>
                <p className="mt-2 text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="border-t border-white/10 bg-slate-950 py-14">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-semibold text-white mb-8"
          >
            What Our Users Say
          </motion.h2>

          <TestimonialCarousel />
        </div>
      </section>

      
      <section className="border-t border-white/10 bg-gradient-to-r from-emerald-700/20 via-slate-900 to-indigo-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">
                Ready to manage patients with speed & clarity?
              </h3>
              <p className="text-slate-300">
                Start with your existing records or add a new patient in seconds.
              </p>
            </div>
            <Link
              to="/patients"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
