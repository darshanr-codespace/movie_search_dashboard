import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import createAppTheme from "./theme/theme.js";

import "./index.css";
import App from "./App.jsx";

function Root() {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("themeMode") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    window.localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App themeMode={themeMode} setThemeMode={setThemeMode} />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
