import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
      />
    </div>
  );
}
