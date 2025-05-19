import EventCard from '../cards/EventCard';


export default function SearchResults({ results, query, loading, error, categoryName }) {
  const getEventImage = (event) => {
    const wideImage = event.images?.find(img => img.ratio === '16_9')?.url;
    if (wideImage) return wideImage;
    
    const firstImage = event.images?.[0]?.url;
    if (firstImage) return firstImage;
    
    return 'https://placehold.co/300x169';
  };

  const getEventLocation = (event) => {
    const city = event._embedded?.venues?.[0]?.city?.name || 'Unknown';
    const country = event._embedded?.venues?.[0]?.country?.name || 'Unknown';
    return `${city}, ${country}`;
  };

  const getEventDate = (event) => {
    return event.dates?.start?.localDate || 'TBA';
  };
  if (loading) {
    return <p className="loading-message">Searching for "{query}"...</p>;
  }
  
 
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }
  
  
  const getResultsHeading = () => {
    if (results.length > 0) {
      const resultText = results.length === 1 ? 'result' : 'results';
      return `Found ${results.length} ${resultText} for "${query}"`;
    } else {
      return `No results found for "${query}"`;
    }
  };
    
  return (
    <section className="search-results">
      <header className="search-results-header">
        <h3>{getResultsHeading()}</h3>
        <p className="search-category">
          Category: <span className="category-name">{categoryName}</span>
        </p>
      </header>
      
      {results.length === 0 ? (
        <p className="no-results">
          Try adjusting your search terms or browse all {categoryName} events.
        </p>
      ) : (        <div className="standard-grid">
          {results.map((event) => (
            <div key={event.id} className="event-container">              <EventCard 
                eventId={event.id}
                name={event.name}
                image={getEventImage(event)}
                city={getEventLocation(event).split(', ')[0]}
                country={getEventLocation(event).split(', ')[1]} 
                date={getEventDate(event)}
                clickable={true}
                showWishlist={true}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
