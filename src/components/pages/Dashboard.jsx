import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../../hooks/useWishlist';
import { getEventDetails } from '../../api/ticketmaster';
import LoginForm from '../dashboard/LoginForm';
import SanityDashboard from '../dashboard/SanityDashboard';
import useAuth from '../../hooks/useAuth';

export default function Dashboard() {
  const { isLoggedIn, userData, logout } = useAuth();
  const [wishlistEvents, setWishlistEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    
  const { wishlist } = useWishlist();
  
 
  useEffect(() => {
    if (isLoggedIn && wishlist.length > 0) {
      const fetchWishlistItems = async () => {
        setLoading(true);
        try {
          const eventPromises = wishlist.map(id => getEventDetails(id));
          const events = await Promise.all(eventPromises);
          setWishlistEvents(events);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      
      fetchWishlistItems();
    }
  }, [isLoggedIn, wishlist]);

  // Login form
  if (!isLoggedIn) {
    return <LoginForm />;
  }
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Page</h1>
        <button 
          onClick={logout} 
          className="logout-button"
        >
          Logout
        </button>
      </div>

      
      <section className="dashboard-section profile-section">
        <h2>My Profile</h2>
        {userData && (
          <div className="user-profile">
            <div className="user-avatar-placeholder">{userData.name[0]}</div>
            <div className="user-info">
              <h3>{userData.name}</h3>
              <p>{userData.email}</p>
            </div>
          </div>
        )}
      </section>

      
      <section className="dashboard-section wishlist-section">
        <h2>My Wishlist</h2>
        {loading ? (
          <p>Loading your wishlist...</p>
        ) : error ? (
          <p className="error">Error loading wishlist: {error}</p>
        ) : wishlistEvents.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistEvents.map(event => (
              <div key={event.id} className="wishlist-card">                <Link to={`/event/${event.id}`} className="wishlist-card-link">
                  <div className="aspect-container">
                    <img 
                      src={event.images?.find(img => img.ratio === '16_9')?.url || event.images?.[0]?.url} 
                      alt={event.name}
                      className="wishlist-card-image"
                    />
                  </div>
                  <div className="wishlist-card-content">
                    <h3>{event.name}</h3>
                    <p>{event.dates?.start?.localDate}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No events in your wishlist. Browse events and click the heart icon to add them here!</p>
        )}
      </section>
        
      <section className="dashboard-section sanity-section">
        <h2>Social Discovery</h2>
        <p className="section-description">
          Connect with friends and discover events they're attending
        </p>
        <SanityDashboard />
      </section>
    </div>
  );
} 
