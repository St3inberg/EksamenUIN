import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  

  if (!event) return <p>Loading event...</p>;

  return (
    <div>
      <h1>{event.name}</h1>
      <img src={event.images?.[0]?.url} alt={event.name} width={300} />
      <p><strong>Date:</strong> {event.dates?.start?.localDate}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime}</p>
      <p><strong>Venue:</strong> {event._embedded?.venues?.[0]?.name}</p>
      <p><strong>City:</strong> {event._embedded?.venues?.[0]?.city?.name}</p>
      <p><strong>Country:</strong> {event._embedded?.venues?.[0]?.country?.name}</p>
      <p><strong>Genre:</strong> {event.classifications?.[0]?.genre?.name || 'Unknown'}</p>
      <p><strong>Info:</strong> {event.info || 'No description available'}</p>
      <a href={event.url} target="_blank" rel="noreferrer">Buy Tickets</a>
    </div>
  );
};

export default EventPage;