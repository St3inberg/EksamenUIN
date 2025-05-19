
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CategoryFilter from '../category/CategoryFilter';
import AttractionsList from '../category/AttractionsList';
import VenuesList from '../category/VenuesList';
import CategorySearch from '../category/CategorySearch';
import SearchResults from '../category/SearchResults';
import EventCard from '../cards/EventCard';
import { searchEvents } from '../../api/ticketmaster';
import { buildSearchParams } from '../../utils/categoryUtils';

export default function CategoryPage() {
  const { slug } = useParams();
  const [filters, setFilters] = useState({});
  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  useEffect(() => {    
    async function fetchCategoryEvents() {
      try {
        setLoading(true);
        
        const params = buildSearchParams(categoryName, filters);
        
        const response = await searchEvents(params);
        
        const fetchedEvents = response._embedded?.events || [];
        setEvents(fetchedEvents);
      } catch (err) {
        console.error('Error fetching category events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryEvents();
  }, [categoryName, filters]);
  
  const handleSearch = useCallback(async (query) => {
    if (!query) {
      resetSearchState();
      return;
    }
    
    updateSearchUIState(query, true);
    
    try {
      const params = buildSearchParams(categoryName, filters, query, 20);
      
      const response = await searchEvents(params);
      
      const results = response._embedded?.events || [];
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(err.message);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [categoryName, filters]);
  
  const resetSearchState = () => {
    setSearchResults([]);
    setSearchQuery('');
    setIsSearching(false);
    setSearchError(null);
  };
  
  const updateSearchUIState = (query, isLoading) => {
    setSearchQuery(query);
    setIsSearching(true);
    setSearchLoading(isLoading);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    resetSearchState();
  };

  const getEventImage = (event) => {
    const wideImage = event.images?.find((img) => img.ratio === '16_9')?.url;
    if (wideImage) return wideImage;
    
    const firstImage = event.images?.[0]?.url;
    if (firstImage) return firstImage;
    
    return 'https://placehold.co/300x169';
  };
  
  const getEventLocation = (event) => {
    return {
      city: event._embedded?.venues?.[0]?.city?.name || 'Unknown',
      country: event._embedded?.venues?.[0]?.country?.name || 'Unknown'
    };
  };

  const renderEventList = () => {
    if (loading) {
      return <div className="loading-message">Loading events...</div>;
    }
    
    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }
    
    if (events.length === 0) {
      return <p className="no-results">No {categoryName} events found</p>;
    }    return (
      <div className="standard-grid">
        {events.map((event) => {
          const location = getEventLocation(event);
          return (
            <div key={event.id} className="event-container">
              <EventCard
                eventId={event.id}
                name={event.name}
                image={getEventImage(event)}
                city={location.city}
                country={location.country}
                date={event.dates?.start?.localDate || 'TBA'}
                clickable={true}
                showWishlist={true}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container category-page">
      <h1 className="section-title">{categoryName} Events</h1>
      <div className="search-filter-container">
        <CategorySearch onSearch={handleSearch} categoryName={categoryName} />
        <CategoryFilter onFilterChange={handleFilterChange} />
      </div>
      
      {isSearching ? (
        <SearchResults
          results={searchResults}
          query={searchQuery}
          loading={searchLoading}
          error={searchError}
          categoryName={categoryName}
        />
      ) : (
        <>
          <section className="events-section">
            <h2 className="section-subtitle">{categoryName} Events</h2>
            {renderEventList()}
          </section>      
          
          <section className="attractions-section">
            <h2 className="section-subtitle">Popular {categoryName} Artists & Attractions</h2>
            <div className="attractions-wrapper">
              <AttractionsList categoryName={categoryName} filters={filters} />
            </div>
          </section>

          <section className="venues-section">
            <h2 className="section-subtitle">{categoryName} Venues</h2>
            <div className="venues-wrapper">
              <VenuesList categoryName={categoryName} filters={filters} />
            </div>
          </section>
        </>
      )}
    </div>
  );
} 
