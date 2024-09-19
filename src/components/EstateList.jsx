import './EstateList.sass';
import { getRealEstates } from '../api/swaggerApi';
import { useEffect, useState } from 'react';
import EstateItem from './EstateItem';

const EstateList = () => {

    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
      const fetchRealEstates = async () => {
        try {
            const response = await getRealEstates();
            setEstates(response.data);
            // console.log(response.data);  
        } catch (error) {
            console.log("Error fetching estates: ", error);
            setError('აღნიშნული მონაცემებით განცხადება არ იძებნება');
        } finally {
            setLoading(false);
        }
      }

      fetchRealEstates();
    }, [])
    

    if (loading) {
        return <div className='container'>Loading...</div>;
    }

    if (error) {
        return <div className='estate-list-error container'>{error}</div>;
    }

    return (

        <div>
            {estates.length > 0 ? (
                <div className="estate-list-container">
                    {estates.map((estate) => (
                        <EstateItem key={estate.id} estate={estate} />
                    ))}
                </div>

            ) : (
                <p>No estates found.</p>
            )}
        </div>
    );
};

export default EstateList;