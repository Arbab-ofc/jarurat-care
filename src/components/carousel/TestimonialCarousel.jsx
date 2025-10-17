import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import TESTIMONIALS from "./testimonials.data";
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const delay = 5000;
  const reduce = useReducedMotion();

  const next = () => setIndex((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIndex((p) => (p === 0 ? TESTIMONIALS.length - 1 : (p - 1) % TESTIMONIALS.length));

  
  useEffect(() => {
    if (reduce) return;
    intervalRef.current = setInterval(next, delay);
    return () => clearInterval(intervalRef.current);
  }, [reduce]);

  
  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    if (reduce) return;
    intervalRef.current = setInterval(next, delay);
  };

  const current = TESTIMONIALS[index];

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl bg-emerald-500/20" />
      </div>

      
      <div className="relative min-h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 sm:p-8 text-left shadow-2xl"
          >
            
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(99,102,241,0.35))",
                mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            <FiMessageSquare
              aria-hidden="true"
              className="text-3xl text-emerald-300/90 mb-4"
            />
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
              “{current.quote}”
            </p>

            <div className="mt-6 flex items-center gap-3">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-400/60 shadow"
              />
              <div>
                <p className="font-semibold text-slate-50">{current.author}</p>
                <p className="text-sm text-slate-300">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      
      <div className="flex justify-center gap-2 mt-6 mb-4">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition border border-white/20 ${
              i === index
                ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                : "bg-white/20 hover:bg-white/30"
            }`}
          />
        ))}
      </div>

      
      <div className="absolute bottom-0 right-0 flex gap-2 p-2 sm:p-3">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
        >
          <FiChevronLeft className="text-2xl text-slate-100" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
        >
          <FiChevronRight className="text-2xl text-slate-100" />
        </button>
      </div>
    </div>
  );
}
