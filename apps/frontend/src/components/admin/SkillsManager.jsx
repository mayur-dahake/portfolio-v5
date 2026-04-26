import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { sanitizeFormData } from "@/components/utils/sanitize";

// Lowercase to match DB values from the seed / backend schema
const CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "tools",
  "other"
];

const EMPTY_SKILL = {
  name: "",
  category: "frontend",
  proficiency: 80,
  order: 0
};

// ─── Skill row (read view) ────────────────────────────────────────────────────

function SkillRow({ skill, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 p-3 border border-white/10 hover:border-white/20 group transition-colors">
      <div className="w-24 text-[10px] font-mono text-[#ff0080] tracking-wider uppercase">
        {skill.category}
      </div>
      <div className="flex-1 text-white text-sm">{skill.name}</div>
      <div className="flex items-center gap-2 w-40">
        <div className="flex-1 h-1 bg-white/10 rounded-full">
          <div
            className="h-full bg-[#ff0080] rounded-full"
            style={{ width: `${skill.proficiency ?? 0}%` }}
          />
        </div>
        <span className="text-white/40 text-xs font-mono w-8">
          {skill.proficiency}%
        </span>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(skill)}
          className="p-1.5 text-white/40 hover:text-white transition-colors"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(skill.id)}
          className="p-1.5 text-white/40 hover:text-[#ff0080] transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Skill form (create / edit) ───────────────────────────────────────────────

function SkillForm({ skill, onSave, onCancel }) {
  const [data, setData] = useState(skill);
  const [saving, setSaving] = useState(false);

  const set = (key) => (val) => setData((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 border border-[#ff0080]/30 bg-[#ff0080]/5 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="col-span-2">
          <label className="block text-[10px] font-mono text-white/40 tracking-widest mb-1">
            SKILL NAME
          </label>
          <input
            value={data.name}
            onChange={(e) => set("name")(e.target.value)}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-white/40 tracking-widest mb-1">
            CATEGORY
          </label>
          <select
            value={data.category}
            onChange={(e) => set("category")(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-white/40 tracking-widest mb-1">
            PROFICIENCY %
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={data.proficiency}
            onChange={(e) => set("proficiency")(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-sm font-mono focus:border-[#ff0080] outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-[#ff0080] text-white font-mono text-xs tracking-wider hover:bg-[#ff0080]/80 transition-colors disabled:opacity-50"
        >
          <Save className="w-3 h-3" /> {saving ? "SAVING..." : "SAVE"}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2 border border-white/20 text-white/60 font-mono text-xs tracking-wider hover:border-white hover:text-white transition-colors"
        >
          <X className="w-3 h-3" /> CANCEL
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SkillsManager() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: response = {}, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => api.get("/api/skills?limit=100&order=asc")
  });

  const skills = response.data ?? [];

  const handleSave = async (data) => {
    const clean = sanitizeFormData(data, {
      name: "text",
      category: "text",
      proficiency: "number",
      order: "number"
    });

    if (editing === "new") {
      await api.post("/api/skills", clean);
    } else {
      await api.patch(`/api/skills/${editing}`, clean);
    }
    qc.invalidateQueries({ queryKey: ["skills"] });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    await api.del(`/api/skills/${id}`);
    qc.invalidateQueries({ queryKey: ["skills"] });
  };

  // Group by category in defined order; skip empty categories
  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catSkills = skills
      .filter((s) => s.category?.toLowerCase() === cat)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (catSkills.length) acc[cat] = catSkills;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <button
        onClick={() => setEditing("new")}
        className="flex items-center gap-2 px-6 py-2 border border-[#ff0080] text-[#ff0080] font-mono text-xs tracking-wider hover:bg-[#ff0080] hover:text-white transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD SKILL
      </button>

      {editing === "new" && (
        <SkillForm
          skill={EMPTY_SKILL}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {isLoading && (
        <p className="text-white/40 text-xs font-mono">Loading...</p>
      )}

      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat}>
          <div className="text-[10px] font-mono text-white/30 tracking-widest mb-2 mt-4 uppercase">
            {cat}
          </div>
          <div className="space-y-1">
            {catSkills.map((s) => (
              <div key={s.id}>
                {editing === s.id ? (
                  <SkillForm
                    skill={s}
                    onSave={handleSave}
                    onCancel={() => setEditing(null)}
                  />
                ) : (
                  <SkillRow
                    skill={s}
                    onEdit={(sk) => setEditing(sk.id)}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
