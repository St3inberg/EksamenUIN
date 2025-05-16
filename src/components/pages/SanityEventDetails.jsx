
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSanityEventByTicketmasterId, fetchUsersForSanityEvent } from '../../api/sanity';
import { getEventDetails } from '../../api/ticketmaster';
import WishlistButton from '../buttons/WishlistButton';

export default function SanityEventDetails() {
  const { id } = useParams();
  const [sanityEvent, setSanityEvent] = useState(null);
  const [tmEvent, setTmEvent] = useState(null);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        setLoading(true);
        
        
        const [sanityData, tmData] = await Promise.all([
          fetchSanityEventByTicketmasterId(id),
          getEventDetails(id)
        ]);
        
        setSanityEvent(sanityData);
        setTmEvent(tmData);
        
        
        if (sanityData?._id) {
          const users = await fetchUsersForSanityEvent(sanityData._id);
          setInterestedUsers(users);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchEventData();
  }, [id]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!tmEvent && !sanityEvent) return <div className="not-found">Event not found</div>;

  
  const eventName = sanityEvent?.name || tmEvent?.name;
  const eventImage = sanityEvent?.image?.asset?.url || 
    (tmEvent?.images && (tmEvent.images.find(img => img.ratio === '16_9')?.url || tmEvent.images[0]?.url));
  const eventDescription = sanityEvent?.description || tmEvent?.info;
  const eventDate = sanityEvent?.startDate || tmEvent?.dates?.start?.localDate;
  const eventLocation = sanityEvent?.location || 
    (tmEvent?._embedded?.venues?.[0] && 
      `${tmEvent._embedded.venues[0].name}, ${tmEvent._embedded.venues[0].city?.name}, ${tmEvent._embedded.venues[0].country?.name}`);

  return (
    <div className="sanity-event-details">
      <div className="event-header">
        <h1>{eventName}</h1>
        <WishlistButton eventId={id} />
      </div>
      
      <div className="event-content">
        <div className="event-main">
          {eventImage && (
            <img 
              src={eventImage} 
              alt={eventName} 
              className="event-image" 
            />
          )}
          
          <div className="event-info">
            <div className="event-date-location">
              <h2>Event Details</h2>
              {eventDate && (
                <p className="event-date">
                  <strong>Date:</strong> {eventDate}
                </p>
              )}
              {eventLocation && (
                <p className="event-location">
                  <strong>Location:</strong> {eventLocation}
                </p>
              )}
            </div>
            
            {eventDescription && (
              <div className="event-description">
                <h2>Description</h2>
                <p>{eventDescription}</p>
              </div>
            )}
            
            {sanityEvent?.ticketType && (
              <div className="ticket-info">
                <h2>Ticket Information</h2>
                <p><strong>Type:</strong> {sanityEvent.ticketType}</p>
                {sanityEvent.price && (
                  <p><strong>Price:</strong> {sanityEvent.price} NOK</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="event-sidebar">
          {interestedUsers.length > 0 && (
            <div className="interested-users">
              <h2>People Interested</h2>
              <ul className="users-list">
                {interestedUsers.map(user => (
                  <li key={user._id} className="user-card">
                    {user.profileImage?.asset?.url ? (
                      <img 
                        src={user.profileImage.asset.url} 
                        alt={user.name} 
                        className="user-image"
                      />
                    ) : (
                      <div className="user-image-placeholder">{user.name[0]}</div>
                    )}
                    <span className="user-name">{user.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {tmEvent?.url && (
            <div className="ticketmaster-link">
              <h2>Official Tickets</h2>
              <a 
                href={tmEvent.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ticket-button"
              >
                Buy on Ticketmaster
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
