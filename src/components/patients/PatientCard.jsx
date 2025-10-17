import React from "react";
import { FiEye, FiEdit2, FiTrash2, FiPhone, FiMail, FiCalendar } from "react-icons/fi";

export default function PatientCard({ patient, onView, onEdit, onDelete }) {
  const isEmail = /\S+@\S+\.\S+/.test(patient.contact || "");
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 shadow hover:bg-white/[0.1] transition">
      <div className="flex items-center gap-3">
        <img
          src={patient.profilePic}
          alt={patient.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-400/60 shadow"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-100 truncate">
            {patient.name}
          </h3>
          <p className="text-xs text-slate-300">
            Age {patient.age} •{" "}
            <span className="inline-flex items-center gap-1">
              <FiCalendar /> {patient.assignmentDate}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-300 flex items-center gap-2">
        {isEmail ? <FiMail /> : <FiPhone />}
        <span className="truncate">{patient.contact}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onView}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <FiEye /> View Details
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            aria-label="Edit"
            className="h-9 w-9 grid place-items-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete"
            className="h-9 w-9 grid place-items-center rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
