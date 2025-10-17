import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../lib/cloudinary";

export default function PatientForm({ mode = "add", initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const [preview, setPreview] = useState(initial.profilePic || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    setForm(initial);
    setPreview(initial.profilePic || "");
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      
      if (!/^image\//.test(file.type)) {
        throw new Error("Please select an image file.");
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Max file size is 2MB.");
      }

      const { url, publicId } = await uploadToCloudinary(file, {
        context: { patient: (form.name || "unknown").slice(0, 40) },
      });

      setPreview(url);
      setForm((f) => ({ ...f, profilePic: url, cloudinaryPublicId: publicId }));
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      setUploadError(err.message || "Upload failed");
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    if (!form.name?.trim()) {
      toast.error("Name is required");
      return false;
    }
    const ageNum = Number(form.age);
    if (!Number.isFinite(ageNum) || ageNum < 0 || ageNum > 120) {
      toast.error("Age must be between 0 and 120");
      return false;
    }
    if (!form.contact?.trim()) {
      toast.error("Contact is required");
      return false;
    }
    if (!form.assignmentDate) {
      toast.error("Assignment date is required");
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, profilePic: form.profilePic || preview });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-black-300">Full Name*</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            placeholder="e.g., Anita Sharma"
          />
        </div>
        <div>
          <label className="text-sm text-black-300">Age*</label>
          <input
            name="age"
            type="number"
            min="0"
            max="120"
            value={form.age}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            placeholder="e.g., 34"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-black-300">Contact (Phone/Email)*</label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            placeholder="+91-98xxxxxx12 or email"
          />
        </div>
        <div>
          <label className="text-sm text-black-300">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-black-300">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            placeholder="City / Area"
          />
        </div>
        <div>
          <label className="text-sm text-black-300">Assignment Date*</label>
          <input
            name="assignmentDate"
            type="date"
            value={form.assignmentDate}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
        </div>
      </div>

      
      <div>
        <label className="text-sm text-black-300">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          placeholder="Condition, observations, etc."
        />
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-3 items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={preview || "/images/avatars/avatar-placeholder.png"}
              onError={(e) => (e.currentTarget.src = "/images/avatars/avatar-placeholder.png")}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400/60"
            />
            {uploading && (
              <span className="absolute inset-0 grid place-items-center rounded-full bg-black/30">
                <span className="h-6 w-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm text-black-300">Profile Picture</label>
          <div className="mt-1 flex flex-col gap-2">
            
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full text-sm text-black-300 file:mr-3 file:rounded-md file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-2 file:text-black-100 hover:file:bg-white/20"
            />
            
            <input
              name="profilePic"
              value={form.profilePic}
              onChange={(e) => {
                handleChange(e);
                setPreview(e.target.value);
              }}
              placeholder="or paste an image URL"
              className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-black-100 placeholder-black-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            />
            {uploadError && (
              <p className="text-xs text-rose-300">{uploadError}</p>
            )}
          </div>
        </div>
      </div>

      
      <div className="pt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
          disabled={uploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 disabled:opacity-60"
          disabled={uploading}
        >
          {mode === "add" ? "Add Patient" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
