import usePrefersColorScheme from "use-prefers-color-scheme";
import { defaults } from "chart.js";
import { useDashboard } from "./useDashboard";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const prefersColorScheme = usePrefersColorScheme();
  const { dashboard } = useDashboard();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const r = document.documentElement;

    r.style.setProperty(
      "--onvo-font-override",
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    );
    defaults.font.family =
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    let newTheme: "light" | "dark" =
      prefersColorScheme === "dark" ? "dark" : "light";
    if (dashboard && dashboard.settings) {
      if (dashboard.settings?.theme === "dark") {
        newTheme = "dark";
        document.body.classList.add("onvo-dark");
        defaults.borderColor = "#334155";
      } else if (dashboard.settings?.theme === "light") {
        newTheme = "light";
        document.body.classList.remove("onvo-dark");
        defaults.borderColor = "#cbd5e1";
      } else {
        if (prefersColorScheme === "dark") {
          document.body.classList.add("onvo-dark");
          newTheme = "dark";
          defaults.borderColor = "#334155";
        } else {
          newTheme = "light";
          document.body.classList.remove("onvo-dark");
          defaults.borderColor = "#cbd5e1";
        }
      }

      const settings = dashboard.settings;
      r.style.setProperty("--onvo-background-color", settings.light_background);
      r.style.setProperty(
        "--onvo-dark-background-color",
        settings.dark_background
      );

      r.style.setProperty("--onvo-foreground-color", settings.light_foreground);
      r.style.setProperty(
        "--onvo-dark-foreground-color",
        settings.dark_foreground
      );

      r.style.setProperty(
        "--onvo-dark-font-color",
        settings.dark_text || "#aaaaaa"
      );
      r.style.setProperty(
        "--onvo-font-color",
        settings.light_text || "#666666"
      );

      if (newTheme === "dark") {
        defaults.color = settings.dark_text || "#aaaaaa";
      } else {
        defaults.color = settings.light_text || "#666666";
      }

      if (dashboard.settings.font !== "inter") {
        r.style.setProperty("--onvo-font-override", settings.font);
        defaults.font.family = settings.font;
      }

      setTheme(newTheme);
    }
    return () => {
      r.style.setProperty("--onvo-background-color", "");
      r.style.setProperty("--onvo-foreground-color", "");
      r.style.setProperty("--onvo-font-override", "");

      defaults.font.family =
        "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    };
  }, [dashboard, prefersColorScheme]);

  return theme;
};
