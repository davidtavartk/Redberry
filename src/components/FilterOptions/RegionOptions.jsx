import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RegionOptions = ({options, onSelectionChange }) => {
  const selectedRegions = useSelector((state) => state.filters.selectedFilters.regions);
  const [selectedRegionsLocal, setSelectedRegionsLocal] = useState(selectedRegions);

  useEffect(() => {
    setSelectedRegionsLocal(selectedRegions);
  }, [selectedRegions]);

  useEffect(() => {
    onSelectionChange(selectedRegionsLocal);
  }, [selectedRegionsLocal, onSelectionChange]);
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    
    setSelectedRegionsLocal((prevSelected) => {
      const newSelection = checked
      ? [...prevSelected, value]
        : prevSelected.filter((region) => region !== value);

        return newSelection;
      });
      
    };
    
    
  return (
    <>
      {options.map((region) => (
        <div key={region.id} className="region-filter-option">
          <input
            type="checkbox"
            id={`region-${region.id}`}
            value={region.name}
            checked={selectedRegionsLocal.includes(region.name)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`region-${region.id}`}>{region.name}</label>
        </div>
      ))}
    </>
  );
};

export default RegionOptions;
