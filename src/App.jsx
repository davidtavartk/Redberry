// import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import routePaths from "./routes/routePaths";
import LandingPage from "./pages/LandingPage";
import AddListingPage from "./pages/AddListingPage";

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={routePaths.LandingPage} element={<LandingPage />} />
          <Route path={routePaths.AddListingPage} element={<AddListingPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


const token = "9d0096dc-8069-4e88-8d9f-ac0004474d57"