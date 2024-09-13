import "./Navbar.sass";
import routePaths from "../routes/routePaths";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <div className="navbar container">
            <Link to={routePaths.LandingPage}>
                <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
        </div>
    );
};

export default Navbar;