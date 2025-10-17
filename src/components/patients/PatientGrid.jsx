import React from "react";
import PatientCard from "./PatientCard";

export default function PatientGrid({ patients, onView, onEdit, onDelete, query }) {
  if (!patients.length)
    return (
      <div className="col-span-full text-center py-14 text-slate-300">
        {query ? `No results for “${query}”.` : "No patients found."}
      </div>
    );

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((p) => (
        <PatientCard
          key={p.id}
          patient={p}
          onView={() => onView(p)}
          onEdit={() => onEdit(p)}
          onDelete={() => onDelete(p)}
        />
      ))}
    </div>
  );
}
