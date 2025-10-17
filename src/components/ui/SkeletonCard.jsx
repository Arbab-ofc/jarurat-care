import React from "react";

export default function SkeletonCard({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse space-y-3"
        >
          <div className="h-24 w-full bg-white/10 rounded-lg"></div>
          <div className="h-3 w-3/4 bg-white/10 rounded"></div>
          <div className="h-3 w-1/2 bg-white/10 rounded"></div>
          <div className="h-3 w-1/3 bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  );
}
