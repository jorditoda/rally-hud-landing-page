import {useContext, useEffect, useState} from "react";
import {ConfigContext} from "../../utils/configContext";

const STORAGE_KEY = "rally-theme";

function ThemeSwitcher() {
  const config = useContext(ConfigContext);
  const darkTheme = config?.theme ?? "rally-dark";
  const lightTheme = config?.alternateTheme ?? "rally-light";

    // The active theme is read from the DOM: it's the only reliable source because it can
// have changed the inline script before React hydrated.
  const [activeTheme, setActiveTheme] = useState(darkTheme);

  useEffect(() => {
    setActiveTheme(document.documentElement.getAttribute("data-theme") ?? darkTheme);
  }, []);

  const isDark = activeTheme === darkTheme;

  function toggle() {
    const next = isDark ? lightTheme : darkTheme;
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
        // Without persistence, the change remains valid during the session.
    }
    setActiveTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="btn btn-ghost btn-sm px-2 gap-2"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      <span className="sr-only">
        {isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      </span>
    </button>
  );
}

export default ThemeSwitcher;