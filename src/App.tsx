import { CacheProvider } from "@emotion/react";
import Navbar from "./Navbar";
import PostList from "./components/PostsList";
import Registration from "./pages/Registration";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import NoPage from "./pages/NoPage";
import Search from "./pages/Search/Search";
import Login from "./pages/Login";
import MyCars from "./pages/MyCars/MyCars";
import Car from "./pages/Car/Car";
import BasePage from "./pages/BasePage";

function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: colors.green[600],
        contrastText: "#f7f7eb",
      },
      secondary: {
        main: "#f7f7eb",
        contrastText: colors.green[700],
      },
      background: {
        default: colors.grey[100],
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  document.dir = "rtl";

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Navigate to="/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route
                path="search"
                element={
                  <BasePage>
                    <Search />
                  </BasePage>
                }
              />
              <Route
                path="Car/:carID"
                element={
                  <BasePage>
                    <Car />
                  </BasePage>
                }
              />
              <Route
                path="myCars"
                element={
                  <BasePage>
                    <MyCars />
                  </BasePage>
                }
              />
              <Route
                path="*"
                element={
                  <BasePage>
                    <NoPage />
                  </BasePage>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
