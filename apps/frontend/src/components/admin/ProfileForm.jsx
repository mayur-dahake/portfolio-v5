import { useState, useEffect, useCallback } from "react";
import { api } from "@/api/apiClient";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

// ─── Per-field validators (run on blur; empty = always OK) ───────────────────

const validators = {
  email: (v) => {
    if (!v) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? null
      : "Invalid email address";
  },
  phone: (v) => {
    if (!v) return null;
    return /^\+?[\d\s\-().]{7,20}$/.test(v)
      ? null
      : "Use digits, spaces, +, - or () — 7–20 chars";
  },
  url: (v) => {
    if (!v) return null;
    try {
      const normalized = /^https?:\/\//i.test(v) ? v : `https://${v}`;
      new URL(normalized);
      return null;
    } catch {
      return "Enter a valid URL (e.g. https://example.com)";
    }
  },
  number: (v) => {
    if (!v) return null;
    const n = Number(v);
    if (isNaN(n) || n < 0 || n > 60) return "Enter a number between 0 and 60";
    return null;
  }
};

// ─── Normalize a URL — prepend https:// if needed ────────────────────────────

function normalizeUrl(v) {
  if (!v || !v.trim()) return "";
  const t = v.trim();
  if (/^https?:\/\//i.test(t)) return t;
  try {
    new URL(`https://${t}`);
    return `https://${t}`;
  } catch {
    return t;
  }
}

// ─── Reusable Field with inline validation ───────────────────────────────────

function Field({
  label,
  value,
  onChange,
  onBlur,
  multiline,
  hint,
  error,
  valid,
  placeholder
}) {
  const borderClass = error
    ? "border-red-500/60 focus:border-red-500"
    : valid
      ? "border-green-500/40 focus:border-green-500"
      : "border-white/10 focus:border-[#ff0080]";

  const inputClass = `w-full bg-white/5 border px-4 py-3 text-white text-sm font-mono outline-none transition-colors ${borderClass}`;

  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-mono text-white/40 tracking-widest mb-2">
        {label}
        {valid && <CheckCircle className="w-3 h-3 text-green-500" />}
        {hint && !error && (
          <span className="text-white/20 font-normal normal-case tracking-normal">
            {hint}
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={4}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {error && (
        <p className="flex items-center gap-1 mt-1 text-red-400 text-[11px] font-mono">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

const EMPTY = {
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

// ─── Main component ──────────────────────────────────────────────────────────

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({}); // field → error string
  const [touched, setTouched] = useState({}); // field → bool
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    api
      .get("/api/profile")
      .then((d) => setProfile(d ?? EMPTY))
      .catch(() => setProfile(EMPTY));
  }, []);

  const set = (key) => (val) => setProfile((p) => ({ ...p, [key]: val }));

  // Validate a single field on blur
  const validateField = useCallback((key, value) => {
    let err = null;
    if (key === "email") err = validators.email(value);
    if (key === "phone") err = validators.phone(value);
    if (
      ["website", "github", "linkedin", "twitterUrl", "resumeUrl"].includes(key)
    )
      err = validators.url(value);
    if (key === "yearsExperience") err = validators.number(value);

    setErrors((prev) => ({ ...prev, [key]: err }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleBlur = (key) => () => validateField(key, profile?.[key] ?? "");

  const isValid = (key) => touched[key] && !errors[key] && !!profile?.[key];

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setServerErrors({});

    // Normalize URL fields before saving
    const urlFields = [
      "website",
      "github",
      "linkedin",
      "twitterUrl",
      "resumeUrl"
    ];
    const payload = { ...profile };
    urlFields.forEach((k) => {
      payload[k] = normalizeUrl(payload[k]);
    });

    // Coerce yearsExperience
    const yrs = parseInt(payload.yearsExperience, 10);
    payload.yearsExperience = isNaN(yrs) ? undefined : yrs;

    // Strip empty strings AND null → undefined (backend treats undefined as "not set")
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "" || payload[k] === null) payload[k] = undefined;
    });

    try {
      if (profile.id) {
        await api.put("/api/profile", payload);
      } else {
        const created = await api.post("/api/profile", payload);
        setProfile(created);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err.message ?? "Save failed");
      if (err.errors?.fieldErrors) setServerErrors(err.errors.fieldErrors);
    } finally {
      setSaving(false);
    }
  };

  if (!profile)
    return (
      <div className="text-white/30 font-mono text-sm p-8">Loading...</div>
    );

  // Merge client errors + server errors
  const allErrors = { ...errors };
  Object.entries(serverErrors).forEach(([k, msgs]) => {
    allErrors[k] = Array.isArray(msgs) ? msgs[0] : msgs;
  });

  return (
    <div className="space-y-5 max-w-2xl">
      {/* ── Identity ── */}
      <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase pt-2">
        Identity
      </p>

      <Field
        label="FULL NAME"
        placeholder="Your full name"
        value={profile.fullName}
        onChange={set("fullName")}
        onBlur={handleBlur("fullName")}
        error={allErrors.fullName}
        valid={isValid("fullName")}
      />

      <Field
        label="HEADLINE / TAGLINE"
        placeholder="e.g. Full Stack Developer | .NET | Angular"
        value={profile.headline}
        onChange={set("headline")}
        onBlur={handleBlur("headline")}
        error={allErrors.headline}
        valid={isValid("headline")}
      />

      <Field
        label="BIO"
        placeholder="A short bio about yourself..."
        multiline
        value={profile.bio}
        onChange={set("bio")}
        onBlur={handleBlur("bio")}
        error={allErrors.bio}
        valid={isValid("bio")}
      />

      {/* ── Contact ── */}
      <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase pt-4">
        Contact
      </p>

      <Field
        label="EMAIL"
        placeholder="you@example.com"
        hint="optional"
        value={profile.email}
        onChange={set("email")}
        onBlur={handleBlur("email")}
        error={allErrors.email}
        valid={isValid("email")}
      />

      <Field
        label="PHONE"
        placeholder="+91 98765 43210"
        hint="optional"
        value={profile.phone}
        onChange={set("phone")}
        onBlur={handleBlur("phone")}
        error={allErrors.phone}
        valid={isValid("phone")}
      />

      <Field
        label="LOCATION"
        placeholder="e.g. Mumbai, India"
        hint="optional"
        value={profile.location}
        onChange={set("location")}
        onBlur={handleBlur("location")}
        error={allErrors.location}
        valid={isValid("location")}
      />

      {/* ── Links ── */}
      <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase pt-4">
        Links — https:// is added automatically
      </p>

      <Field
        label="GITHUB URL"
        placeholder="github.com/your-username"
        hint="optional"
        value={profile.github}
        onChange={set("github")}
        onBlur={handleBlur("github")}
        error={allErrors.github}
        valid={isValid("github")}
      />

      <Field
        label="LINKEDIN URL"
        placeholder="linkedin.com/in/your-name"
        hint="optional"
        value={profile.linkedin}
        onChange={set("linkedin")}
        onBlur={handleBlur("linkedin")}
        error={allErrors.linkedin}
        valid={isValid("linkedin")}
      />

      <Field
        label="TWITTER / X URL"
        placeholder="x.com/your-handle"
        hint="optional"
        value={profile.twitterUrl}
        onChange={set("twitterUrl")}
        onBlur={handleBlur("twitterUrl")}
        error={allErrors.twitterUrl}
        valid={isValid("twitterUrl")}
      />

      <Field
        label="WEBSITE"
        placeholder="yourwebsite.com"
        hint="optional"
        value={profile.website}
        onChange={set("website")}
        onBlur={handleBlur("website")}
        error={allErrors.website}
        valid={isValid("website")}
      />

      {/* ── Resume ── */}
      <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase pt-4">
        Resume
      </p>

      <div>
        <Field
          label="RESUME URL"
          placeholder="drive.google.com/file/..."
          hint="optional"
          value={profile.resumeUrl}
          onChange={set("resumeUrl")}
          onBlur={handleBlur("resumeUrl")}
          error={allErrors.resumeUrl}
          valid={isValid("resumeUrl")}
        />
        {profile.resumeUrl && (
          <a
            href={normalizeUrl(profile.resumeUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-[#ff0080] text-[10px] font-mono hover:underline"
          >
            Preview ↗
          </a>
        )}
      </div>

      {/* ── Stats ── */}
      <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase pt-4">
        Stats
      </p>

      <Field
        label="YEARS OF EXPERIENCE"
        placeholder="5"
        hint="0–60"
        value={String(profile.yearsExperience ?? "")}
        onChange={set("yearsExperience")}
        onBlur={handleBlur("yearsExperience")}
        error={allErrors.yearsExperience}
        valid={isValid("yearsExperience")}
      />

      {/* ── Save error ── */}
      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 text-xs font-mono font-bold">
            {saveError}
          </p>
          {Object.keys(serverErrors).length > 0 && (
            <ul className="mt-2 space-y-0.5">
              {Object.entries(serverErrors).map(([field, msgs]) => (
                <li key={field} className="text-red-300 text-xs font-mono">
                  <span className="text-red-400 uppercase">{field}</span>:{" "}
                  {Array.isArray(msgs) ? msgs.join(", ") : msgs}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
