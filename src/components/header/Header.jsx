import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUsers, FiInfo } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

const navItems = [
  { to: "/", label: "Home", icon: <FiHome className="inline-block -mt-0.5" /> },
  { to: "/patients", label: "Patients", icon: <FiUsers className="inline-block -mt-0.5" /> },
  { to: "/about", label: "About", icon: <FiInfo className="inline-block -mt-0.5" /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group" aria-label="Jarurat Care home">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 grid place-items-center ring-1 ring-emerald-500/30 group-hover:ring-emerald-500 transition">
            
            <span className="text-emerald-600 font-semibold">JC</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Jarurat <span className="text-emerald-600">Care</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-xl text-sm font-medium transition",
                  "hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600",
                ].join(" ")
              }
              aria-label={item.label}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={btnRef}
          onClick={() => setIsOpen(true)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Open menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>
      </div>

      <MobileMenu
        id="mobile-menu"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={btnRef}
        items={navItems}
      />
    </header>
  );
}
