import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./DeleteListing.sass";
import { deleteEstate } from "../api/swaggerApi";
import { useNavigate } from "react-router-dom";
import routePaths from "../routes/routePaths";

const DeleteListing = ({ isOpen, onClose, estateId }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);
    
    if (!isOpen) return null;
    
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleDelete = async () => {
    try {
      await deleteEstate(estateId);

      setShowSuccessMessage(true);

      setTimeout(() => {
   
        navigate(routePaths.LandingPage);
      }, 2000); // Adjust the delay (2000ms = 2 seconds)
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return ReactDOM.createPortal(
    <div className="delete-modal" aria-modal="true" role="dialog">
      {showSuccessMessage ? (
        <p id="success">Estate was deleted successfully</p>
      ) : (
        <>
          <p>გსურთ წაშალოთ ლისტინგი?</p>
          <div className="delete-modal-buttons">
            <button type="button" className="outline" onClick={onClose}>
              გაუქმება
            </button>
            <button type="submit" className="filled" onClick={handleDelete}>
              დადასტურება
            </button>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default DeleteListing;
