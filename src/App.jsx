// import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import routePaths from "./routes/routePaths";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={routePaths.LandingPage} element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
