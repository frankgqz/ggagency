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
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#222228] text-[15px] leading-none shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.3] hover:bg-[#2d2d35] active:scale-[1.12] active:bg-[#3a3a44] sm:h-10 sm:w-10 sm:text-[17px]"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
