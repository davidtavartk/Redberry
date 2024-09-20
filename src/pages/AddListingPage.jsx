import React from "react";
import "./pageStyles/AddListingPage.sass";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";

const AddListingPage = () => {
  return (
    <div className="add-listing">
      <h1>ლისტინგის დამატება</h1>

      <form className="add-listing-content">
        <div className="radio-group">
          <h2>გარიგების ტიპი</h2>
          <div className="radio-group-inner">
            <label>
              <input type="radio" name="transactionType" value="sale" checked />
              იყიდება
            </label>
            <label>
              <input type="radio" name="transactionType" value="rent" />
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
                  required
                />
                <p>
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
                  მინიმუმ ორი სიმბოლო
                </p>
              </div>
              <div className="form-field">
                <label>საფოსტო ინდექსი *</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="საფოსტო ინდექსი"
                  required
                />
                <p>
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
                  მხოლოდ რიცხვები
                </p>
              </div>
            </div>

            <div className="dropdown-group">
              <div className="form-field">
                <label>რეგიონი</label>
                <select name="region" required>
                  <option value="">აირჩიეთ რეგიონი</option>
                  {/* Add options here */}
                </select>
              </div>
              <div className="form-field">
                <label>ქალაქი</label>
                <select name="city" required>
                  <option value="">აირჩიეთ ქალაქი</option>
                  {/* Add options here */}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section form-group">
          <h2>ბინის დეტალები</h2>

          {/* Price and Area Inputs */}
          <div className="input-group">
            <div className="input-container">
              <label htmlFor="price">ფასი</label>
              <input type="number" id="price" name="price" required />
              <p>
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
                მხოლოდ რიცხვები
              </p>
            </div>
            <div className="input-container">
              <label htmlFor="area">ფართობი</label>
              <input type="number" id="area" name="area" required />
              <p>
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
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="input-container">
            <label htmlFor="bedrooms">საძინებლების რაოდენობა</label>
            <input type="number" id="bedrooms" name="bedrooms" required />
            <p>
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
              მხოლოდ რიცხვები
            </p>
          </div>

          {/* Description */}
          <div className="input-container description">
            <label htmlFor="description">აღწერა</label>
            <textarea id="description" name="description" required></textarea>
            <p>
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
              მინიმუმ ხუთი სიტყვა
            </p>
          </div>

          {/* Upload Photo */}
          <div className="input-container upload-photo">
            <label htmlFor="upl">ატვირთეთ ფოტო *</label>
            <label htmlFor="photo" className="custom-file-upload">
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                required
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
          </div>

          <div className="agent-section">
            <h2>აგენტი</h2>
            <div className="form-field">
              <label>აირჩიე</label>
              <select name="region" required>
                <option value="">გიორგი ბრეგვაძე</option>
              </select>
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
