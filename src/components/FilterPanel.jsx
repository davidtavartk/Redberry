import { useEffect, useState } from "react";
import AddButton from "./AddButton";
import "./FilterPanel.sass";
import FilterDropdown from "./FilterDropdown";
import { getRegions } from "../api/swaggerApi";

const FilterPanel = () => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [regions, setRegions] = useState([]);
  const priceOptions = ["50,000","100,000","150,000","200,000","250,000"];
  const sizeOptions = ["50","100","150","200","250"];
  const bedroomOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        setRegions(response.data);
      } catch (error) {
        console.log(error);
        throw error
      }
    };

    fetchRegions();
  }, []);

  const toggleDropdown = (type) => {
    setFilterDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <div className="filter-panel container">
      <div className="filter-options">
        <div className="filter-item" onClick={() => toggleDropdown("region")}>
          <span>რეგიონი</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91247 0.337847C1.68466 0.110041 1.31532 0.110041 1.08751 0.337847C0.859705 0.565652 0.859705 0.934999 1.08751 1.1628L4.58751 4.6628C4.81532 4.89061 5.18466 4.89061 5.41247 4.6628L8.91247 1.1628C9.14028 0.934999 9.14028 0.565652 8.91247 0.337847C8.68466 0.110041 8.31532 0.110041 8.08751 0.337847L4.99999 3.42537L1.91247 0.337847Z"
              fill="#021526"
            />
          </svg>
          {filterDropdown === "region" && (
            <FilterDropdown
              type="region"
              title="რეგიონის მიხედვით"
              options={regions}
              onClose={() => setFilterDropdown(null)}
            />
          )}
        </div>

        <div className="filter-item" onClick={() => toggleDropdown("price")}>
          <span>საფასო კატეგორია</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91247 0.337847C1.68466 0.110041 1.31532 0.110041 1.08751 0.337847C0.859705 0.565652 0.859705 0.934999 1.08751 1.1628L4.58751 4.6628C4.81532 4.89061 5.18466 4.89061 5.41247 4.6628L8.91247 1.1628C9.14028 0.934999 9.14028 0.565652 8.91247 0.337847C8.68466 0.110041 8.31532 0.110041 8.08751 0.337847L4.99999 3.42537L1.91247 0.337847Z"
              fill="#021526"
            />
          </svg>
          {filterDropdown === "price" && (
            <FilterDropdown
              type="price"
              title="ფასის მიხედვით"
              options={priceOptions}
              onClose={() => setFilterDropdown(null)}
            />
          )}
        </div>

        <div className="filter-item" onClick={() => toggleDropdown("size")}>
          <span>ფართობი</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91247 0.337847C1.68466 0.110041 1.31532 0.110041 1.08751 0.337847C0.859705 0.565652 0.859705 0.934999 1.08751 1.1628L4.58751 4.6628C4.81532 4.89061 5.18466 4.89061 5.41247 4.6628L8.91247 1.1628C9.14028 0.934999 9.14028 0.565652 8.91247 0.337847C8.68466 0.110041 8.31532 0.110041 8.08751 0.337847L4.99999 3.42537L1.91247 0.337847Z"
              fill="#021526"
            />
          </svg>
          {filterDropdown === "size" && (
            <FilterDropdown
              type="size"
              title="ფართობის მიხედვით"
              options={sizeOptions}
              onClose={() => setFilterDropdown(null)}
            />
          )}
        </div>

        <div className="filter-item" onClick={() => toggleDropdown("bedrooms")}>
          <span>საძინებლების რაოდენობა</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91247 0.337847C1.68466 0.110041 1.31532 0.110041 1.08751 0.337847C0.859705 0.565652 0.859705 0.934999 1.08751 1.1628L4.58751 4.6628C4.81532 4.89061 5.18466 4.89061 5.41247 4.6628L8.91247 1.1628C9.14028 0.934999 9.14028 0.565652 8.91247 0.337847C8.68466 0.110041 8.31532 0.110041 8.08751 0.337847L4.99999 3.42537L1.91247 0.337847Z"
              fill="#021526"
            />
          </svg>
          {filterDropdown === "bedrooms" && (
            <FilterDropdown
              type="bedrooms"
              title="საძინებლების რაოდენობა"
              options={bedroomOptions}
              onClose={() => setFilterDropdown(null)}
            />
          )}
        </div>
      </div>

      <div className="add-buttons">
        <AddButton filled={true}>ლისტინგის დამატება</AddButton>
        <AddButton filled={false}>აგენტის დამატება</AddButton>
      </div>
    </div>
  );
};

export default FilterPanel;
