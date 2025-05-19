import { useState, useEffect } from 'react';
import { fetchAllSanityEvents, fetchAllSanityUsers } from '../../api/sanity';
import SanityEventCard from './SanityEventCard';
import SanityUserCard from './SanityUserCard';

export default function SanityDashboard() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSanityData() {
      try {
        setLoading(true);
        const [eventsData, usersData] = await Promise.all([
          fetchAllSanityEvents(),
          fetchAllSanityUsers()
        ]);
        setEvents(eventsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching Sanity data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSanityData();
  }, []);
  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">Loading Sanity data...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">Error: {error}</p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="sanity-dashboard">      <section className="sanity-events">
        <h2>Popular Events</h2>
        <p className="section-description">Trending events in your community</p>        {events.length > 0 ? (
          <div className="standard-grid">
            {events.map(event => (
              <SanityEventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p>No events found in your community.</p>
        )}
      </section>      <section className="sanity-users">
        <h2>Community Members</h2>
        <p className="section-description">Connect with other event enthusiasts</p>        {users.length > 0 ? (
          <div className="users-grid">
            {users.map(user => (
              <SanityUserCard key={user._id} user={user} />
            ))}
          </div>
        ): (
          <p>No users found in Sanity CMS.</p>
        )}
      </section>
    </div>
  );
}
