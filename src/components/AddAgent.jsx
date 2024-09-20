import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./AddAgent.sass";
import { addAgent } from "../api/swaggerApi";
import { useForm } from "react-hook-form";

const AddAgent = ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      
      formData.append("avatar", data.avatar[0]);
  
      const response = await addAgent(formData); 
      // console.log("Agent added:", response);
      onClose();
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };
  

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" aria-modal="true" role="dialog">
      <div className="modal-content">
        <h2>აგენტის დამატება</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="main-content">
            <div className="group">
              <div className="input-container">
                <label htmlFor="name">სახელი *</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "სახელის შეყვანა აუცილებელია",
                    minLength: {
                      value: 2,
                      message: "მინიმუმ 2 სიმბოლო",
                    },
                  })}
                />

                <p style={{ color: errors.name ? "red" : "inherit" }}>
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
                  მინიმუმ 2 სიმბოლო
                </p>
              </div>

              <div className="input-container">
                <label htmlFor="surname">გვარი</label>
                <input
                  type="text"
                  id="surname"
                  {...register("surname", {
                    required: "გვარის შეყვანა აუცილებელია",
                    minLength: {
                      value: 2,
                      message: "მინიმუმ 2 სიმბოლო",
                    },
                  })}
                />
                <p style={{ color: errors.surname ? "red" : "inherit" }}>
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
            </div>

            <div className="group">
              <div className="input-container">
                <label htmlFor="email">ელ-ფოსტა *</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "e-mail-ის შეყვანა აუცილებელია",
                    validate: {
                      isRedberry: (value) =>
                        value.endsWith("@redberry.ge") || "გამოიყენეთ @redberry.ge ფოსტა",
                    },
                  })}
                />
                <p style={{ color: errors.email ? "red" : "inherit" }}>
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
                  {errors.email
                    ? errors.email.message
                    : "გამოიყენეთ @redberry.ge ფოსტა"}
                </p>
              </div>

              <div className="input-container">
                <label htmlFor="phone">ტელეფონის ნომერი</label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^5\d{8}$/,
                      message: "ნომერი უნდა დაიწყებოდეს 5-ით და ჰქპნდეს 9 ციფრი",
                    },
                  })}
                />
                <p style={{ color: errors.phone ? "red" : "inherit" }}>
                  {" "}
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
                  {errors.phone ? errors.phone.message : "მხოლოდ რიცხვები"}
                </p>
              </div>
            </div>

            <div className="input-container upload-photo">
              <label htmlFor="photo">ატვირთეთ ფოტო *</label>
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
          </div>

          <div className="modal-actions">
            <button type="button" className="outline" onClick={onClose}>
              გაუქმება
            </button>
            <button type="submit" className="filled">
              დაამატე
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddAgent;
