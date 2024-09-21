import "./FilterDropdown.sass";
import RegionOptions from "./FilterOptions/RegionOptions";
import PriceAndSizeOptions from "./FilterOptions/PriceAndSizeOptions";
import BedroomsOptions from "./FilterOptions/BedroomsOptions";
import { useDispatch } from "react-redux";
import { addFilter } from "../redux/filtersSlice";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FilterDropdown = ({ title, type, options, onClose }) => {
  const dispatch = useDispatch();
  const [selectedRegions, setSelectedRegions] = useState(() => {
    // Get initial state from localStorage
    return JSON.parse(localStorage.getItem("selectedRegions")) || [];
  });
  const [selectedLimits, setSelectedLimits] = useState(() => {
    // Get initial state from localStorage
    return JSON.parse(localStorage.getItem("selectedLimits")) || {};
  });
  const [selectedBedrooms, setSelectedBedrooms] = useState(() => {
    // Get initial state from localStorage
    return localStorage.getItem("selectedBedrooms") || "";
  });
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleSelectedRegionsChange = (regions) => {
    setSelectedRegions(regions);
  };

  const validateLimits = () => {
    const { min, max } = selectedLimits;
    if (min && max && parseFloat(min) > parseFloat(max)) {
      setError("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
      return false;
    }
    setError(null);
    return true;
  };

  const validateBedrooms = () => {
    if (selectedBedrooms <= 0) {
      setError("მინიმუმი რაოდენობა არის 1");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSelectedLimitsChange = (limits) => {
    setSelectedLimits(limits);
  };

  const handleSelectedBedroomsChange = (quantity) => {
    setSelectedBedrooms(quantity);
  };

  const handleApplyFilters = () => {
    if (type === "region") {
      dispatch(addFilter({ type, value: selectedRegions }));
      localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
    }
    if (type === "price" || type === "size") {
      const isValid = validateLimits();
      if (!isValid) return;
      dispatch(addFilter({ type, value: selectedLimits }));
      localStorage.setItem("selectedLimits", JSON.stringify(selectedLimits));
    }

    if (type === "bedrooms") {
      const isValid = validateBedrooms();
      if (!isValid) return;
      dispatch(addFilter({ type, value: selectedBedrooms }));
      localStorage.setItem("selectedBedrooms", selectedBedrooms);
    }

    onClose();
  };

  const renderOptions = () => {
    switch (type) {
      case "region":
        return (
          <RegionOptions
            options={options}
            onSelectionChange={handleSelectedRegionsChange}
          />
        );
      case "price":
        return (
          <PriceAndSizeOptions
            options={options}
            type={"price"}
            onLimitsChange={handleSelectedLimitsChange}
            error={error}
          />
        );
      case "size":
        return (
          <PriceAndSizeOptions
            options={options}
            type={"size"}
            onLimitsChange={handleSelectedLimitsChange}
            error={error}
          />
        );
      case "bedrooms":
        return (
          <BedroomsOptions
            options={options}
            type={"bedrooms"}
            onSelectionChange={handleSelectedBedroomsChange}
            error={error}
          />
        );
      default:
        return <span>No options available</span>;
    }
  };

  return (
    <div className="filter-dropdown" onClick={handleClick}>
      <div className="dropdown-main-content">
        <h2>{title}</h2>
        <div className={`dropdown-content ${type}`}>{renderOptions()}</div>
      </div>
      <div className="dropdown-footer">
        <button onClick={handleApplyFilters}>
          <p>არჩევა</p>
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
