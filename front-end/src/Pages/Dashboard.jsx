import TopBar from "../Components/TopBar.jsx";
import SideBar from "../Components/SideBar.jsx";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <SideBar />
      <TopBar />
      <Box
        component="main"
        sx={{ ml: "250px", pt: "80px", minHeight: "100vh", bgcolor: "background.default" }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default Dashboard;
