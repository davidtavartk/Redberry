import "./pageStyles/AddListingPage.sass";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";
import { useEffect, useState } from "react";
import { getAgents, getCities, getRegions } from "../api/swaggerApi";
import { useForm } from "react-hook-form";

const AddListingPage = () => {
  const [agents, setAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [transactionType, setTransactionType] = useState("sale");
  const [fileName, setFileName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    const handleRegionChange = (e) => {
      setSelectedRegion(e.target.value);
    };

    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await getCities();
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchAgents();
    fetchRegions();
    fetchCities();
  }, []);

  const handleTransactionChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "");
  };

  const onSubmit = async (data) => {
    
  };

  return (
    <div className="add-listing">
      <h1>ლისტინგის დამატება</h1>

      <form className="add-listing-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="radio-group">
          <h2>გარიგების ტიპი</h2>
          <div className="radio-group-inner">
            <label>
              <input
                type="radio"
                name="transactionType"
                value="sale"
                checked={transactionType === "sale"}
                onChange={handleTransactionChange}
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                name="transactionType"
                value="rent"
                checked={transactionType === "rent"}
                onChange={handleTransactionChange}
              />
              ქირავდება
            </label>
          </div>
        </div>

        <div className="form-group location-group">
          <h2>მდებარეობა</h2>
          <div className="location-inputs">
            <div className="address-group">
              <div className="form-field">
                <label>მისამართი *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="მისამართი"
                  {...register("address", {
                    required: "მისამართის შეყვანა აუცილებელია",
                    minLength: {
                      value: 2,
                      message: "მინიმუმ ორი სიმბოლო",
                    },
                  })}
                />
                <p style={{ color: errors.address ? "red" : "inherit" }}>
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1.4082L4.125 9.59002L1 5.87101"
                      stroke="#021526"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {errors.address
                    ? errors.address.message
                    : "მინიმუმ ორი სიმბოლო"}
                </p>
              </div>
              
              {/* Zip Code */}
              <div className="form-field">
                <label>საფოსტო ინდექსი *</label>
                <input
                  type="text"
                  placeholder="საფოსტო ინდექსი"
                  {...register("zip_code", {
                    required: "საფოსტო ინდექსის შეყვანა აუცილებელია",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "მხოლოდ რიცხვები",
                    },
                  })}
                />
                <p style={{ color: errors.zip_code ? "red" : "inherit" }}>
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1.4082L4.125 9.59002L1 5.87101"
                      stroke="#021526"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {errors.zip_code
                    ? errors.zip_code.message
                    : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>

            {/* Region and City */}
            <div className="dropdown-group">
              <div className="form-field">
                <label>რეგიონი</label>
                <select
                  {...register("region", {
                    required: "რეგიონის არჩევა აუცილებელია",
                  })}
                >
                  <option value="">აირჩიეთ რეგიონი</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p style={{ color: "red" }}>{errors.region.message}</p>
                )}
              </div>
              <div className="form-field">
                <label>ქალაქი</label>
                <select
                  {...register("city", {
                    required: "ქალაქის არჩევა აუცილებელია",
                  })}
                >
                  <option value="">აირჩიეთ ქალაქი</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>




          </div>
        </div>

        <div className="form-section form-group">
          <h2>ბინის დეტალები</h2>

          {/* Price */}
          <div className="input-group">
            <div className="input-container">
              <label htmlFor="price">ფასი</label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "ფასის შეყვანა აუცილებელია",
                  validate: {
                    isNumber: (value) =>
                      /^\d+$/.test(value) || "მხოლოდ რიცხვები",
                    maxDigits: (value) =>
                      value.length <= 12 || "მაქსიმუმ 12 სიმბოლო",
                  },
                })}
              />
              <p style={{ color: errors.price ? "red" : "inherit" }}>
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.4082L4.125 9.59002L1 5.87101"
                    stroke="#021526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {errors.price ? errors.price.message : "მხოლოდ რიცხვები"}
              </p>
            </div>

            {/* Area */}
            <div className="input-container">
              <label htmlFor="area">ფართობი</label>
              <input
                type="number"
                id="area"
                {...register("area", {
                  required: "ფართობის შეყვანა აუცილებელია",
                  validate: {
                    isNumber: (value) =>
                      /^\d+$/.test(value) || "მხოლოდ რიცხვები",
                    maxDigits: (value) =>
                      value.length <= 12 || "მაქსიმუმ 12 სიმბოლო",
                  },
                })}
              />
              <p style={{ color: errors.area ? "red" : "inherit" }}>
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.4082L4.125 9.59002L1 5.87101"
                    stroke="#021526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {errors.area ? errors.area.message : "მხოლოდ რიცხვები"}
              </p>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="input-container">
            <label htmlFor="bedrooms">საძინებლების რაოდენობა</label>
            <input
              type="number"
              id="bedrooms"
              {...register("bedrooms", {
                required: "საძინებლების რაოდენობის შეყვანა აუცილებელია",
                validate: {
                  isNumber: (value) => /^\d+$/.test(value) || "მხოლოდ რიცხვები",
                },
              })}
            />
            <p style={{ color: errors.bedrooms ? "red" : "inherit" }}>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1.4082L4.125 9.59002L1 5.87101"
                  stroke="#021526"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {errors.bedrooms ? errors.bedrooms.message : "მხოლოდ რიცხვები"}
            </p>
          </div>

          {/* Description */}
          <div className="input-container description">
            <label htmlFor="description">აღწერა</label>
            <textarea
              id="description"
              {...register("description", {
                required: "აღწერის შეყვანა აუცილებელია",
                validate: {
                  minWords: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount >= 5 || "მინიმუმ ხუთი სიტყვა";
                  },
                  maxChars: (value) => {
                    return value.length <= 150 || "მაქსიმუმ 150 სიმბოლო";
                  },
                },
              })}
            ></textarea>
            <p style={{ color: errors.description ? "red" : "inherit" }}>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1.4082L4.125 9.59002L1 5.87101"
                  stroke="#021526"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {errors.description
                ? errors.description.message
                : "მინიმუმ ხუთი სიტყვა"}
            </p>
          </div>

          {/* Upload Photo */}
          <div className="input-container upload-photo">
            <label htmlFor="upl">ატვირთეთ ფოტო *</label>
            <label htmlFor="photo" className="custom-file-upload">
              <input
                type="file"
                id="photo"
                {...register("avatar", {
                  required: "სურათის ატვირთვა აუცილებელია",
                  onChange: handleFileChange,
                })}
              />
              <div className="svg-container">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#2D3648"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V16"
                    stroke="#2D3648"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="#2D3648"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
            {fileName && <p>ჩატვირთული ფოტო: {fileName}</p>}
            {errors.avatar && (
              <p style={{ color: "red" }}>{errors.avatar.message}</p>
            )}
          </div>

          {/* Agents */}
          <div className="agent-section">
            <h2>აგენტი</h2>
            <div className="form-field">
              <label>აირჩიე</label>
              <select
                {...register("agent", {
                  required: "აგენტის არჩევა აუცილებელია",
                  onChange: handleFileChange,
                })}
              >
                <option value="">აირჩიეთ აგენტი</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} {agent.surname}
                  </option>
                ))}
              </select>
              <p style={{ color: errors.agent ? "red" : "inherit" }}>
                {errors.agent ? errors.agent.message : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to={routePaths.LandingPage}>
            <button className="outline">გაუქმება</button>
          </Link>
          <button type="submit" className="filled">
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;
