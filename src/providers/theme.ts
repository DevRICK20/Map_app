import { createContext, useState } from "react";

const [themeState, setThemeState] = useState<"dark" | "light" | "system">(
  "system"
);

type Theme = "dark" | "light" | "system";
type ThemeContextType = { theme: Theme; toggleTheme: (theme: Theme) => void };

export const ThemeContext = createContext<ThemeContextType>({
  theme: themeState,
  toggleTheme: (theme) => {
    setThemeState(theme);
  },
});
