
export async function uploadToCloudinary(file, {
  folder = import.meta.env.VITE_CLOUDINARY_FOLDER,
  uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  context = {},
} = {}) {
  if (!file) throw new Error("No file provided");
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env not configured (cloud name / upload preset missing).");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  if (folder) form.append("folder", folder);

  
  if (context && typeof context === "object") {
    
    const ctx = Object.entries(context)
      .map(([k, v]) => `${k}=${String(v).replace(/\|/g, "-")}`)
      .join("|");
    if (ctx) form.append("context", ctx);
  }

  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || "Cloudinary upload failed");
  }
  const data = await res.json();
  
  return { url: data.secure_url, publicId: data.public_id, raw: data };
}
