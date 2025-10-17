import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { FiPlus, FiSearch, FiCalendar, FiX } from "react-icons/fi";
import Modal from "../components/modal/Modal";
import PatientForm from "../components/patients/PatientForm";
import PatientDetailsModal from "../components/patients/PatientDetailsModal";
import ConfirmDialog from "../components/patients/ConfirmDialog";
import PatientGrid from "../components/patients/PatientGrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LS_KEY = "patients_data_v1";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState({ type: "none", open: false });
  const [selected, setSelected] = useState(null);
  const addBtnRef = useRef(null);

  
  useEffect(() => {
    async function hydrate() {
      try {
        setIsLoading(true);
        const cached = localStorage.getItem(LS_KEY);
        if (cached) {
          setPatients(JSON.parse(cached));
          return;
        }
        const res = await fetch("/data/patients.json");
        if (!res.ok) throw new Error("Failed to fetch mock data.");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    hydrate();
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(patients));
      } catch {}
    }, 150);
    return () => clearTimeout(timer);
  }, [patients]);

  const parseDate = (d) => (d ? new Date(d) : null);
  const inRange = (dStr) => {
    if (!dStr) return true;
    const d = new Date(dStr);
    const from = dateFrom ? new Date(dateFrom.setHours(0, 0, 0, 0)) : null;
    const to = dateTo ? new Date(dateTo.setHours(23, 59, 59, 999)) : null;
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchName = !q || p.name?.toLowerCase().includes(q);
      const matchDate = inRange(p.assignmentDate);
      return matchName && matchDate;
    });
  }, [patients, query, dateFrom, dateTo]);

  const openAdd = () => {
    setSelected(null);
    setModal({ type: "add", open: true });
  };
  const openEdit = (p) => {
    setSelected(p);
    setModal({ type: "edit", open: true });
  };
  const openDetails = (p) => {
    setSelected(p);
    setModal({ type: "details", open: true });
  };
  const openDelete = (p) => {
    setSelected(p);
    setModal({ type: "delete", open: true });
  };
  const closeModal = () => setModal({ type: "none", open: false });

  const randomAvatar = (gender) => {
    const n = Math.floor(Math.random() * 75);
    if (gender === "M") return `https://randomuser.me/api/portraits/men/${n}.jpg`;
    if (gender === "F") return `https://randomuser.me/api/portraits/women/${n}.jpg`;
    return Math.random() < 0.5
      ? `https://randomuser.me/api/portraits/men/${n}.jpg`
      : `https://randomuser.me/api/portraits/women/${n}.jpg`;
  };

  const handleAdd = (v) => {
    const now = Date.now();
    const assignmentDate = v.assignmentDate || new Date().toISOString().slice(0, 10);
    const profilePic = v.profilePic || randomAvatar(v.gender);
    const newPatient = {
      id: nanoid(8),
      ...v,
      name: v.name.trim(),
      age: Number(v.age),
      contact: v.contact.trim(),
      assignmentDate,
      profilePic,
      createdAt: now,
      updatedAt: now,
    };
    setPatients((p) => [newPatient, ...p]);
    toast.success("Patient added");
    closeModal();
  };

  const handleEdit = (v) => {
    const now = Date.now();
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? {
              ...p,
              ...v,
              name: v.name.trim(),
              age: Number(v.age),
              contact: v.contact.trim(),
              profilePic: v.profilePic || p.profilePic || randomAvatar(v.gender || p.gender),
              assignmentDate: v.assignmentDate || p.assignmentDate || new Date().toISOString().slice(0, 10),
              updatedAt: now,
            }
          : p
      )
    );
    toast.success("Patient updated");
    closeModal();
  };

  const handleDelete = () => {
    const toDelete = selected;
    setPatients((prev) => prev.filter((p) => p.id !== toDelete.id));
    closeModal();
    toast.info(
      <span>
        Deleted <strong>{toDelete.name}</strong>.{" "}
        <button
          onClick={() => {
            setPatients((prev) => [toDelete, ...prev]);
            toast.success("Undo successful");
          }}
          className="underline decoration-emerald-400 underline-offset-4"
        >
          Undo
        </button>
      </span>,
      { autoClose: 4000 }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading patients…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const clearDates = () => {
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/10">
      <div className="flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">Patients</h1>
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
              {patients.length} total
            </span>
          </div>

          <button
            ref={addBtnRef}
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition self-start sm:self-auto"
          >
            <FiPlus />
            Add New Patient
          </button>
        </div>

        
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative w-full lg:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name…"
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <DatePicker
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
                placeholderText="From date"
                className="pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 w-[11rem]"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </div>

            <span className="hidden sm:inline text-slate-400">to</span>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <DatePicker
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
                placeholderText="To date"
                className="pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 w-[11rem]"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </div>

            {(dateFrom || dateTo) && (
              <button
                onClick={clearDates}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-100"
              >
                <FiX /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      
      <PatientGrid
        patients={filtered}
        query={
          query ||
          (dateFrom || dateTo
            ? `${dateFrom?.toLocaleDateString() || "…"} → ${dateTo?.toLocaleDateString() || "…"} (date)`
            : "")
        }
        onView={openDetails}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      
      <Modal
        open={modal.type === "add" && modal.open}
        onClose={closeModal}
        title="Add New Patient"
        size="lg"
        id="add-patient"
      >
        <PatientForm
          mode="add"
          initial={{
            name: "",
            age: "",
            contact: "",
            gender: "O",
            address: "",
            notes: "",
            profilePic: "",
            assignmentDate: new Date().toISOString().slice(0, 10),
          }}
          onCancel={closeModal}
          onSubmit={handleAdd}
        />
      </Modal>

      <Modal
        open={modal.type === "edit" && modal.open}
        onClose={closeModal}
        title={`Edit Patient — ${selected?.name || ""}`}
        size="lg"
        id="edit-patient"
      >
        {selected && (
          <PatientForm
            mode="edit"
            initial={{
              name: selected.name || "",
              age: selected.age ?? "",
              contact: selected.contact || "",
              gender: selected.gender || "O",
              address: selected.address || "",
              notes: selected.notes || "",
              profilePic: selected.profilePic || "",
              assignmentDate:
                selected.assignmentDate || new Date().toISOString().slice(0, 10),
            }}
            onCancel={closeModal}
            onSubmit={handleEdit}
          />
        )}
      </Modal>

      <Modal
        open={modal.type === "details" && modal.open}
        onClose={closeModal}
        title="Patient Details"
        size="md"
        id="patient-details"
        showClose
      >
        {selected && <PatientDetailsModal patient={selected} />}
      </Modal>

      <Modal
        open={modal.type === "delete" && modal.open}
        onClose={closeModal}
        title="Delete Patient"
        size="sm"
        id="delete-patient"
      >
        <ConfirmDialog
          message={
            <>
              Are you sure you want to delete{" "}
              <strong className="text-emerald-300">{selected?.name}</strong>?
            </>
          }
          confirmText="Delete"
          onCancel={closeModal}
          onConfirm={handleDelete}
        />
      </Modal>
    </div>
  );
}
