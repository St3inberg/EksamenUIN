
import { useState, useEffect } from 'react';
import { searchAttractions } from '../../api/ticketmaster';
import ArtistCard from '../cards/ArtistCard';
import { getCategoryClassification } from '../../utils/categoryUtils';

export default function AttractionsList({ categoryName, filters }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchAttractions() {
      try {
        setLoading(true);
        
        const classificationParams = getCategoryClassification(categoryName);
        
        const params = {
          ...classificationParams,
          size: 10,
          ...(filters.country && { countryCode: filters.country }),
          ...(filters.city && { city: filters.city })
        };

        const response = await searchAttractions(params);
        if (response._embedded?.attractions) {
          setAttractions(response._embedded.attractions);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }    
    }

    fetchAttractions();
  }, [categoryName, filters]);
  if (loading) return <p className="loading-message">Loading attractions...</p>;
  if (error) return <p className="error-message">Error loading attractions: {error}</p>;
    
  return (
    <ul className="standard-grid">
      {attractions.length > 0 ? (
        attractions.map((attraction) => (
          <li key={attraction.id} className="artist-container">
            <ArtistCard
              attractionId={attraction.id}
              clickable={true}
              name={attraction.name}
              image={
                attraction.images?.find((img) => img.ratio === '16_9')?.url ||
                attraction.images?.[0]?.url ||
                'https://placehold.co/300x300'
              }
              genre={attraction.classifications?.[0]?.genre?.name || 
                    attraction.classifications?.[0]?.segment?.name || ''}
              social={attraction.externalLinks ? 
                Object.entries(attraction.externalLinks).map(([name, links]) => ({
                  name: name.charAt(0).toUpperCase() + name.slice(1),
                  url: links[0].url
                })) : []
              }
            />
          </li>
        ))
      ) : (
        <li className="no-results">No attractions found for this category</li>
      )}
    </ul>
  );
}
