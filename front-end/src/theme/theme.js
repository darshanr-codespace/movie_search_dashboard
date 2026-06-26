import { createTheme } from "@mui/material/styles";

const createAppTheme = (mode = "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#E50914",
        dark: "#B20710",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: mode === "dark" ? "#FFFFFF" : "#000000",
        contrastText: mode === "dark" ? "#000000" : "#FFFFFF",
      },
      background: {
        default: mode === "dark" ? "#141414" : "#F4F4F6",
        paper: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#101010",
        secondary: mode === "dark" ? "#808080" : "#6E6E6E",
        disabled: mode === "dark" ? "#4D4D4D" : "#A0A0A0",
      },
      divider: mode === "dark" ? "#2A2A2A" : "#E0E0E0",
      action: {
        hover: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
        selected: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
      },
      error: {
        main: "#E50914",
      },
    },

    typography: {
      fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontFamily: '"Bebas Neue", sans-serif',
        fontWeight: 400,
        fontSize: "3.5rem",
        letterSpacing: "0.03em",
        lineHeight: 1.1,
      },
      h2: {
        fontFamily: '"Bebas Neue", sans-serif',
        fontWeight: 400,
        fontSize: "2.2rem",
        letterSpacing: "0.02em",
      },
      h3: {
        fontFamily: '"Bebas Neue", sans-serif',
        fontWeight: 400,
        fontSize: "1.6rem",
        letterSpacing: "0.02em",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.1rem",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        color: mode === "dark" ? "#808080" : "#6E6E6E",
        fontWeight: 300,
      },
      caption: {
        fontSize: "0.75rem",
        color: mode === "dark" ? "#808080" : "#6E6E6E",
        letterSpacing: "0.02em",
        fontWeight: 300,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: "0.01em",
      },
    },

    shape: {
      borderRadius: 4,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? "#141414" : "#F4F4F6",
            margin: 0,
            overflowX: "hidden",
            scrollbarColor: mode === "dark" ? "#404040 #141414" : "#C0C0C0 #F4F4F6",
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-track": {
              background: mode === "dark" ? "#141414" : "#F4F4F6",
            },
            "&::-webkit-scrollbar-thumb": {
              background: mode === "dark" ? "#404040" : "#C0C0C0",
              borderRadius: 4,
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: "10px 24px",
            fontSize: "1rem",
            fontWeight: 700,
          },
          containedPrimary: {
            backgroundColor: "#E50914",
            "&:hover": { backgroundColor: "#B20710" },
          },
          containedSecondary: {
            backgroundColor: mode === "dark" ? "#FFFFFF" : "#000000",
            color: mode === "dark" ? "#000000" : "#FFFFFF",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#C6C6C6" : "#333333",
            },
          },
          contained: {
            "&.MuiButton-containedInherit": {
              backgroundColor: mode === "dark" ? "rgba(109,109,110,0.7)" : "rgba(0,0,0,0.1)",
              color: mode === "dark" ? "#FFFFFF" : "#101010",
              "&:hover": {
                backgroundColor: mode === "dark" ? "rgba(109,109,110,0.5)" : "rgba(0,0,0,0.15)",
              },
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
            borderRadius: 4,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: mode === "dark" ? "0 8px 32px rgba(0,0,0,0.8)" : "0 8px 24px rgba(0,0,0,0.08)",
              zIndex: 1,
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "rgba(22,22,22,0.7)" : "rgba(245,245,245,0.9)",
            border: `1px solid ${mode === "dark" ? "#4D4D4D" : "#D0D0D0"}`,
            borderRadius: 4,
            color: mode === "dark" ? "#FFFFFF" : "#101010",
            "&:hover": { borderColor: mode === "dark" ? "#808080" : "#909090" },
            "&.Mui-focused": { borderColor: mode === "dark" ? "#FFFFFF" : "#000000" },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            backgroundColor: mode === "dark" ? "rgba(109,109,110,0.4)" : "rgba(0,0,0,0.05)",
            color: mode === "dark" ? "#FFFFFF" : "#101010",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === "dark" ? "#2A2A2A" : "#212121",
            color: "#FFFFFF",
            fontSize: "0.8rem",
            borderRadius: 4,
            border: "1px solid #404040",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: { borderColor: mode === "dark" ? "#2A2A2A" : "#E0E0E0" },
        },
      },
    },
  });

export default createAppTheme;
