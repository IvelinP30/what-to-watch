import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import People from "./pages/People";
import Providers from "./pages/Providers";
import Header from "./components/Header/Header";
import ItemDetails from './pages/ItemDetails';
import PersonDetailsPage from './pages/PersonDetails'
import SearchResults from './pages/SearchResults';
import Curtains from './components/Curtains/Curtains';
import Favorites from "./pages/Favorites";
import WatchLater from "./pages/WatchLater";
import AccountInfo from "./pages/AccountInfo";
import Recommendations from './pages/Recommendations';
import Footer from "./components/Footer/Footer"
import AuthDialog from "./components/AuthDialog";
import ProtectedRoute from "./components/ProtectedRoutes";

import { AuthProvider, AuthContext } from "./context/AuthContext"

import { HOME_PAGE, MOVIES_PAGE, SHOWS_PAGE, DETAILS_PAGE, PERSON_DETAILS_PAGE, SEARCH_PAGE, PEOPLE_PAGE, PROVIDERS_PAGE, ACCOUNT_FAVORITES, ACCOUNT_WATCH_LATER, ACCOUNT_INFO, ACCOUNT_RECOMMANDATIONS } from './common/routes';

import { Box } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";

function App() {
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    setFirstLoad(true);
  }, []);

  return (
    <Box overflow="hidden" position="relative">
      {firstLoad && <Curtains />}

      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Box>
  );
}
function AppContent() {
  const { authModalOpen, setAuthModalOpen } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        <Route path={HOME_PAGE} element={<Home />} />
        <Route path={MOVIES_PAGE} element={<Movies />} />
        <Route path={SHOWS_PAGE} element={<Shows />} />
        <Route path={PEOPLE_PAGE} element={<People />} />
        <Route path={PROVIDERS_PAGE} element={<Providers />} />
        <Route path={DETAILS_PAGE} element={<ItemDetails />} />
        <Route path={PERSON_DETAILS_PAGE} element={<PersonDetailsPage />} />
        <Route path={SEARCH_PAGE} element={<SearchResults />} />

        <Route
          path={ACCOUNT_FAVORITES}
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path={ACCOUNT_WATCH_LATER}
          element={
            <ProtectedRoute>
              <WatchLater />
            </ProtectedRoute>
          }
        />
        <Route
          path={ACCOUNT_INFO}
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path={ACCOUNT_RECOMMANDATIONS}
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      <AuthDialog isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}


export default App;
