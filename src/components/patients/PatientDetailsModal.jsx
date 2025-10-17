import React from "react";
import { FiCalendar, FiMapPin, FiPhone, FiMail, FiUser } from "react-icons/fi";

export default function PatientDetailsModal({ patient }) {
  const isEmail = /\S+@\S+\.\S+/.test(patient.contact || "");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={patient.profilePic}
          alt={patient.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-emerald-400/60 shadow"
        />
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{patient.name}</h3>
          <p className="text-slate-300 text-sm">
            <span className="inline-flex items-center gap-1"><FiUser /> Age {patient.age}</span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center gap-1"><FiCalendar /> {patient.assignmentDate}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          {isEmail ? <FiMail /> : <FiPhone />}
          <span>{patient.contact}</span>
        </div>
        {patient.address ? (
          <div className="flex items-center gap-2 text-slate-300">
            <FiMapPin />
            <span>{patient.address}</span>
          </div>
        ) : (
          <div />
        )}
      </div>

      {patient.notes && (
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <p className="text-sm text-slate-200">{patient.notes}</p>
        </div>
      )}

      <div className="text-xs text-slate-400">
        Created: {new Date(patient.createdAt).toLocaleString()} • Last Updated:{" "}
        {new Date(patient.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
