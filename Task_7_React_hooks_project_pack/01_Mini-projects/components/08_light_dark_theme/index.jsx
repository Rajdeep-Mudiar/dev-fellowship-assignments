import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import "./theme.css";

export default function LightDarkMode() {
  const getSystemTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useLocalStorage("theme", getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [setTheme]);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="theme-component-wrapper" data-theme={theme}>
        <h1>Theme Switcher</h1>
        <p>Toggle between light and dark mode for a better viewing experience</p>
        <div className="toggle-wrapper">
          <span className="theme-label">{theme} Mode</span>
          <button
            className="toggle-btn"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <div className="toggle-circle">
              <span className="toggle-icon">
                {theme === "light" ? "☀️" : "🌙"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}