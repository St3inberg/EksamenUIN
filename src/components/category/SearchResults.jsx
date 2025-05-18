import { Link } from 'react-router-dom';

export default function SearchResults({ results, query, loading, error, categoryName }) {
  // Early returns for loading and error states
  if (loading) {
    return <p className="loading-message">Searching for "{query}"...</p>;
  }
  
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }
    
  return (
    <section className="search-results">
      <header className="search-results-header">
        <h3>
          {results.length > 0 
            ? `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for "${query}"` 
            : `No results found for "${query}"`}
        </h3>
        <p className="search-category">
          Category: <span className="category-name">{categoryName}</span>
        </p>
      </header>
      
      {results.length === 0 ? (
        <p className="no-results">
          Try adjusting your search terms or browse all {categoryName} events.
        </p>
      ) : (
        <ul className="results-grid">
          {results.map((event) => (
            <li key={event.id} className="result-item">
              <Link to={`/event/${event.id}`} className="result-link">
                <figure className="result-image-container">
                  <img 
                    src={event.images?.find(img => img.ratio === '16_9')?.url || 
                         event.images?.[0]?.url || 
                         'https://placehold.co/300x169'}
                    alt={event.name}
                    className="result-image"
                  />
                </figure>
                <article className="result-content">
                  <h4>{event.name}</h4>
                  <footer className="result-details">
                    <time className="result-date">
                      {event.dates?.start?.localDate || 'TBA'}
                    </time>
                    <address className="result-location">
                      {event._embedded?.venues?.[0]?.city?.name || 'Unknown'}, 
                      {event._embedded?.venues?.[0]?.country?.name || 'Unknown'}
                    </address>
                  </footer>
                </article>
              </Link>
            </li>
          ))}
        </ul>      )}
    </section>
  );
}
