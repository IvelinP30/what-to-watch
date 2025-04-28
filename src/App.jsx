import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import People from "./pages/People";
import Providers from "./pages/Providers";
import Header from "./components/Header/Header";
import ItemDetails from './pages/ItemDetails';
import SearchResults from './pages/SearchResults';
import Curtains from './components/Curtains/Curtains';
import Footer from "./components/Footer/Footer"

import { HOME_PAGE, MOVIES_PAGE, SHOWS_PAGE, DETAILS_PAGE, SEARCH_PAGE, PEOPLE_PAGE, PROVIDERS_PAGE } from './common/routes';

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    setFirstLoad(true);
  }, []);

  return (
    <Box overflow="hidden" position="relative">
      {firstLoad && <Curtains />}

      <Header />
      <Routes>
        <Route path={HOME_PAGE} element={<Home />}></Route>
        <Route path={MOVIES_PAGE} element={<Movies />}></Route>
        <Route path={SHOWS_PAGE} element={<Shows />}></Route>
        <Route path={PEOPLE_PAGE} element={<People />}></Route>
        <Route path={PROVIDERS_PAGE} element={<Providers />}></Route>
        <Route path={DETAILS_PAGE} element={<ItemDetails />}></Route>
        <Route path={SEARCH_PAGE} element={<SearchResults />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
