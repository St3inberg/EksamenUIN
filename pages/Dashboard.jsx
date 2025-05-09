import { useEffect, useState } from 'react';
import { client } from '../../sanity';
import EventCard from '../EventCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "event"]{_id, title, slug, imageUrl}`)
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Mine events</h1>
      {events.length === 0 && <p>Ingen events funnet.</p>}
      {events.map((e) =>
        e.slug?.current ? (
          <Link key={e._id} to={`/sanity-event/${e.slug.current}`}>
            <EventCard event={e} fromSanity />
          </Link>
        ) : (
          <div key={e._id}>
            <p>{e.title} (mangler slug)</p>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
