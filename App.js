import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Progress from "./components/Progress";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("progress");

  return (
    <div className={dark ? "dark app-container" : "light app-container"}>

      {/* Theme Toggle */}
      <button className="toggle-btn" onClick={() => setDark(!dark)} title="Toggle Theme">
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Header */}
      <Header />

      {/* Nav Tabs */}
      <nav className="nav-tabs">
        {["progress", "skills", "tasks", "about"].map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "progress" && "📊 Progress"}
            {tab === "skills"   && "💡 Skills"}
            {tab === "tasks"    && "✅ Tasks"}
            {tab === "about"    && "🎯 Goal"}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "progress" && <Progress />}
        {activeTab === "skills"   && <Skills />}
        {activeTab === "tasks"    && <Tasks />}
        {activeTab === "about"    && <About />}
      </main>

      <Footer />
    </div>
  );
}

export default App;