export const numberInputQuantity = (max, limitMaxValue = null, limitMinValue = 0) => {
  return (value) => {

    if (isNaN(value)) {
      value = "";
    }

    // Make sure, not too much characters as numbers are passed
    if (value.toString().length > max) {
      value = value.toString().slice(0, max);
    }

    // Make sure max value is restricted
    if (limitMaxValue !== null && value > limitMaxValue) {
      value = limitMaxValue;
    }

    // Make sure min value is restricted
    if (value < limitMinValue) {
      value = limitMinValue;
    }

    return value;
  };
};
