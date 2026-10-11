"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("gg-theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable — theme still applies for this view
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.3] hover:bg-background/10"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
