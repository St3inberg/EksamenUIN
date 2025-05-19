import React from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from '../buttons/WishlistButton';

export default function SanityEventCard({ event }) {
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="wishlist-card">
      <Link to={`/event/${event.ticketmasterId || event._id}`} className="wishlist-card-link">        <div className="aspect-container">
          {event.image?.asset?.url ? (
            <img 
              src={event.image.asset.url} 
              alt={event.name}
              className="wishlist-card-image"
              loading="lazy"
            />
          ) : (
            <div className="event-thumbnail-placeholder wishlist-card-image">
              <span className="placeholder-text">{event.eventType || 'Event'}</span>
            </div>
          )}
          
          {event.date && (
            <div className="event-date-badge">
              {formatDate(event.date)}
            </div>
          )}
          
          {event._count?.interestedUsers && (
            <div className="wishlist-count-badge">
              {event._count.interestedUsers}
            </div>
          )}
          
          <div className="card-overlay">
            <WishlistButton eventId={event.ticketmasterId} />
          </div>
        </div>
        
        <div className="wishlist-card-content">
          <h3>{event.name}</h3>
          <p>{event.venueName}, {event.city || ''}</p>
          <div className="event-details">
            <span className="event-type">{event.eventType || 'Event'}</span>
            <span className="event-price">{event.price ? `$${event.price}` : 'Price TBA'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
