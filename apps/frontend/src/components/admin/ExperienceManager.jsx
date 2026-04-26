import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { sanitizeFormData } from "@/components/utils/sanitize";

const EMPTY = {
  company: "",
  title: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  techStack: [],
  order: 0
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert ISO datetime → YYYY-MM-DD for <input type="date"> */
function toDateInput(iso) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

/** Convert YYYY-MM-DD from <input type="date"> → ISO string for the API */
function toISOString(dateStr) {
  if (!dateStr) return undefined;
  return new Date(dateStr).toISOString();
}

// ─── Reusable field components ───────────────────────────────────────────────

function Field({ label, value, onChange, multiline, type = "text" }) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-white/40 tracking-widest mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors"
        />
      )}
    </div>
  );
}

function ArrayField({ label, value = [], onChange }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <label className="block text-[10px] font-mono text-white/40 tracking-widest mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 bg-white/10 text-white text-xs font-mono"
          >
            {item}
            <button
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="text-white/40 hover:text-[#ff0080]"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim()) {
            onChange([...value, input.trim()]);
            setInput("");
          }
        }}
        placeholder="Type and press Enter"
        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors placeholder:text-white/20"
      />
    </div>
  );
}

// ─── Create / Edit form ──────────────────────────────────────────────────────

function ExpForm({ exp, onSave, onCancel }) {
  const [data, setData] = useState({
    ...exp,
    startDate: toDateInput(exp.startDate),
    endDate: toDateInput(exp.endDate)
  });
  const [saving, setSaving] = useState(false);

  const set = (key) => (val) => setData((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const clean = sanitizeFormData(data, {
        company: "text",
        title: "text",
        description: "multiline",
        techStack: "array",
        order: "number",
        isCurrent: "boolean"
      });
      // Convert date strings separately (sanitizeFormData 'date' type handles the conversion)
      clean.startDate = toISOString(data.startDate);
      clean.endDate = data.isCurrent ? undefined : toISOString(data.endDate);
      await onSave(clean);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-[#ff0080]/30 bg-[#ff0080]/5 p-5 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="COMPANY" value={data.company} onChange={set("company")} />
        <Field
          label="ROLE / TITLE"
          value={data.title}
          onChange={set("title")}
        />
        <Field
          label="START DATE"
          value={data.startDate}
          onChange={set("startDate")}
          type="date"
        />
        {!data.isCurrent && (
          <Field
            label="END DATE"
            value={data.endDate}
            onChange={set("endDate")}
            type="date"
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isCurrent"
          checked={!!data.isCurrent}
          onChange={(e) => set("isCurrent")(e.target.checked)}
          className="accent-[#ff0080]"
        />
        <label htmlFor="isCurrent" className="text-xs font-mono text-white/60">
          CURRENTLY WORKING HERE
        </label>
      </div>
      <Field
        label="DESCRIPTION"
        value={data.description}
        onChange={set("description")}
        multiline
      />
      <ArrayField
        label="TECH STACK (press Enter)"
        value={data.techStack}
        onChange={set("techStack")}
      />
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-[#ff0080] text-white font-mono text-xs tracking-wider hover:bg-[#ff0080]/80 transition-colors disabled:opacity-50"
        >
          <Save className="w-3 h-3" /> {saving ? "SAVING..." : "SAVE"}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2 border border-white/20 text-white/60 font-mono text-xs tracking-wider hover:border-white hover:text-white transition-colors"
        >
          <X className="w-3 h-3" /> CANCEL
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ExperienceManager() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: response = {}, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => api.get("/api/experiences?limit=50&order=asc")
  });

  const experiences = response.data ?? [];

  const sorted = [...experiences].sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    return new Date(b.startDate) - new Date(a.startDate);
  });

  const handleSave = async (clean) => {
    if (editing === "new") {
      await api.post("/api/experiences", clean);
    } else {
      await api.patch(`/api/experiences/${editing}`, clean);
    }
    qc.invalidateQueries({ queryKey: ["experiences"] });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience?")) return;
    await api.del(`/api/experiences/${id}`);
    qc.invalidateQueries({ queryKey: ["experiences"] });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setEditing("new")}
        className="flex items-center gap-2 px-6 py-2 border border-[#ff0080] text-[#ff0080] font-mono text-xs tracking-wider hover:bg-[#ff0080] hover:text-white transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD EXPERIENCE
      </button>

      {editing === "new" && (
        <ExpForm
          exp={EMPTY}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {isLoading && (
        <p className="text-white/40 text-xs font-mono">Loading...</p>
      )}

      <div className="space-y-2">
        {sorted.map((exp) => (
          <div key={exp.id}>
            {editing === exp.id ? (
              <ExpForm
                exp={exp}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/20 group transition-colors">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">
                      {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-mono">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">
                    {exp.title} · {exp.startDate?.slice(0, 7)}
                    {exp.isCurrent
                      ? " — Present"
                      : exp.endDate
                        ? ` — ${exp.endDate.slice(0, 7)}`
                        : ""}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditing(exp.id)}
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-white/40 hover:text-[#ff0080] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
