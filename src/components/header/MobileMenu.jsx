import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function MobileMenu({ id, open, onClose, triggerRef, items = [] }) {
  const panelRef = useRef(null);

  
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        panelRef.current?.focus();
      }, 0);
      return () => clearTimeout(t);
    } else {
      triggerRef?.current?.focus?.();
    }
  }, [open, triggerRef]);

  
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          
          <motion.button
            key="overlay"
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            id={id}
            ref={panelRef}
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 rounded-b-2xl bg-white shadow-xl border-b border-gray-200"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div className="px-4 sm:px-6 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <h2 id={`${id}-title`} className="text-base font-semibold text-gray-900">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Close menu"
                >
                  <FiX className="text-xl text-gray-700" />
                </button>
              </div>

              <nav className="mt-3 divide-y divide-gray-100" onClick={onClose}>
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 py-3",
                        "text-base",
                        isActive ? "text-gray-900 font-semibold" : "text-gray-700",
                      ].join(" ")
                    }
                    aria-label={item.label}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              
              <div className="h-2" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
