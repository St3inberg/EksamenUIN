import { Link } from 'react-router-dom';

export default function CuratedEventsSection({ 
  sanityEvents, 
  loading, 
  error 
}) {
  // Format date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="dashboard-section curated-events-section">
      <h2>Recommended Events</h2>
      {loading ? (
        <p>Loading recommended events...</p>
      ) : error ? (
        <p className="error">Error loading events: {error}</p>
      ) : sanityEvents && sanityEvents.length > 0 ? (
        <div className="wishlist-grid">
          {sanityEvents.map(event => (
            <div key={event._id} className="wishlist-card">
              <Link to={`/sanity-event/${event._id}`} className="wishlist-card-link">                <div className="aspect-container">
                  <img 
                    src={event.mainImage?.asset?.url || 
                         'https://via.placeholder.com/400x225?text=No+Image+Available'} 
                    alt={event.title || 'Event'}
                    className="wishlist-card-image"
                  />
                  {event.eventDate && (
                    <div className="event-date-badge">
                      {formatDate(event.eventDate)}
                    </div>
                  )}
                  {(event._count?.interestedUsers || event.interestedUsers?.length > 0) && (
                    <div className="wishlist-count-badge">
                      {event._count?.interestedUsers || event.interestedUsers?.length || 0}
                    </div>
                  )}
                </div>
                <div className="wishlist-card-content">
                  <h3>{event.title || 'Event'}</h3>
                  <p>{event.venue?.name || event.location || 'Location TBA'}</p>
                  <div className="event-details">
                    <span>{event.category || event.type || 'Event'}</span>
                    <span className="event-organizer">{event.organizer || ''}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommended events available at this time.</p>
      )}
    </section>
  );
}
