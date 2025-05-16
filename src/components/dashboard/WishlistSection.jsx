import { Link } from 'react-router-dom';

export default function WishlistSection({ 
  wishlistEvents, 
  loading, 
  error, 
  removeFromWishlist 
}) {
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
              <Link to={`/event/${event.id}`} className="wishlist-card-link">
                <img 
                  src={event.images?.find(img => img.ratio === '16_9')?.url || event.images?.[0]?.url} 
                  alt={event.name}
                  className="wishlist-card-image"
                />
                <div className="wishlist-card-content">
                  <h3>{event.name}</h3>
                  <p>{event.dates?.start?.localDate}</p>
                </div>
              </Link>
              <button 
                onClick={() => { removeFromWishlist(event.id); }}
                className="remove-wishlist-button"
                aria-label={`Remove ${event.name} from wishlist`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No events in your wishlist. Browse events and click the heart icon to add them here!</p>
      )}
    </section>
  );
}
