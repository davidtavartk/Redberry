import EstateList from "../components/EstateList";
import FilterPanel from "../components/FilterPanel";
import Filters from "../components/Filters";



const LandingPage = () => {
    
    return (
        <div>
            <FilterPanel />
            <Filters />
            <EstateList />
        </div>
    );
};

export default LandingPage;