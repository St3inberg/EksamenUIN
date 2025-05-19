
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSanityEventByTicketmasterId, fetchUsersForSanityEvent } from '../../api/sanity';
import { getEventDetails } from '../../api/ticketmaster';
import EventHeader from '../event/EventHeader';
import EventInfo from '../event/EventInfo';
import UsersList from '../event/UsersList';

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
  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">Loading event details...</p>
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
  
  if (!tmEvent && !sanityEvent) return (
    <div className="not-found-container">
      <div className="not-found-icon">🔍</div>
      <h2>Event Not Found</h2>
      <p>We couldn't locate the event you're looking for.</p>
    </div>
  );

    const eventName = sanityEvent?.name || tmEvent?.name;
  const eventImage = sanityEvent?.image?.asset?.url || 
    (tmEvent?.images && (tmEvent.images.find(img => img.ratio === '16_9')?.url || tmEvent.images[0]?.url));
  const eventDescription = sanityEvent?.description || tmEvent?.info;
  const eventDate = sanityEvent?.date ? new Date(sanityEvent.date).toLocaleDateString() : 
    (tmEvent?.dates?.start?.localDate);
  const eventLocation = (sanityEvent?.venueName && sanityEvent?.city) ? 
    `${sanityEvent.venueName}, ${sanityEvent.city}, ${sanityEvent.country || ''}` : 
    (tmEvent?._embedded?.venues?.[0] && 
      `${tmEvent._embedded.venues[0].name}, ${tmEvent._embedded.venues[0].city?.name}, ${tmEvent._embedded.venues[0].country?.name}`);
  return (
    <div className="sanity-event-details">
      <EventHeader 
        title={eventName} 
        eventId={id} 
        date={eventDate} 
        location={eventLocation?.split(',')[0]}
      />
      
      <div className="event-content">
        <div className="event-main">
          {eventImage && (
            <img 
              src={eventImage} 
              alt={eventName} 
              className="event-image" 
            />
          )}
          
          <EventInfo
            date={eventDate}
            location={eventLocation}
            description={eventDescription}
            eventType={sanityEvent?.eventType}
            priceRange={sanityEvent?.priceRange}
            artistLineup={sanityEvent?.artistLineup}
          />
        </div>
        
        <div className="event-sidebar">
          {interestedUsers.length > 0 && <UsersList users={interestedUsers} />}
          
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
