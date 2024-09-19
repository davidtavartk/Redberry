import { useDispatch, useSelector } from "react-redux";
import { clearFilters, removeFilter } from "../redux/filtersSlice";
import "./Filters.sass";

const Filters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  
  const handleDeleteFilter = (type, value) => {
    dispatch(removeFilter({ type, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const createFilterButton = (label, key, type, value) => (
    <button
      className="filter-circle"
      onClick={() => handleDeleteFilter(type, value)}
      key={key}
    >
      {label}
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 4L3.5 11"
          stroke="#354451"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 4L10.5 11"
          stroke="#354451"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const renderButtons = () => {
    const buttons = [];

    // Region buttons
    selectedFilters.regions.forEach((region) => {
      buttons.push(createFilterButton(region, region, "region", region));
    });

    // Price filter button
    if (selectedFilters.price.min !== "" && selectedFilters.price.max !== "") {
      buttons.push(
        createFilterButton(
          `${selectedFilters.price.min}₾ - ${selectedFilters.price.max}₾`,
          "price",
          "price",
          null
        )
      );
    }

    // Size filter button
    if (selectedFilters.size.min !== "" && selectedFilters.size.max !== "") {
      buttons.push(
        createFilterButton(
          `${selectedFilters.size.min}მ² - ${selectedFilters.size.max}მ²`,
          "size",
          "size",
          null
        )
      );
    }

    // Bedrooms filter button
    if (selectedFilters.bedrooms) {
      const isPlural = selectedFilters.bedrooms > 1 ? "s" : "";
      buttons.push(
        createFilterButton(
          `${selectedFilters.bedrooms} Bedroom${isPlural}`,
          "bedrooms",
          "bedrooms",
          null
        )
      );
    }

    return buttons;
  };

  return (
    <div className="filters">
      <div className="filters-selected">{renderButtons()}</div>
      <p onClick={handleClearFilters}>გასუფთავება</p>
    </div>
  );
};

export default Filters;
