// import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import routePaths from "./routes/routePaths";
import LandingPage from "./pages/LandingPage";
import AddListingPage from "./pages/AddListingPage";
import ListingPage from "./pages/ListingPage";

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={routePaths.LandingPage} element={<LandingPage />} />
          <Route path={routePaths.AddListingPage} element={<AddListingPage />} />
          <Route path={routePaths.ListingPage} element={<ListingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
