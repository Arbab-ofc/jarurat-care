import React from "react";
import { motion } from "framer-motion";

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  className = "",
  size = "md",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";
  const variants = {
    default: "bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30",
    success: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  };
  const sizes = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      title={label}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="pointer-events-none" />}
    </motion.button>
  );
}
