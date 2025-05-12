import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchEvents, getEventDetailsUrl,searchAttractions} from '../api/ticketmaster';
import EventCard from "../components/cards/EventCard.jsx";



const festivalNames = ["Findings", "Neon", "Skeikampfestivalen", "Tons of Rock"];
const majorCities = [
  { name: "Oslo", id: "Oslo" },
  { name: "London", id: "London" },
  { name: "Berlin", id: "Berlin" },
  { name: "Paris", id: "Paris" },
];



export default function Home() {
  
  const [city, setCity] = useState({ name: null, data: [], loading: false, error: null });
  
  

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
      <div className="event-grid">
        {findings.data.map((event) => {
          const venue = event._embedded?.venues?.[0]
          const imageSrc =
            event.images?.find((img) => img.ratio === '16_9')?.url ||
            event.images?.[0]?.url ||
            'https://placehold.co/300x169'

          return (
            <Link
              key={event.id}
              to={getEventDetailsUrl(event.id)}
              className="event-link"
            >
              <EventCard
                id={event.id}
                name={event.name}
                image={imageSrc}
                city={venue?.city?.name}
                country={venue?.country?.name}
                date={event.dates?.start?.localDate}
                clickable
              />
            </Link>
          )
        })}
      </div>
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