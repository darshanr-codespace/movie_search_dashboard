import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  Divider,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";

function Settings({ themeMode, setThemeMode }) {
  useEffect(() => {
    document.title = "Movie Stats | Settings";
  }, []);

  const [darkMode, setDarkMode] = useState(themeMode === "dark");
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    setDarkMode(themeMode === "dark");
  }, [themeMode]);

  useEffect(() => {
    const savedCompact = window.localStorage.getItem("compactSidebar") === "true";
    const savedNotifications = window.localStorage.getItem("notificationsEnabled");

    setCompactSidebar(savedCompact);
    setNotificationsEnabled(
      savedNotifications === null ? true : savedNotifications === "true"
    );
  }, []);

  const handleThemeToggle = (event) => {
    const nextMode = event.target.checked ? "dark" : "light";
    setThemeMode(nextMode);
    window.localStorage.setItem("themeMode", nextMode);
  };

  const handleCompactToggle = (event) => {
    const nextValue = event.target.checked;
    setCompactSidebar(nextValue);
    window.localStorage.setItem("compactSidebar", nextValue.toString());
  };

  const handleNotificationsToggle = (event) => {
    const nextValue = event.target.checked;
    setNotificationsEnabled(nextValue);
    window.localStorage.setItem("notificationsEnabled", nextValue.toString());
  };

  const resetPreferences = () => {
    window.localStorage.removeItem("themeMode");
    window.localStorage.removeItem("compactSidebar");
    window.localStorage.removeItem("notificationsEnabled");
    setThemeMode("dark");
    setCompactSidebar(false);
    setNotificationsEnabled(true);
  };

  return (
    <Box sx={{ p: 4, color: "text.primary" }}>
      <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
        Settings
      </Typography>

      <Stack spacing={3}>
        <Card sx={{ p: 3, bgcolor: "background.paper" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Appearance
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleThemeToggle}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ color: "text.primary" }}>
                  {darkMode ? "Dark mode" : "Light mode"}
                </Typography>
              }
              icon={<Brightness7Icon />}
              checkedIcon={<Brightness4Icon />}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={compactSidebar}
                  onChange={handleCompactToggle}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ color: "text.primary" }}>
                  Compact sidebar
                </Typography>
              }
              icon={<ViewCompactIcon />}
              checkedIcon={<ViewCompactIcon />}
            />
          </Stack>
        </Card>

        <Card sx={{ p: 3, bgcolor: "background.paper" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Notifications
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Enable alerts for new trending titles, analytics updates, and app recommendations.
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ color: "text.primary" }}>
                  Notifications
                </Typography>
              }
              icon={<NotificationsActiveIcon />}
              checkedIcon={<NotificationsActiveIcon />}
            />
          </Stack>
        </Card>

        <Card sx={{ p: 3, bgcolor: "background.paper" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Preferences</Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Save your preferred appearance settings and reset the dashboard defaults whenever you need.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button variant="contained" color="secondary" onClick={resetPreferences}>
            Reset preferences
          </Button>
        </Card>
      </Stack>
    </Box>
  );
}

export default Settings;
