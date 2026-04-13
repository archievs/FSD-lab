import { useState } from "react";

function About() {
  const [editing, setEditing] = useState(false);
  const [goal, setGoal] = useState(
    localStorage.getItem("careerGoal") ||
    "I aim to become a Software Engineer at a top tech company by mastering DSA, Web Development, System Design, and Aptitude — and land a 6-figure package by the end of this year."
  );
  const [draft, setDraft] = useState(goal);

  const saveGoal = () => {
    setGoal(draft);
    localStorage.setItem("careerGoal", draft);
    setEditing(false);
  };

  const stats = [
    { label: "Target Companies", value: "FAANG+" },
    { label: "Target Package",   value: "10 LPA+" },
    { label: "Preparation Mode", value: "Active 🟢" },
    { label: "Year",             value: "2026" },
  ];

  return (
    <section className="card fade-in">
      <div className="card-header">
        <h2 className="card-title">🎯 Career Goal</h2>
        <button className="icon-btn" onClick={() => setEditing(!editing)}>
          {editing ? "✖ Cancel" : "✏️ Edit"}
        </button>
      </div>

      {editing ? (
        <div className="edit-area">
          <textarea
            className="goal-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
          />
          <button className="btn-primary" onClick={saveGoal}>💾 Save Goal</button>
        </div>
      ) : (
        <p className="goal-text">{goal}</p>
      )}

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;