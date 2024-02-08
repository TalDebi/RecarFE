import { CacheProvider } from "@emotion/react";
import Navbar from "./Navbar"
import PostList from "./components/PostsList"
import Registration from "./components/Registration"
import { createTheme, ThemeProvider, colors } from '@mui/material';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// import { useState } from "react"
// import ListGroup from "./ListGroup"
// import Alert from "./Alert"W

// function App() {
//   const [cities, setCities] = useState(["London", "New York", "Paris", "Tokyo", "Delhi", "Dubai"])
//   const [cars, setCars] = useState(["BMW", "Mercedes", "Audi", "Lamborghini", "Ferrari", "Porsche"])
//   const [displayAleret, setDisplayAlert] = useState(false)

//   const onDeleteCity = (index: number) => {
//     console.log("Deleting city at index: " + index)
//     const tmp = cities.filter((city, i) => i !== index)
//     setCities(tmp)
//   }

//   const onDeleteCar = (index: number) => {
//     console.log("Deleting car at index: " + index)
//     setCars(cars.filter((car, i) => i !== index))
//   }

//   const openAlert = () => {
//     setDisplayAlert(true)
//   }

//   const onDismiss = () => {
//     setDisplayAlert(false)
//   }
//   return (
//     <div className="p-2">
//       {displayAleret && <Alert onDismiss={onDismiss}>This is an Alert!!!</Alert>}
//       <h1>Cities!!</h1>
//       <ListGroup items={cities} onDeleteItem={onDeleteCity} />

//       <h1>Cars!!</h1>
//       <ListGroup items={cars} onDeleteItem={onDeleteCar} />
//       <div className="mx-auto pt-2 d-flex" style={{ width: "300px" }}>
//         <button type="button"
//           className="btn btn-primary flex-fill"
//           onClick={openAlert}>
//           Open alert
//         </button>
//       </div>
//     </div>
//   )
// }

function App() {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  
  const theme = createTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: colors.green[600],
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
        <Navbar/>
        {/* <Registration />
        <PostList /> */}
      </ThemeProvider>
    </CacheProvider>
  )
}


export default App
