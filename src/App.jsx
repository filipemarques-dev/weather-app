import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import About from "./pages/About";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  //Load saved preference on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("darkMode"));
    if (saved !== null) setDarkMode(saved);
  }, []);

  //Add or remove dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  //Toggle and save preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: darkMode ? "#444" : "#ddd",
            color: darkMode ? "#eee" : "#222",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<Weather />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
