import { useParams } from "react-router-dom";
import Listing from "../components/Listing";

const ListingPage = () => {

    const { id } = useParams();
    return (
        <div className="listing-page">
            <Listing estateId={id}/>
        </div>
    );
};

export default ListingPage;