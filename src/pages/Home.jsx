import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchEvents, getEventDetailsUrl } from '../api/ticketmaster';
import EventCard from "../components/cards/EventCard.jsx";


const festivalNames = ["Findings", "Neon", "Skeikampfestivalen", "Tons of Rock"];
const majorCities = [
  { name: "Oslo", id: "Oslo" },
  { name: "London", id: "London" },
  { name: "Berlin", id: "Berlin" },
  { name: "Paris", id: "Paris" },
];

export default function Home() {
  const [festivals, setFestivals] = useState({ data: [], loading: true, error: null });
  const [city, setCity] = useState({ name: null, data: [], loading: false, error: null });

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const results = await Promise.all(
          festivalNames.map((name) => searchEvents({ keyword: name, classificationName: 'Music', size: 1 }))
        );

        let events = results
          .map((r, i) => r._embedded?.events?.[0] || (console.warn(`No event for ${festivalNames[i]}`), null))
          .filter(Boolean);

        if (events.length < 4) {
          const extra = await searchEvents({
            classificationName: 'Festival',
            countryCode: 'NO',
            size: 4 - events.length + events.length,
          });
          const unique = extra._embedded?.events?.filter((e) => !events.some((f) => f.id === e.id)) || [];
          events = [...events, ...unique].slice(0, 4);
        }

        setFestivals({ data: events, loading: false, error: null });
      } catch (err) {
        setFestivals({ data: [], loading: false, error: err.message || 'Kunne ikke laste festivaler' });
      }
    };

    fetchFestivals();
  }, []);

  const handleCityClick = async (cityName) => {
    setCity({ name: cityName, data: [], loading: true, error: null });
    try {
      const data = await searchEvents({ city: cityName, size: 10 });
      setCity({ name: cityName, data: data._embedded?.events || [], loading: false, error: null });
    } catch (err) {
      setCity({ name: cityName, data: [], loading: false, error: err.message || 'Kunne ikke laste arrangementer' });
    }
  };

  return (
    <div className="container">
      <h1 className="section-title">Velkommen til Hjemside!!</h1>
      <p>Oppdag de feteste arrangementene innen musikk, teater og mer!</p>

      <section>
        <h2 className="section-title">Utvalgte Festivaler</h2>
        {festivals.loading && <p>Laster festivaler...</p>}
        {festivals.error && <p className="error">Feil: {festivals.error}</p>}
        {!festivals.loading && !festivals.error && (
          <div className="event-grid">
            {festivals.data.length ? (
              festivals.data.map((event) => (
                <Link key={event.id} to={getEventDetailsUrl(event.id)} className="event-link">
                  <EventCard
                    id={event.id}
                    name={event.name}
                    image={
                      event.images?.find((img) => img.ratio === '16_9')?.url ||
                      event.images?.[0]?.url ||
                      'https://via.placeholder.com/300x169.png?text=No+Image'
                    }
                    city={event._embedded?.venues?.[0]?.city?.name}
                    country={event._embedded?.venues?.[0]?.country?.name}
                    date={event.dates?.start?.localDate}
                    clickable={true}
                  />
                </Link>
              ))
            ) : (
              <p>Ingen festivaler å vise.</p>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title">Arrangementer i Store Byer</h2>
        <div className="city-buttons">
          {majorCities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.name)}
              className="city-button"
              disabled={city.loading && city.name === city.name}
            >
              {city.name}
            </button>
          ))}
        </div>
        {city.name && (
          <>
            <h3 className="section-subtitle">I {city.name} kan du oppleve:</h3>
            {city.loading && <p>Laster arrangementer...</p>}
            {city.error && <p className="error">Feil: {city.error}</p>}
            {!city.loading && !city.error && (
              <div className="event-grid">
                {city.data.length ? (
                  city.data.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      name={event.name}
                      image={
                        event.images?.find((img) => img.ratio === '16_9')?.url ||
                        event.images?.[0]?.url ||
                        'https://placehold.co/300x169'
                      }
                      city={event._embedded?.venues?.[0]?.city?.name}
                      country={event._embedded?.venues?.[0]?.country?.name}
                      date={event.dates?.start?.localDate}
                      clickable={false}
                    />
                  ))
                ) : (
                  <p>Ingen arrangementer i {city.name}.</p>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}