import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import RequireAuth from "./Components/RequireAuth.jsx";
import Welcome from "./Pages/Welcome.jsx";
import Library from "./Pages/Library.jsx";
import Trending from "./Pages/Trending.jsx";
import Charts from "./Pages/Charts.jsx";
import Home from "./Pages/Home.jsx";
import Settings from "./Pages/Settings.jsx";
import Details from "./Pages/Details.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";

function App({ themeMode, setThemeMode }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route path="home" element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="charts" element={<Charts />} />
          <Route path="library" element={<Library />} />
          <Route
            path="settings"
            element={<Settings themeMode={themeMode} setThemeMode={setThemeMode} />}
          />
          <Route path="details" element={<Details/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
