import { useState, useEffect } from "react";

const DEFAULT_DATA = [
  { name: "DSA",           value: 70, icon: "🌲" },
  { name: "Web Dev",       value: 60, icon: "🌐" },
  { name: "DBMS",          value: 50, icon: "🗄️" },
  { name: "Aptitude",      value: 80, icon: "🧠" },
  { name: "System Design", value: 40, icon: "⚙️" },
  { name: "OS & CN",       value: 55, icon: "💻" },
];

function getBadge(avg) {
  if (avg >= 85) return { label: "Elite 🏆",        color: "#f59e0b" };
  if (avg >= 70) return { label: "Advanced 🔥",     color: "#ef4444" };
  if (avg >= 50) return { label: "Intermediate 🚀", color: "#3b82f6" };
  return             { label: "Beginner 🌱",        color: "#10b981" };
}

function getBarColor(value) {
  if (value >= 75) return "linear-gradient(90deg, #10b981, #34d399)";
  if (value >= 50) return "linear-gradient(90deg, #f59e0b, #fbbf24)";
  return                  "linear-gradient(90deg, #ef4444, #f87171)";
}

function Progress() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  const [celebrated, setCelebrated] = useState([]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(data));
  }, [data]);

  const updateProgress = (index, value) => {
    const updated  = [...data];
    const numVal   = Number(value);
    updated[index] = { ...updated[index], value: numVal };

    if (numVal === 100 && !celebrated.includes(index)) {
      setCelebrated([...celebrated, index]);
      alert(`🎉 Congratulations! You've mastered ${updated[index].name}!`);
    }

    setData(updated);
  };

  const avg          = Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length);
  const badge        = getBadge(avg);
  const circumference = 2 * Math.PI * 48;
  const dashOffset   = circumference - (avg / 100) * circumference;

  return (
    <section className="card fade-in">
      <div className="card-header">
        <h2 className="card-title">📊 Progress Tracker</h2>
        <span className="badge" style={{ background: badge.color + "33", color: badge.color }}>
          {badge.label}
        </span>
      </div>

      {/* Circular overall progress */}
      <div className="overall-progress">
        <svg className="progress-ring" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="48" fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="55" cy="55" r="48"
            fill="none"
            stroke={badge.color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.6s ease" }}
          />
          <text x="55" y="50" textAnchor="middle" className="ring-pct">{avg}%</text>
          <text x="55" y="68" textAnchor="middle" className="ring-label">Overall</text>
        </svg>
      </div>

      {/* Individual subjects */}
      <div className="progress-list">
        {data.map((item, index) => (
          <div key={index} className="progress-item">
            <div className="progress-header">
              <span className="progress-icon">{item.icon}</span>
              <span className="progress-name">{item.name}</span>
              <span className="progress-pct">{item.value}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${item.value}%`, background: getBarColor(item.value) }}
              />
            </div>
            <input
              type="range"
              min="0" max="100"
              value={item.value}
              onChange={(e) => updateProgress(index, e.target.value)}
              className="range-slider"
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="summary-row">
        <div className="summary-item">
          <span className="summary-val">{data.filter(d => d.value >= 75).length}</span>
          <span className="summary-lbl">Strong Topics</span>
        </div>
        <div className="summary-item">
          <span className="summary-val">{data.filter(d => d.value < 50).length}</span>
          <span className="summary-lbl">Need Work</span>
        </div>
        <div className="summary-item">
          <span className="summary-val">{100 - avg}%</span>
          <span className="summary-lbl">To Complete</span>
        </div>
      </div>
    </section>
  );
}

export default Progress;