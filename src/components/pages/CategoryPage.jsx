import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchEvents } from '../../api/ticketmaster';
import EventCard from '../cards/EventCard';
import CategoryFilter from '../category/CategoryFilter';
import AttractionsList from '../category/AttractionsList';
import VenuesList from '../category/VenuesList';

export default function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    async function fetchCategoryEvents() {
      try {
        setLoading(true);
        
        
        let classificationParams = {};
        switch(categoryName.toLowerCase()) {
          case 'music':
            classificationParams = { classificationName: 'Music' };
            break;
          case 'sports':
            classificationParams = { classificationName: 'Sports' };
            break;
          case 'arts':
          case 'theatre':
            classificationParams = { classificationName: 'Arts & Theatre' };
            break;
          case 'family':
            classificationParams = { classificationName: 'Family' };
            break;
          default:
            classificationParams = { segmentName: categoryName };
        }
        
        const params = {
          ...classificationParams,
          size: 10,
          ...(filters.city && { city: filters.city }),
          ...(filters.country && { countryCode: filters.country }),
          ...(filters.date && { startDateTime: `${filters.date}T00:00:00Z` })
        };
        
        const response = await searchEvents(params);
        if (response._embedded?.events) {
          setEvents(response._embedded.events);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchCategoryEvents();
  }, [categoryName, filters]);
  return (
    <div className="container category-page">
      <h1 className="section-title">{categoryName} Events</h1>
      <CategoryFilter onFilterChange={handleFilterChange} />
      
      {/* Events Section */}      
      <section className="events-section">
        <h2 className="section-subtitle">{categoryName} Events</h2>
        {loading ? (
          <div className="loading-message">Loading events...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <div className="events-grid">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="event-container">
                  <EventCard
                    eventId={event.id}
                    name={event.name}
                    image={
                      event.images?.find((img) => img.ratio === '16_9')?.url ||
                      event.images?.[0]?.url ||
                      'https://placehold.co/300x169'
                    }
                    city={event._embedded?.venues?.[0]?.city?.name || 'Unknown'}
                    country={event._embedded?.venues?.[0]?.country?.name || 'Unknown'}
                    date={event.dates?.start?.localDate || 'TBA'}
                    clickable={true}
                    showWishlist={true}
                  />
                </div>
              ))
            ) : (
              <p className="no-results">No {categoryName} events found</p>
            )}
          </div>
        )}
      </section>      {/* Attractions Section */}
      <section className="attractions-section">
        <h2 className="section-subtitle">Popular {categoryName} Artists & Attractions</h2>
        <div className="attractions-wrapper">
          <AttractionsList categoryName={categoryName} filters={filters} />
        </div>
      </section>

      {/* Venues Section */}
      <section className="venues-section">
        <h2 className="section-subtitle">{categoryName} Venues</h2>
        <div className="venues-wrapper">
          <VenuesList categoryName={categoryName} filters={filters} />
        </div>
      </section>
    </div>
  );
}