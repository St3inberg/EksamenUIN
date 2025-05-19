
import WishlistButton from '../buttons/WishlistButton';

export default function EventHeader({ title, eventId, date, location }) {
  return (
    <div className="event-header">
      <div className="event-header-content">
        <h1>{title}</h1>
        {(date || location) && (
          <div className="event-header-details">
            {date && <span className="event-header-date">{date}</span>}
            {date && location && <span className="separator">•</span>}
            {location && <span className="event-header-location">{location}</span>}
          </div>
        )}
      </div>
      <WishlistButton eventId={eventId} />
    </div>
  );
}
