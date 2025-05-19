import { useState, useEffect } from 'react';
import { searchVenues } from '../../api/ticketmaster';
import VenueCard from '../cards/VenueCard';
import { getCategoryClassification } from '../../utils/categoryUtils';

export default function VenuesList({ categoryName, filters = {} }) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchVenues() {
      try {
        setLoading(true);
        
        const classificationParams = getCategoryClassification(categoryName);
        
        const params = {
          ...classificationParams,
          size: 10,
          ...(filters.country && { countryCode: filters.country }),
          ...(filters.city && { city: filters.city })
        };

        const response = await searchVenues(params);
        if (response._embedded?.venues) {
          setVenues(response._embedded.venues);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchVenues();
  }, [categoryName, filters]);
    if (loading) return <p className="loading-message">Loading venues...</p>;
  if (error) return <p className="error-message">Error loading venues: {error}</p>;
    
  return (
    <ul className="standard-grid">
      {venues.length > 0 ? (
        venues.map((venue) => (
          <li key={venue.id} className="venue-container">
            <VenueCard
              name={venue.name}
              image={
                venue.images?.find((img) => img.ratio === '16_9')?.url ||
                venue.images?.[0]?.url ||
                'https://placehold.co/300x150'
              }
              city={venue.city?.name || 'Unknown'}
              country={venue.country?.name || 'Unknown'}
              address={venue.address?.line1 || ''}
            />
          </li>
        ))
      ) : (
        <li className="no-results">No venues found for this category</li>
      )}
    </ul>
  );
}