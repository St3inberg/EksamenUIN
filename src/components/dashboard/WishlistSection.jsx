import { Link } from 'react-router-dom';

export default function WishlistSection({ 
  wishlistEvents, 
  loading, 
  error, 
  removeFromWishlist 
}) {
  
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
    <section className="dashboard-section wishlist-section">
      <h2>My Wishlist</h2>
      {loading ? (
        <p>Loading your wishlist...</p>
      ) : error ? (
        <p className="error">Error loading wishlist: {error}</p>
      ) : wishlistEvents.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistEvents.map(event => (
            <div key={event.id} className="wishlist-card">
              <Link to={`/event/${event.id}`} className="wishlist-card-link">                <div className="aspect-container">
                  <img 
                    src={event.images?.find(img => img.ratio === '16_9')?.url || event.images?.[0]?.url} 
                    alt={event.name}
                    className="wishlist-card-image"
                  />
                  {event.dates?.start?.localDate && (
                    <div className="event-date-badge">
                      {formatDate(event.dates.start.localDate)}
                    </div>
                  )}
                  {event._count?.interestedUsers && (
                    <div className="wishlist-count-badge">
                      {event._count.interestedUsers}
                    </div>
                  )}
                </div>
                <div className="wishlist-card-content">
                  <h3>{event.name}</h3>
                  <p>{event.venues?.[0]?.name || event._embedded?.venues?.[0]?.name || 'Venue TBA'}</p>
                  <div className="event-details">
                    <span>{event.classifications?.[0]?.segment?.name || 'Event'}</span>
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        removeFromWishlist(event.id); 
                      }}
                      className="remove-button"
                      aria-label={`Remove ${event.name} from wishlist`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>No events in your wishlist yet.</p>
          <p>Browse events and click the heart icon to add them here!</p>
        </div>
      )}
    </section>
  );
}
