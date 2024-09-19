import { useEffect, useState } from "react";
import { numberInputQuantity } from "../../utils/numberInputQuantity";
import { useSelector } from "react-redux";

const BedroomsOptions = ({onSelectionChange, error}) => {
  const selectedBedrooms = useSelector((state) => state.filters.selectedFilters.bedrooms);
  const [selectedBedroomsLocal, setSelectedBedroomsLocal] = useState(selectedBedrooms || '');

  useEffect(() => {
    onSelectionChange(selectedBedroomsLocal);
  }, [selectedBedroomsLocal, onSelectionChange]);

  const handleInputChange = (e) => {
    const newValue = numberInputQuantity(2, 12)(e.target.value);

    setSelectedBedroomsLocal(newValue);
  };   

  return (
    <div className="bedrooms-container">
      {error && <p className="error-message">{error}</p>}
      <input
        type="number"
        id="bedrooms"
        name="bedrooms"
        value={selectedBedroomsLocal}
        onChange={handleInputChange}
        className="bedrooms-input"
        placeholder="0"
      />
    </div>
  );
};

export default BedroomsOptions;
