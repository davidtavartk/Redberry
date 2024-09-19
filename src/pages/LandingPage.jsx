import { useSelector } from "react-redux";
import EstateList from "../components/EstateList";
import FilterPanel from "../components/FilterPanel";
import Filters from "../components/Filters";
import { initialState } from "../redux/filtersSlice";


const LandingPage = () => {
    const selectedFilters = useSelector((state) => state.filters.selectedFilters);
    const hasFilters = JSON.stringify(selectedFilters) !== JSON.stringify(initialState.selectedFilters);
    return (
        <div>
            <FilterPanel />
            {hasFilters && <Filters />}
            <EstateList />
        </div>
    );
};

export default LandingPage;