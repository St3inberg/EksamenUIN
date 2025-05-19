import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttractionDetails } from '../../api/ticketmaster';

export default function AttractionPage() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAttraction() {
      try {
        setLoading(true);
        const data = await getAttractionDetails(id);
        setAttraction(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchAttraction();
  }, [id]);

  if (loading) return <div>Loading attraction details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!attraction) return <div>Attraction not found</div>;

  return (
    <div className="attraction-page">
      <div className="attraction-header">
        <h1>{attraction.name}</h1>
      </div>
      
      <div className="attraction-details">
        <div className="attraction-main">
          {attraction.images && attraction.images[0] && (
            <img 
              src={attraction.images[0].url} 
              alt={attraction.name}
              className="attraction-image" 
            />
          )}
          
          <div className="attraction-info">
            {/* Genre Information */}
            <div className="attraction-genres">
              <h2>Genre</h2>
              <div className="genre-tags">
                {attraction.classifications?.map((classification, index) => (
                  <span key={index} className="genre-tag">
                    {classification.segment?.name}
                    {classification.genre?.name && ` / ${classification.genre.name}`}
                    {classification.subGenre?.name && ` / ${classification.subGenre.name}`}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            {attraction.externalLinks && (
              <div className="attraction-social">
                <h2>Connect</h2>
                <div className="social-links">
                  {Object.entries(attraction.externalLinks).map(([platform, links], index) => (
                    <a
                      key={index}
                      href={links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upcoming Events */}
            {attraction.upcomingEvents?._total > 0 && (
              <div className="upcoming-events">
                <h2>Upcoming Events</h2>
                <p>{attraction.upcomingEvents._total} events scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
