import './EstateList.sass';
import { getRealEstates } from '../api/swaggerApi';
import { useEffect, useState } from 'react';
import EstateItem from './EstateItem';
import { useSelector } from 'react-redux';

const EstateList = () => {

    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedFilters = useSelector((state) => state.filters.selectedFilters);


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
    }, []);

    const filteredEstates = estates.filter((estate) => {
        const { min: minPrice, max: maxPrice } = selectedFilters.price;
        const { min: minSize, max: maxSize } = selectedFilters.size;
        const bedrooms = selectedFilters.bedrooms;
    
        // Filter by price
        const matchesPrice = (!minPrice || estate.price >= minPrice) && (!maxPrice || estate.price <= maxPrice);
    
        // Filter by size
        const matchesSize = (!minSize || estate.area >= minSize) && (!maxSize || estate.area <= maxSize);
    
        // Filter by bedrooms
        const matchesBedrooms = !bedrooms || estate.bedrooms === parseInt(bedrooms);
    
        // Return true if estate matches all the filters
        return matchesPrice && matchesSize && matchesBedrooms;
      });
    

    if (loading) {
        return <div className='container'>Loading...</div>;
    }

    if (error) {
        return <div className='estate-list-error container'>{error}</div>;
    }

    return (
        <div>
          {filteredEstates.length > 0 ? (
            <div className="estate-list-container">
              {filteredEstates.map((estate) => (
                <EstateItem key={estate.id} estate={estate} />
              ))}
            </div>
          ) : (
            <p className='container'>აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
          )}
        </div>
      );
      
};

export default EstateList;