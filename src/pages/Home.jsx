import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchEvents, getEventDetailsUrl } from '../api/ticketmaster';
import EventCard from "../components/cards/EventCard.jsx";

const DEFAULT_FESTIVAL_IMAGE = 'https://placehold.co/600x400/orange/white?text=Festival';

const festivals = [
  "Findings Festival",
  "Neon Festival",
  "Skeikampenfestivalen",
  "Tons of Rock"
];

const majorCities = [
  { name: "Oslo", id: "Oslo" },
  { name: "London", id: "London" },
  { name: "Berlin", id: "Berlin" },
  { name: "Paris", id: "Paris" }
];

export default function Home() {
  const [festivalData, setFestivalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState({
    name: null,
    data: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    async function fetchFestivals() {
      setIsLoading(true);

      try {
        const festivalPromises = festivals.map(async (festivalName) => {
          const searchParams = {
            keyword: festivalName,
            countryCode: 'NO',
            sort: 'date,asc',
            size: 5
          };

          if (festivalName === "Tons of Rock") {
            searchParams.startDateTime = "2025-06-25T00:00:00Z";
            searchParams.endDateTime = "2025-06-30T23:59:59Z";
          }

          try {
            const response = await searchEvents(searchParams);

            if (response._embedded?.events) {
              const events = response._embedded.events;
              const event = festivalName === "Tons of Rock"
                ? events.find(e => e.dates?.start?.localDate === "2025-06-25")
                : events[0];

              if (event) {
                return {
                  id: event.id || festivalName,
                  name: event.name || festivalName,
                  image: event.images?.find(img => img.ratio === '16_9')?.url
                    || event.images?.[0]?.url
                    || DEFAULT_FESTIVAL_IMAGE,
                  city: event._embedded?.venues?.[0]?.city?.name || 'Oslo',
                  country: event._embedded?.venues?.[0]?.country?.name || 'Norway',
                  date: event.dates?.start?.localDate || 'Coming Soon'
                };
              }
            }

            return {
              id: festivalName,
              name: festivalName,
              image: DEFAULT_FESTIVAL_IMAGE,
              city: 'Oslo',
              country: 'Norway',
              date: 'Coming Soon'
            };
          } catch (error) {
            console.error(`Error fetching ${festivalName}:`, error);
            return {
              id: festivalName,
              name: festivalName,
              image: DEFAULT_FESTIVAL_IMAGE,
              city: 'Oslo',
              country: 'Norway',
              date: 'Coming Soon'
            };
          }
        });

        const festivalsData = await Promise.all(festivalPromises);
        setFestivalData(festivalsData);
      } catch (error) {
        console.error('Failed to fetch festivals:', error);
      }

      setIsLoading(false);
    }

    fetchFestivals();
  }, []);

  const handleCityClick = async (cityName) => {
    setCity({ name: cityName, data: [], loading: true, error: null });

    try {
      const data = await searchEvents({ city: cityName, size: 10 });
      setCity({
        name: cityName,
        data: data._embedded?.events || [],
        loading: false,
        error: null
      });
    } catch (err) {
      setCity({
        name: cityName,
        data: [],
        loading: false,
        error: err.message || 'Kunne ikke laste arrangementer'
      });
    }
  };

  return (
    <div className="container">
      <h1 className="section-title">Velkommen til Hjemside!!</h1>
      <p>Oppdag de feteste arrangementene innen musikk, teater og mer!</p>

      <section>
        <h2 className="section-title">Utvalgte Festivaler</h2>
        {isLoading ? (
          <p>Laster festivaler...</p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem 0' }}>
            {festivalData.length > 0 ? (
              festivalData.map((event) => (
                <Link
                  key={event.id}
                  to={getEventDetailsUrl(event.id)}
                  className="event-link"
                >
                  <EventCard
                    name={event.name}
                    image={event.image}
                    city={event.city}
                    country={event.country}
                    date={event.date}
                    clickable
                  />
                </Link>
              ))
            ) : (
              <p>Ingen festivaler funnet</p>
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