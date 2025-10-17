import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiTarget, FiShield } from "react-icons/fi";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            About <span className="text-emerald-400">Jarurat Care</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg"
          >
            We believe in simplifying healthcare management. Jarurat Care helps you
            organize, update, and access patient data securely — anytime, anywhere.
          </motion.p>
        </div>
      </section>

      
      <section className="border-t border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-semibold text-white mb-8"
          >
            Our Mission & Vision
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
            >
              <h3 className="flex items-center gap-2 text-xl font-semibold text-emerald-400 mb-2">
                <FiTarget className="text-emerald-400" /> Mission
              </h3>
              <p className="text-slate-300 leading-relaxed">
                To empower clinics, doctors, and health workers by offering a modern, 
                easy-to-use dashboard that simplifies patient record management, saves 
                time, and improves care quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
            >
              <h3 className="flex items-center gap-2 text-xl font-semibold text-indigo-400 mb-2">
                <FiHeart className="text-indigo-400" /> Vision
              </h3>
              <p className="text-slate-300 leading-relaxed">
                A world where patient data is transparent, organized, and instantly 
                accessible — enabling healthcare professionals to focus on what 
                truly matters: patient well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="border-t border-white/10 py-16 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-semibold text-white mb-10"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUsers className="text-emerald-400 text-3xl" />,
                title: "User First",
                desc: "We design experiences that put ease of use and clarity above everything else.",
              },
              {
                icon: <FiShield className="text-indigo-400 text-3xl" />,
                title: "Data Security",
                desc: "Your trust matters. We prioritize privacy and safeguard all patient information.",
              },
              {
                icon: <FiHeart className="text-fuchsia-400 text-3xl" />,
                title: "Empathy",
                desc: "Healthcare is personal. Every feature is built with compassion and care.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md hover:bg-white/[0.1] transition"
              >
                <div className="mb-4 flex justify-center">{val.icon}</div>
                <h4 className="text-lg font-semibold text-slate-100 mb-2">
                  {val.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="border-t border-white/10 bg-gradient-to-r from-emerald-700/20 via-slate-900 to-indigo-700/20 py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-4 text-white"
          >
            We’re building the future of digital healthcare.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-slate-300 max-w-2xl mx-auto mb-8"
          >
            Join us on our mission to simplify patient management and make
            technology serve humanity better.
          </motion.p>

          
          <a
            href="mailto:arbabprvt@gmail.com"
            className="inline-block px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
