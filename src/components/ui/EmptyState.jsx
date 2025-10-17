import React from "react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({ message = "No data found", icon: Icon = FiInbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
      <Icon className="h-12 w-12 mb-3 text-slate-500" />
      <p className="text-base font-medium">{message}</p>
    </div>
  );
}
