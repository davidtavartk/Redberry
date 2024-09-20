import "./pageStyles/AddListingPage.sass";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";
import { useEffect, useState } from "react";
import { addEstate, getAgents, getCities, getRegions } from "../api/swaggerApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddListingPage = () => {
  const [agents, setAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_rental: "0",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("address", data.address);
      formData.append("image", data.image[0]);
      formData.append("region_id", data.region_id);
      formData.append("description", data.description);
      formData.append("city_id", data.city_id);
      formData.append("zip_code", data.zip_code);
      formData.append("price", data.price);
      formData.append("area", data.area);
      formData.append("bedrooms", data.bedrooms);
      formData.append("is_rental", data.is_rental);
      formData.append("agent_id", data.agent_id);

      const response = await addEstate(formData); 
      console.log("Estate added!", response)
      navigate(routePaths.LandingPage);

    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB in bytes
        alert("ატვირთეთ 1MB-ზე ნაკლები ზომის ფოტო");
        e.target.value = ""; // Clear the file input
        setFileName("");
      } else {
        setFileName(file.name);
      }
    }
  };

  const handleRegionChange = (e) => {
    const regionId = parseInt(e.target.value);
    setSelectedRegionId(regionId);
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
                value="0"
                {...register("is_rental")}
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                value="1"
                {...register("is_rental")}
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
                  {...register("region_id", {
                    required: "რეგიონის არჩევა აუცილებელია",
                    onChange: (e) => handleRegionChange(e),
                  })}
                  value={selectedRegionId}
                >
                  <option value="" disabled>
                    აირჩიეთ რეგიონი
                  </option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region_id && (
                  <p style={{ color: "red" }}>{errors.region_id.message}</p>
                )}
              </div>

              {selectedRegionId != "" && (
                <div className="form-field">
                  <label>ქალაქი</label>
                  <select
                    {...register("city_id", {
                      required: "ქალაქის არჩევა აუცილებელია",
                    })}
                  >
                    {cities
                      .filter((city) => city.region_id === selectedRegionId)
                      .map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
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
                      value.length <= 10 || "მაქსიმუმ 10 სიმბოლო",
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
                  maxValue: (value) => value <= 50 || "საძინებლების რაოდენობა უნდა იყოს 50-ზე ნაკლები",
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
                {...register("image", {
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
            {errors.image && (
              <p style={{ color: "red" }}>{errors.image.message}</p>
            )}
          </div>

          {/* Agents */}
          <div className="agent-section">
            <h2>აგენტი</h2>
            <div className="form-field">
              <label>აირჩიე</label>
              <select
                {...register("agent_id", {
                  required: "აგენტის არჩევა აუცილებელია"
                })}
              >
                <option value="">აირჩიეთ აგენტი</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} {agent.surname}
                  </option>
                ))}
              </select>
              <p style={{ color: errors.agent_id ? "red" : "inherit" }}>
                {errors.agent_id ? errors.agent_id.message : ""}
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
