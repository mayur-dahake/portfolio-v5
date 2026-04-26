import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { sanitizeFormData } from "@/components/utils/sanitize";

const EMPTY_PROJECT = {
  title: "",
  description: "",
  longDescription: "",
  liveUrl: "",
  repoUrl: "",
  techStack: [],
  tags: [],
  featured: false,
  order: 0
};

// ─── Reusable field components ────────────────────────────────────────────────

function Field({ label, value, onChange, multiline, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-mono text-white/40 tracking-widest mb-1">
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
      <label className="block text-xs font-mono text-white/40 tracking-widest mb-1">
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

// ─── Create / Edit form ───────────────────────────────────────────────────────

function ProjectForm({ project, onSave, onCancel }) {
  const [data, setData] = useState(project);
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
    <div className="border border-white/10 p-6 space-y-4 bg-white/[0.02]">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="TITLE" value={data.title} onChange={set("title")} />
        <Field
          label="ORDER"
          value={String(data.order)}
          onChange={(val) => set("order")(Number(val))}
          type="number"
        />
      </div>

      <Field
        label="SHORT DESCRIPTION"
        value={data.description}
        onChange={set("description")}
        multiline
      />
      <Field
        label="LONG DESCRIPTION"
        value={data.longDescription}
        onChange={set("longDescription")}
        multiline
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="LIVE URL" value={data.liveUrl} onChange={set("liveUrl")} />
        <Field label="REPO / GITHUB URL" value={data.repoUrl} onChange={set("repoUrl")} />
      </div>

      <ArrayField
        label="TECH STACK (press Enter)"
        value={data.techStack}
        onChange={set("techStack")}
      />
      <ArrayField
        label="TAGS (press Enter)"
        value={data.tags}
        onChange={set("tags")}
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={!!data.featured}
          onChange={(e) => set("featured")(e.target.checked)}
          className="accent-[#ff0080]"
        />
        <label htmlFor="featured" className="text-xs font-mono text-white/60">
          FEATURED PROJECT
        </label>
      </div>

      <div className="flex gap-3 pt-2">
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectsManager() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: response = {}, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/api/projects?limit=50&order=asc")
  });

  const projects = response.data ?? [];
  const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleSave = async (data) => {
    const clean = sanitizeFormData(data, {
      title: "text",
      description: "multiline",
      longDescription: "multiline",
      liveUrl: "url",
      repoUrl: "url",
      techStack: "array",
      tags: "array",
      order: "number",
      featured: "boolean"
    });

    if (editing === "new") {
      await api.post("/api/projects", clean);
    } else {
      await api.patch(`/api/projects/${editing}`, clean);
    }
    qc.invalidateQueries({ queryKey: ["projects"] });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await api.del(`/api/projects/${id}`);
    qc.invalidateQueries({ queryKey: ["projects"] });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setEditing("new")}
        className="flex items-center gap-2 px-6 py-2 border border-[#ff0080] text-[#ff0080] font-mono text-xs tracking-wider hover:bg-[#ff0080] hover:text-white transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD PROJECT
      </button>

      {editing === "new" && (
        <ProjectForm
          project={EMPTY_PROJECT}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {isLoading && (
        <p className="text-white/40 text-xs font-mono">Loading...</p>
      )}

      <div className="space-y-3">
        {sorted.map((p) => (
          <div key={p.id}>
            {editing === p.id ? (
              <ProjectForm
                project={p}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/20 transition-colors group">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{p.title}</span>
                    {p.featured && (
                      <span className="px-2 py-0.5 bg-[#ff0080]/20 text-[#ff0080] text-[10px] font-mono">
                        FEATURED
                      </span>
                    )}
                    <span className="text-white/20 text-[10px] font-mono">
                      #{p.order}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 line-clamp-1">
                    {p.description}
                  </p>
                  {(p.liveUrl || p.repoUrl) && (
                    <div className="flex gap-3 mt-1">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ff0080] text-[10px] font-mono hover:underline"
                        >
                          Live ↗
                        </a>
                      )}
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 text-[10px] font-mono hover:text-white"
                        >
                          Repo ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditing(p.id)}
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
