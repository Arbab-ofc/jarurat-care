import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 bg-white text-gray-700">
      
      <AnimatedGradientStrip reduce={shouldReduceMotion} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 grid place-items-center ring-1 ring-emerald-500/30">
              
              <span className="text-emerald-600 font-semibold">JC</span>
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold text-gray-900">
                Jarurat <span className="text-emerald-600">Care</span>
              </div>
              <p className="text-sm text-gray-500">Patient Records Dashboard</p>
            </div>
          </div>

          
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            <Link
              to="/"
              className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/patients"
              className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
            >
              Patients
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
            >
              About
            </Link>
            <span className="font-semibold text-emerald-600">
              Created & Designed by Arbab Arshad
            </span>
          </nav>

          
          <div className="flex items-center gap-3">
            <IconButton
              label="LinkedIn"
              href="https://www.linkedin.com/in/arbab-ofc/"
              Icon={FiLinkedin}
            />
            <IconButton
              label="GitHub"
              href="https://github.com/Arbab-ofc"
              Icon={FiGithub}
            />
            <IconButton
              label="Email"
              href="mailto:arbabprvt@gmail.com"
              Icon={FiMail}
            />
          </div>
        </div>

        
        <div className="mt-6 text-xs text-gray-500">
          © {year} Jarurat Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function IconButton({ label, Icon, href }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      aria-label={label}
      title={label}
    >
      <Icon className="text-lg text-gray-700" />
    </Tag>
  );
}

function AnimatedGradientStrip({ reduce }) {
  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(16,185,129,0.25), rgba(59,130,246,0.25), rgba(99,102,241,0.25))",
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="h-1 w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(16,185,129,0.45), rgba(59,130,246,0.45), rgba(99,102,241,0.45))",
        backgroundSize: "200% 100%",
      }}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}
