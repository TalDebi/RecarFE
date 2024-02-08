import { CacheProvider } from "@emotion/react";
import Navbar from "./Navbar"
import PostList from "./components/PostsList"
import Registration from "./pages/Registration"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, colors } from '@mui/material';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import NoPage from "./pages/NoPage";
import Search from "./pages/Search";
import MyCars from "./pages/MyCars";

function App() {  
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  
  const theme = createTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: colors.green[500],
        contrastText: '#f7f7eb',
      },
      secondary: {
        main: '#f7f7eb',
        contrastText: colors.green[600],
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  document.dir = 'rtl';

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Navigate to="/registration" />} />
            <Route path="registration" element={<Registration />} />
            <Route path="search" element={<Search />} />
            <Route path="myCars" element={<MyCars />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  )
}


export default App
