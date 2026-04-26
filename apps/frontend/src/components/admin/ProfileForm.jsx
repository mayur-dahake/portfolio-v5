import { useState, useEffect } from "react";
import { api } from "@/api/apiClient";
import { Save } from "lucide-react";
import { sanitizeFormData } from "@/components/utils/sanitize";

// ─── Reusable field component ─────────────────────────────────────────────────

function Field({ label, value, onChange, multiline, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-mono text-white/40 tracking-widest mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors"
        />
      )}
    </div>
  );
}

// ─── Empty state matching the backend schema ──────────────────────────────────

const EMPTY_PROFILE = {
  fullName: "",
  headline: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  github: "",
  linkedin: "",
  twitterUrl: "",
  resumeUrl: "",
  yearsExperience: "",
  order: 1
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  // GET /api/profile — returns the single profile object directly (not paginated)
  useEffect(() => {
    api
      .get("/api/profile")
      .then((data) => setProfile(data ?? EMPTY_PROFILE))
      .catch(() => setProfile(EMPTY_PROFILE));
  }, []);

  const set = (key) => (val) => setProfile((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const clean = sanitizeFormData(profile, {
        fullName: "text",
        headline: "text",
        bio: "multiline",
        email: "email",
        phone: "text",
        location: "text",
        website: "url",
        github: "url",
        linkedin: "url",
        twitterUrl: "url",
        resumeUrl: "url",
        order: "number"
      });

      // yearsExperience is an integer — coerce separately
      const yearsRaw = parseInt(profile.yearsExperience, 10);
      if (!isNaN(yearsRaw) && yearsRaw >= 0) {
        clean.yearsExperience = yearsRaw;
      }

      if (profile.id) {
        // Singleton update via PUT /api/profile (no ID needed)
        await api.put("/api/profile", clean);
      } else {
        const created = await api.post("/api/profile", clean);
        setProfile(created);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-white/30 font-mono text-sm p-8">Loading...</div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Field
        label="FULL NAME"
        value={profile.fullName}
        onChange={set("fullName")}
      />
      <Field
        label="HEADLINE / TAGLINE"
        value={profile.headline}
        onChange={set("headline")}
      />
      <Field label="BIO" value={profile.bio} onChange={set("bio")} multiline />
      <Field
        label="EMAIL"
        value={profile.email}
        onChange={set("email")}
        type="email"
      />
      <Field label="PHONE" value={profile.phone} onChange={set("phone")} />
      <Field
        label="LOCATION"
        value={profile.location}
        onChange={set("location")}
      />
      <Field
        label="WEBSITE"
        value={profile.website}
        onChange={set("website")}
      />
      <Field
        label="YEARS OF EXPERIENCE"
        value={String(profile.yearsExperience ?? "")}
        onChange={(val) => set("yearsExperience")(val)}
        type="number"
      />
      <Field
        label="GITHUB URL"
        value={profile.github}
        onChange={set("github")}
      />
      <Field
        label="LINKEDIN URL"
        value={profile.linkedin}
        onChange={set("linkedin")}
      />
      <Field
        label="TWITTER / X URL"
        value={profile.twitterUrl}
        onChange={set("twitterUrl")}
      />

      {/* Resume URL — plain text input (no file upload endpoint on backend) */}
      <div>
        <Field
          label="RESUME URL"
          value={profile.resumeUrl}
          onChange={set("resumeUrl")}
        />
        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-[#ff0080] text-[10px] font-mono hover:underline"
          >
            Preview ↗
          </a>
        )}
      </div>

      {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-8 py-3 bg-[#ff0080] text-white font-mono text-sm tracking-widest hover:bg-[#ff0080]/80 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saved ? "SAVED ✓" : saving ? "SAVING..." : "SAVE CHANGES"}
      </button>
    </div>
  );
}
