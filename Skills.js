import { useState } from "react";

const DEFAULT_SKILLS = [
  { name: "DSA",                category: "Core" },
  { name: "Web Development",    category: "Tech" },
  { name: "DBMS",               category: "Core" },
  { name: "Aptitude",           category: "Soft" },
  { name: "System Design",      category: "Tech" },
  { name: "Operating Systems",  category: "Core" },
  { name: "Computer Networks",  category: "Core" },
  { name: "Communication",      category: "Soft" },
];

const CATEGORIES = ["All", "Core", "Tech", "Soft"];

const CATEGORY_COLORS = {
  Core: "#3b82f6",
  Tech: "#8b5cf6",
  Soft: "#10b981",
};

function Skills() {
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skills");
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
  });

  const [newSkill,    setNewSkill]    = useState("");
  const [newCategory, setNewCategory] = useState("Core");
  const [search,      setSearch]      = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const saveSkills = (updated) => {
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (skills.find(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      alert("Skill already exists!");
      return;
    }
    saveSkills([...skills, { name: trimmed, category: newCategory }]);
    setNewSkill("");
  };

  const deleteSkill = (index) => {
    saveSkills(skills.filter((_, i) => i !== index));
  };

  const filtered = skills.filter(skill => {
    const matchSearch = skill.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = activeCategory === "All" || skill.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <section className="card fade-in">
      <div className="card-header">
        <h2 className="card-title">💡 Skills</h2>
        <span className="badge">{skills.length} skills</span>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span>🔍</span>
        <input
          className="search-input"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="filter-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="skills-container">
        {filtered.length === 0 ? (
          <p className="empty-msg">No skills found. Add some! 👇</p>
        ) : (
          filtered.map((skill, index) => (
            <div
              key={index}
              className="skill-chip"
              style={{ borderColor: CATEGORY_COLORS[skill.category] }}
            >
              <span className="skill-dot" style={{ background: CATEGORY_COLORS[skill.category] }} />
              <span className="skill-name">{skill.name}</span>
              <span className="skill-cat">{skill.category}</span>
              <button
                className="skill-delete"
                onClick={() => deleteSkill(skills.indexOf(skill))}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Skill */}
      <div className="add-skill-row">
        <input
          className="skill-input"
          placeholder="New skill name..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <select
          className="category-select"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="Core">Core</option>
          <option value="Tech">Tech</option>
          <option value="Soft">Soft</option>
        </select>
        <button className="btn-primary" onClick={addSkill}>+ Add</button>
      </div>
    </section>
  );
}

export default Skills;