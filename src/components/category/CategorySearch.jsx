import { useState } from 'react';

export default function CategorySearch({ onSearch, categoryName }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); 
  };
  return (
    <section className={`category-search ${searchTerm.trim() ? 'search-active' : ''}`}>
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <div className="search-input-group">
          <label htmlFor="event-search" className="search-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </label>
          <input
            id="event-search"
            type="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder={`Search ${categoryName} events...`}
            className="search-input"
            aria-label={`Search ${categoryName} events`}
          />
          {searchTerm && (
            <button 
              type="button" 
              className="search-clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </section>
  );
}
