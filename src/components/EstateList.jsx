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
    let matchesPrice = false;
    let matchesSize = false;
    let matchesBedrooms = false;
    let matchesRegion = false;
  
    // Check if any filters are selected
    const hasAnyFilter = selectedRegions.length > 0 || minPrice || maxPrice || minSize || maxSize || bedrooms;
  
    // Filter by regions
    if (selectedRegions.length > 0) {
      matchesRegion = selectedRegions.includes(estate.city.region.name);
    } else if (hasAnyFilter) {
      matchesRegion = false;
    } else {
      matchesRegion = true;
    }
  
    // Filter by price
    if (minPrice || maxPrice) {
      matchesPrice =
        (!minPrice || estate.price >= minPrice) &&
        (!maxPrice || estate.price <= maxPrice);
    } else if (hasAnyFilter) {
      matchesPrice = false;
    } else {
      matchesPrice = true;
    }
  
    // Filter by size
    if (minSize || maxSize) {
      matchesSize =
        (!minSize || estate.area >= minSize) &&
        (!maxSize || estate.area <= maxSize);
    } else if (hasAnyFilter) {
      matchesSize = false;
    } else {
      matchesSize = true;
    }
  
    // Filter by bedrooms
    if (bedrooms) {
      matchesBedrooms = estate.bedrooms === parseInt(bedrooms);
    } else if (hasAnyFilter) {
      matchesBedrooms = false;
    } else {
      matchesBedrooms = true;
    }
  
    // Return true if estate matches any of the filters
    return matchesPrice || matchesSize || matchesBedrooms || matchesRegion;
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
