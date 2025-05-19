
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventDetails } from '../../api/ticketmaster';
import WishlistButton from '../buttons/WishlistButton';
import ArtistCard from '../cards/ArtistCard';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError(null);
      
      try {
        if (!id) {
          throw new Error("No event ID provided");
        }
        
        const data = await getEventDetails(id);
        
        if (!data) {
          throw new Error("No event data received");
        }
        
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(err.message || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);
  const formatDateTime = (dateObj) => {
    if (!dateObj) return 'TBA';
    
    const date = dateObj.localDate || 'TBA';
    const time = dateObj.localTime ? ` at ${dateObj.localTime}` : '';
    return `${date}${time}`;
  };

  const getVenueDetails = () => {
    const venue = event._embedded?.venues?.[0];
    if (!venue) return { name: 'TBA', location: 'Location not available' };
    
    return {
      name: venue.name,
      location: `${venue.city?.name || ''}, ${venue.country?.name || ''}`
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;
  
  const getEventImage = () => {
    if (event.images && event.images.length > 0) {
      return event.images[0].url;
    }
    return 'https://placehold.co/600x400?text=No+Image';
  };

  const renderGenreTags = () => {
    if (!event.classifications || event.classifications.length === 0) {
      return <span className="genre-tag">Not classified</span>;
    }
    
    return event.classifications.map((classification, index) => (
      <span key={index} className="genre-tag">
        {classification.segment?.name || ''}
        {classification.genre?.name && ` / ${classification.genre.name}`}
        {classification.subGenre?.name && ` / ${classification.subGenre.name}`}
      </span>
    ));
  };
  
  return (
    <div className="event-page">
      <div className="event-header">
        <h1>{event.name}</h1>
        {id && <WishlistButton eventId={id} />}
      </div>
      <div className="event-details">
        <div className="event-main">
          <img 
            src={getEventImage()} 
            alt={`Event image for ${event.name}`}
            className="event-image" 
          />          <div className="event-info">
            <div className="event-genres">
              <h2>Genre</h2>
              <div className="genre-tags">
                {renderGenreTags()}
              </div>
            </div>

            <div className="event-datetime">
              <h2>When & Where</h2>
              <p className="event-date">
                <strong>Date:</strong> {formatDateTime(event.dates?.start)}
              </p>
              <div className="event-location">
                <h3>Venue</h3>
                {(() => {
                  const venue = getVenueDetails();
                  return (
                    <>
                      <p>{venue.name}</p>
                      <p>{venue.location}</p>
                    </>
                  );
                })()}
              </div>
            </div>
            {event.priceRanges && (
              <div className="event-prices">
                <h2>Ticket Prices</h2>
                {event.priceRanges.map((price, index) => (
                  <p key={index}>
                    {price.type}: {price.currency} {price.min} - {price.max}
                  </p>
                ))}
              </div>
            )}


            {event.products && event.products.length > 0 && (
              <div className="event-festival-passes">
                <h2>Festival Passes</h2>
                <ul className="festival-passes-list">
                  {event.products.map((product, index) => (
                    <li key={index} className="festival-pass-item">
                      <span className="pass-name">{product.name}</span>
                      {product.url && (
                        <a 
                          href={product.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pass-link"
                        >
                          Buy Pass
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {event.url && (
              <a 
                href={event.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ticket-link-button"
              >
                Buy Tickets
              </a>
            )}
          </div>
        </div>        <div className="event-sidebar">
          {(() => {
            const prepareArtistData = (artist) => {
              const socialLinks = artist.externalLinks 
                ? Object.entries(artist.externalLinks).map(([name, links]) => ({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    url: links[0].url
                  }))
                : [];
              
              const image = artist.images?.[0]?.url || 'https://placehold.co/200x200?text=Artist';
              const genre = artist.classifications?.[0]?.genre?.name || '';
              
              return {
                id: artist.id,
                name: artist.name,
                image,
                genre,
                socialLinks
              };
            };
            
            if (event._embedded?.attractions) {
              return (
                <div className="event-artists">
                  <h2>Artists</h2>
                  <div className="artists-list">
                    {event._embedded.attractions.map(artist => {
                      const artistData = prepareArtistData(artist);
                      return (
                        <ArtistCard
                          key={artistData.id}
                          attractionId={artistData.id}
                          name={artistData.name}
                          image={artistData.image}
                          genre={artistData.genre}
                          social={artistData.socialLinks}
                          clickable={true}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
            return null;
          })()}


          {event.info && (
            <div className="event-additional-info">
              <h2>Additional Information</h2>
              <p>{event.info}</p>
            </div>
          )}


          {event.pleaseNote && (
            <div className="event-notes">
              <h2>Please Note</h2>
              <p>{event.pleaseNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

