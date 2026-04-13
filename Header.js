import { useState, useEffect } from "react";

const QUOTES = [
  "Every expert was once a beginner. Keep going! 🚀",
  "Consistency beats talent every single day. 💪",
  "Your dream job is one commit away. 👨‍💻",
  "Code today. Dream job tomorrow. ⚡",
  "The best time to start was yesterday. Now is second best. 🔥",
];

function Header() {
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    const savedStreak = parseInt(localStorage.getItem("streak") || "1");
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (!lastVisit) {
      localStorage.setItem("streak", "1");
      localStorage.setItem("lastVisit", today);
      setStreak(1);
    } else if (lastVisit === today) {
      setStreak(savedStreak);
    } else {
      const newStreak = savedStreak + 1;
      localStorage.setItem("streak", String(newStreak));
      localStorage.setItem("lastVisit", today);
      setStreak(newStreak);
    }
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">PT</div>
        <div className="header-text">
          <h1 className="header-title">Placement Tracker</h1>
          <p className="header-sub">Your personalized journey to a dream tech job</p>
        </div>
        <div className="streak-badge">
          <span className="streak-fire">🔥</span>
          <span className="streak-count">{streak}</span>
          <span className="streak-label">day streak</span>
        </div>
      </div>
      <p className="header-quote">"{quote}"</p>
    </header>
  );
}

export default Header;