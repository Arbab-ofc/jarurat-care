import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiX } from "react-icons/fi";



const SIZE_MAP = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      [
        "a[href]",
        "area[href]",
        "button:not([disabled])",
        "input:not([disabled]):not([type='hidden'])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "iframe",
        "audio[controls]",
        "video[controls]",
        "[contenteditable]",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    )
  ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showClose = true,
  initialFocusRef,
  id = "modal",
}) {
  const reduceMotion = useReducedMotion();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);


  const portalRoot = document.body;

  
  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement;
    }
  }, [open]);

  
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;

    
    const focusTarget = initialFocusRef?.current || getFocusable(panel)[0] || panel;
    focusTarget && focusTarget.focus?.();

    
    function onKeyDown(e) {
      if (e.key === "Escape" && closeOnEsc) {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = getFocusable(panel);
      if (focusables.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === panel) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEsc, onClose, initialFocusRef]);

  
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      
      lastFocusedRef.current && lastFocusedRef.current.focus?.();
    };
  }, [open]);

  
  function onOverlayClick(e) {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  }

  const panelVariants = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -12, scale: 0.98 },
        transition: { duration: 0.22, ease: "easeOut" },
      };

  const overlayVariants = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      };

  
  const titleId = `${id}-title`;
  const descId = `${id}-desc`; 

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          
          <motion.div
            ref={overlayRef}
            role="presentation"
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px]"
            onMouseDown={onOverlayClick}
            {...overlayVariants}
          />

          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={descId}
            tabIndex={-1}
            ref={panelRef}
            className={[
              "fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[92vw] sm:w-auto",
              SIZE_MAP[size] || SIZE_MAP.md,
              "rounded-2xl border border-white/10",
              "bg-white/95 text-gray-900 dark:text-white shadow-2xl backdrop-blur-md",
              "dark:bg-white/[0.06] dark:text-black-100",
              "p-5 sm:p-6",
              "focus:outline-none",
            ].join(" ")}
            {...panelVariants}
          >
            
            {(title || showClose) && (
              <div className="flex items-start justify-between gap-4 mb-4">
                {title ? (
                  <h2 id={titleId} className="text-lg sm:text-xl font-semibold">
                    {title}
                  </h2>
                ) : (
                  <span />
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200/70 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <FiX className="text-xl" />
                  </button>
                )}
              </div>
            )}

            
            <div className="max-h-[70vh] overflow-auto pr-1">
              
              <div id={descId}>{children}</div>
            </div>

            
            {actions && (
              <div className="mt-5 pt-4 border-t border-gray-100/70 dark:border-white/10 flex items-center justify-end gap-3">
                {actions}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
}
