import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 260;

export default function SideBar() {
  const menuItems = [
    { label: "Home", icon: HomeIcon, path: "/dashboard/home" },
    { label: "Trending", icon: TrendingUpIcon, path: "/dashboard/trending" },
    { label: "Charts", icon: BarChartIcon, path: "/dashboard/charts" },
    { label: "Library", icon: LocalMoviesIcon, path: "/dashboard/library" },
    { label: "Settings", icon: SettingsIcon, path: "/dashboard/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          bgcolor: "background.paper",
          color: "text.primary",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          p: 3,
          color: "secondary.main",
          letterSpacing: 1,
        }}
      >
        Movie Stats
      </Typography>

      <Divider />

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(229,9,20,0.12)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <Icon />
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,

              "&:hover": {
                bgcolor: "rgba(229,9,20,0.12)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "error.main",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
