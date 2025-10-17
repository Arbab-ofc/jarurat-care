import React from "react";

export default function Loader({ size = 48, color = "emerald" }) {
  const colorMap = {
    emerald: "border-emerald-500",
    white: "border-white",
    gray: "border-gray-400",
  };
  const ringColor = colorMap[color] || "border-emerald-500";

  return (
    <div className="flex items-center justify-center py-10">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${ringColor}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
