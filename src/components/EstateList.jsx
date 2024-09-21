import "./EstateList.sass";
import { getRealEstates } from "../api/swaggerApi";
import { useEffect, useState } from "react";
import EstateItem from "./EstateItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";

const EstateList = () => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedFilters = useSelector((state) => state.filters.selectedFilters);

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await getRealEstates();
        setEstates(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("Error fetching estates: ", error);
        setError("აღნიშნული მონაცემებით განცხადება არ იძებნება");
      } finally {
        setLoading(false);
      }
    };

    fetchRealEstates();
  }, []);
  
  const filteredEstates = estates.filter((estate) => {
    const { min: minPrice, max: maxPrice } = selectedFilters.price;
    const { min: minSize, max: maxSize } = selectedFilters.size;
    const bedrooms = selectedFilters.bedrooms;
    const selectedRegions = selectedFilters.regions;
  
    // Initialize match variables to false
    let matchesPrice = true; // Assume true unless filters are applied
    let matchesSize = true;  // Assume true unless filters are applied
    let matchesBedrooms = true; // Assume true unless filters are applied
    let matchesRegion = true; // Assume true unless filters are applied
  
    // Check if localStorage has any relevant filters
    const localStorageRegions = JSON.parse(localStorage.getItem('selectedRegions')) || [];
    const localStorageLimits = JSON.parse(localStorage.getItem('selectedLimits')) || {};
    const localStorageBedrooms = JSON.parse(localStorage.getItem('selectedBedrooms')) || null;
  
    // Use localStorage values if they exist
    const regionsToCheck = localStorageRegions.length > 0 ? localStorageRegions : selectedRegions;
    const priceLimits = Object.keys(localStorageLimits).length > 0 ? localStorageLimits : selectedFilters.price;
    const selectedBedroomsCount = localStorageBedrooms !== null ? localStorageBedrooms : bedrooms;
  
    // Filter by regions
    if (regionsToCheck.length > 0) {
      matchesRegion = regionsToCheck.includes(estate.city.region.name);
    }
  
    // Filter by price
    const { min: localMinPrice, max: localMaxPrice } = priceLimits;
    if (localMinPrice || localMaxPrice) {
      matchesPrice =
        (!localMinPrice || estate.price >= localMinPrice) &&
        (!localMaxPrice || estate.price <= localMaxPrice);
    }
  
    // Filter by size
    if (minSize || maxSize) {
      matchesSize =
        (!minSize || estate.area >= minSize) &&
        (!maxSize || estate.area <= maxSize);
    }
  
    // Filter by bedrooms
    if (selectedBedroomsCount) {
      matchesBedrooms = estate.bedrooms === parseInt(selectedBedroomsCount);
    }
  
    // Return true if estate matches all filters
    return matchesPrice && matchesSize && matchesBedrooms && matchesRegion;
  });
  
  

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="estate-list-error container">{error}</div>;
  }

  return (
    <div>
      {filteredEstates.length > 0 ? (
        <div className="estate-list-container">
          {filteredEstates.map((estate) => (
            <Link key={estate.id} to={routePaths.ListingPage.replace(':id', estate.id)}>
              <EstateItem estate={estate} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="container">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      )}
    </div>
  );
};

export default EstateList;
