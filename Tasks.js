import { useState } from "react";

const DEFAULT_TASKS = [
  { id: 1, text: "Solve 2 LeetCode problems",        priority: "High",   done: false },
  { id: 2, text: "Revise Binary Trees",               priority: "High",   done: false },
  { id: 3, text: "Read 1 System Design article",      priority: "Medium", done: false },
  { id: 4, text: "Practice 10 Aptitude questions",    priority: "Medium", done: false },
  { id: 5, text: "Mock interview practice",           priority: "Low",    done: false },
];

const PRIORITY_STYLE = {
  High:   { color: "#ef4444", bg: "#ef444422" },
  Medium: { color: "#f59e0b", bg: "#f59e0b22" },
  Low:    { color: "#10b981", bg: "#10b98122" },
};

let nextId = 100;

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [newText,     setNewText]     = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [filter,      setFilter]      = useState("All");

  const save = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const toggleTask  = (id) => save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask  = (id) => save(tasks.filter(t => t.id !== id));
  const clearDone   = ()   => save(tasks.filter(t => !t.done));

  const addTask = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    save([...tasks, { id: nextId++, text: trimmed, priority: newPriority, done: false }]);
    setNewText("");
  };

  const filtered = tasks.filter(t => {
    if (filter === "Done")    return t.done;
    if (filter === "Pending") return !t.done;
    if (["High","Medium","Low"].includes(filter)) return t.priority === filter;
    return true;
  });

  const doneCount      = tasks.filter(t => t.done).length;
  const completionPct  = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <section className="card fade-in">
      <div className="card-header">
        <h2 className="card-title">✅ Daily Tasks</h2>
        <span className="badge">{doneCount}/{tasks.length} done</span>
      </div>

      {/* Overall task progress bar */}
      <div className="task-progress-wrap">
        <div className="task-progress-bar">
          <div className="task-progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
        <span className="task-pct">{completionPct}%</span>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        {["All", "Pending", "Done", "High", "Medium", "Low"].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="task-list">
        {filtered.length === 0 ? (
          <p className="empty-msg">No tasks here. Add one below! 👇</p>
        ) : (
          filtered.map(task => (
            <div key={task.id} className={`task-item ${task.done ? "task-done" : ""}`}>
              <button
                className={`task-check ${task.done ? "checked" : ""}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : ""}
              </button>
              <span className="task-text">{task.text}</span>
              <span
                className="task-priority"
                style={{ color: PRIORITY_STYLE[task.priority].color, background: PRIORITY_STYLE[task.priority].bg }}
              >
                {task.priority}
              </span>
              <button className="task-delete" onClick={() => deleteTask(task.id)}>×</button>
            </div>
          ))
        )}
      </div>

      {/* Add Task */}
      <div className="add-task-row">
        <input
          className="skill-input"
          placeholder="Add a new task..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select
          className="category-select"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="btn-primary" onClick={addTask}>+ Add</button>
      </div>

      {doneCount > 0 && (
        <button className="btn-ghost" onClick={clearDone}>
          🗑 Clear Completed ({doneCount})
        </button>
      )}
    </section>
  );
}

export default Tasks;