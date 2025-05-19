import { useEffect, useState } from 'react';
import { searchEvents } from '../../api/ticketmaster';
import EventCard from "../cards/EventCard.jsx";

const DEFAULT_FESTIVAL_IMAGE = 'https://placehold.co/600x400/orange/white?text=Festival';

const festivals = [
  "Findings Festival",
  "Neon Festival",
  "Skeikampenfestivalen",
  "Tons of Rock"
];

export default function FestivalSection() {
  const [festivalData, setFestivalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
                : events[0];              if (event) {
                return {
                  id: event.id,
                  name: event.name || festivalName,
                  image: event.images?.find(img => img.ratio === '16_9')?.url
                    || event.images?.[0]?.url
                    || DEFAULT_FESTIVAL_IMAGE,
                  city: event._embedded?.venues?.[0]?.city?.name || 'Oslo',
                  country: event._embedded?.venues?.[0]?.country?.name || 'Norway',
                  date: event.dates?.start?.localDate || 'Coming Soon',
                  url: event.url // Ticketmaster URL
                };
              }
            }            return {
              id: `festival-placeholder-${festivalName.replace(/\s+/g, '-').toLowerCase()}`,
              name: festivalName,
              image: DEFAULT_FESTIVAL_IMAGE,
              city: 'Oslo',
              country: 'Norway',
              date: 'Coming Soon'
            };
          } catch (error) {
            console.error(`Error fetching ${festivalName}:`, error);            return {
              id: `festival-placeholder-${festivalName.replace(/\s+/g, '-').toLowerCase()}`,
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

  return (
    <section className="festivals-section">
      <h2 className="section-title">Utvalgte Festivaler</h2>
      {isLoading ? (
        <p>Laster festivaler...</p>
      ) : (
        <div className="festivals-grid">
          {festivalData.length > 0 ? (            festivalData.map((event) => (
              <div key={event.id} className="event-container">
                <EventCard
                  eventId={event.id}
                  name={event.name}
                  image={event.image}
                  city={event.city}
                  country={event.country}
                  date={event.date}
                  clickable={true}
                  showWishlist={true}
                />
              </div>
            ))
          ) : (
            <p>Ingen festivaler funnet</p>
          )}
        </div>
      )}
    </section>
  );
}
