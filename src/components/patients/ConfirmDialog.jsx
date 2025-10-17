import React from "react";

export default function ConfirmDialog({ message, confirmText = "Confirm", onConfirm, onCancel }) {
  return (
    <div>
      <p className="text-slate-200">{message}</p>
      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-400"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
