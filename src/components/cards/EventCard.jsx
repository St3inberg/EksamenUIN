import { Link } from 'react-router-dom';


const EventCard = ({ event, fromSanity = false }) => {
  const title = fromSanity ? event.title : event.name;
  const id = fromSanity ? event.slug?.current : event.id;
  const image = fromSanity ? event.imageUrl : event.images?.[0]?.url;

  if (!id) return <div>(mangler ID)</div>;

  return (
    <Link to={fromSanity ? `/sanity-event/${id}` : `/event/${id}`}>
      <div className="event-card">
        {image && <img src={image} alt={title} />}
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default EventCard;
