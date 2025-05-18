import { useNavigate } from 'react-router-dom';
import WishlistButton from '../buttons/WishlistButton';

export default function EventCard({
  eventId,
  name,
  image,
  city,
  country,
  date,
  clickable = true,
  showWishlist = true
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable && eventId) {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <article
      className="event-card"
      style={{ cursor: clickable ? 'pointer' : 'default' }}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && clickable) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <img
        src={image}
        alt={`Event poster for ${name}`}
        className="event-image"
        loading="lazy"
      />
      {showWishlist && eventId && (
        <WishlistButton eventId={eventId} />
      )}      <div className="event-content">
        <h2 className="event-title">{name}</h2>
        <address className="event-location">
          <span className="visually-hidden">Location: </span>
          {city}, {country}
        </address>
        <time className="event-date">
          <span className="visually-hidden">Date: </span>
          {date}
        </time>
      </div>
    </article>
  );
}

// Props are passed directly without PropTypes validation



