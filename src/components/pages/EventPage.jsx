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
      try {
        const data = await getEventDetails(id);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-page">
      <div className="event-header">
        <h1>{event.name}</h1>
        {id && <WishlistButton eventId={id} />}
      </div>
      <div className="event-details">
        <div className="event-main">
          {event.images && event.images[0] && (
            <img 
              src={event.images[0].url} 
              alt={event.name}
              className="event-image" 
            />
          )}
          <div className="event-info">
            {/* Genre Information */}
            <div className="event-genres">
              <h2>Genre</h2>
              <div className="genre-tags">
                {event.classifications?.map((classification, index) => (
                  <span key={index} className="genre-tag">
                    {classification.segment?.name}
                    {classification.genre?.name && ` / ${classification.genre.name}`}
                    {classification.subGenre?.name && ` / ${classification.subGenre.name}`}
                  </span>
                ))}
              </div>
            </div>

            {/* Date and Location */}
            <div className="event-datetime">
              <h2>When & Where</h2>
              <p className="event-date">
                <strong>Date:</strong> {event.dates?.start?.localDate || 'TBA'}
                {event.dates?.start?.localTime && ` at ${event.dates.start.localTime}`}
              </p>
              <div className="event-location">
                <h3>Venue</h3>
                <p>{event._embedded?.venues?.[0]?.name}</p>
                <p>
                  {event._embedded?.venues?.[0]?.city?.name}, 
                  {event._embedded?.venues?.[0]?.country?.name}
                </p>
              </div>
            </div>

            {/* Price Information */}
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

            {/* Festival Passes Section */}
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

            {/* Ticket Link */}
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
        </div>

        <div className="event-sidebar">          {/* Artists/Attractions Section */}
          {event._embedded?.attractions && (
            <div className="event-artists">
              <h2>Artists</h2>
              <div className="artists-list">                {event._embedded.attractions.map(artist => (
                  <ArtistCard
                    key={artist.id}
                    attractionId={artist.id}
                    name={artist.name}
                    image={artist.images?.[0]?.url || 'https://placehold.co/200x200?text=Artist'}
                    genre={artist.classifications?.[0]?.genre?.name || ''}
                    social={artist.externalLinks ? 
                      Object.entries(artist.externalLinks).map(([name, links]) => ({
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        url: links[0].url
                      })) : []
                    }
                    clickable={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {event.info && (
            <div className="event-additional-info">
              <h2>Additional Information</h2>
              <p>{event.info}</p>
            </div>
          )}

          {/* Please Note / Restrictions */}
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

