import { useDispatch, useSelector } from "react-redux";
import { clearFilters, removeFilter } from "../redux/filtersSlice";
import "./Filters.sass";

const Filters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);

  const localRegions =
    JSON.parse(localStorage.getItem("selectedRegions")) || [];
  const localLimits = JSON.parse(localStorage.getItem("selectedLimits")) || {
    price: {},
    size: {},
  };
  const localBedrooms = localStorage.getItem("selectedBedrooms");

  const hasFilters =
    localRegions.length > 0 ||
    localLimits.price.min !== undefined ||
    localLimits.price.max !== undefined ||
    localLimits.size.min !== undefined ||
    localLimits.size.max !== undefined ||
    (localBedrooms && localBedrooms > 0) ||
    selectedFilters.regions.length > 0 ||
    selectedFilters.price.min !== "" ||
    selectedFilters.price.max !== "" ||
    selectedFilters.size.min !== "" ||
    selectedFilters.size.max !== "" ||
    selectedFilters.bedrooms;

  const handleDeleteFilter = (type, value) => {
    dispatch(removeFilter({ type, value }));

    if (type === "region") {
      const updatedRegions = selectedFilters.regions.filter(
        (region) => region !== value
      );

      if (updatedRegions.length === 0) {
        localStorage.removeItem("selectedRegions");
      } else {
        localStorage.setItem("selectedRegions", JSON.stringify(updatedRegions));
      }
    }

    if (type === "price") {
      const limits = JSON.parse(localStorage.getItem("selectedLimits")) || {
        price: {},
        size: {},
      };
      limits.price = {};
      localStorage.setItem("selectedLimits", JSON.stringify(limits));
    }

    // Handle size limits
    if (type === "size") {
      const limits = JSON.parse(localStorage.getItem("selectedLimits")) || {
        price: {},
        size: {},
      };
      limits.size = {};
      localStorage.setItem("selectedLimits", JSON.stringify(limits));
    }

    if (type === "bedrooms") {
      localStorage.removeItem("selectedBedrooms");
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    localStorage.removeItem("selectedRegions");
    localStorage.removeItem("selectedLimits");
    localStorage.removeItem("selectedBedrooms");
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

    const localRegions =
      JSON.parse(localStorage.getItem("selectedRegions")) || [];
    const localBedrooms = localStorage.getItem("selectedBedrooms");

    const regionsToDisplay =
      selectedFilters.regions.length > 0
        ? selectedFilters.regions
        : localRegions;

    regionsToDisplay.forEach((region) => {
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
    const bedrooms =
      selectedFilters.bedrooms ||
      (localBedrooms ? parseInt(localBedrooms) : null);
    if (bedrooms) {
      const isPlural = bedrooms > 1 ? "s" : "";
      buttons.push(
        createFilterButton(
          `${bedrooms} Bedroom${isPlural}`,
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
      {hasFilters ? (
        <p onClick={handleClearFilters}>გასუფთავება</p>
      ) : (
        <p onClick={handleClearFilters} style={{ display: "none" }}>
          გასუფთავება
        </p>
      )}
    </div>
  );
};

export default Filters;
