import { useEffect, useState } from "react";
import { numberInputQuantity } from "../../utils/numberInputQuantity";
import { useSelector } from "react-redux";

const PriceAndSizeOptions = ({ options, type, onLimitsChange, error }) => {
  const isPrice = type === "price";

  const selectedLimits = useSelector(
    (state) => state.filters.selectedFilters[type]
  );

  const [selectedLimitsLocal, setSelectedLimitsLocal] = useState({
    min: selectedLimits?.min || "",
    max: selectedLimits?.max || "",
  });

  const [minValue, setMinValue] = useState(selectedLimitsLocal.min);
  const [maxValue, setMaxValue] = useState(selectedLimitsLocal.max);

  useEffect(() => {
    if (selectedLimits) {
      setMinValue(selectedLimits.min);
      setMaxValue(selectedLimits.max);
    }
  }, [selectedLimits]);

  useEffect(() => {
    onLimitsChange(selectedLimitsLocal);
  }, [selectedLimitsLocal, onLimitsChange]);

  const handleMinChange = (e) => {
    const quantityLimit = isPrice ? 9 : 4;
    const newMinValue = numberInputQuantity(quantityLimit)(e.target.value);

    setMinValue(newMinValue);
    setSelectedLimitsLocal((prev) => ({
      ...prev,
      min: newMinValue,
    }));
  };

  const handleMaxChange = (e) => {
    const quantityLimit = isPrice ? 9 : 4;
    const newMaxValue = numberInputQuantity(quantityLimit)(e.target.value);

    setMaxValue(newMaxValue);
    setSelectedLimitsLocal((prev) => ({
      ...prev,
      max: newMaxValue,
    }));
  };

  const handleMinClick = (element) => {
    if(typeof element === 'string') {
      element = parseInt(element.replaceAll(",", ''))
    }

    setMinValue(element);
    setSelectedLimitsLocal((prev) => ({
      ...prev,
      min: element,
    }));
  };

  const handleMaxClick = (element) => {
    if(typeof element === 'string') {
      element = parseInt(element.replaceAll(",", ''))
    }
    setMaxValue(element);
    setSelectedLimitsLocal((prev) => ({
      ...prev,
      max: element,
    }));
  };

  return (
    <>
      <div className="prSz-option-inputs-container">
        <div className="input-wrapper">
          <input
            type="number"
            value={minValue}
            onChange={handleMinChange}
            placeholder="დან"
            min="0"
          />
          <span className="currency-symbol">{isPrice ? "₾" : "მ²"}</span>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            placeholder="მდე"
            max="10"
          />
          <span className="currency-symbol">{isPrice ? "₾" : "მ²"}</span>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="prsz-option-numbers">
        <div className="prSz-options">
          <label>{isPrice ? "მინ. ფასი" : "მინ. მ²"}</label>
          <div className="each-prSz-container">
            {options.map((element) => (
              <span
                className="each-prSz"
                key={element}
                onClick={() => handleMinClick(element)}
              >
                {" "}
                {element} {isPrice ? "₾" : "მ²"}
              </span>
            ))}
          </div>
        </div>

        <div className="prSz-options">
          <label>{isPrice ? "მაქს. ფასი" : "მაქს. მ²"}</label>
          <div className="each-prSz-container">
            {options.map((element) => (
              <span
                className="each-prSz"
                key={element}
                onClick={() => handleMaxClick(element)}
              >
                {" "}
                {element} {isPrice ? "₾" : "მ²"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceAndSizeOptions;
