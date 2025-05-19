import { useState } from 'react';

// Icon components for filter elements
function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );
}

export default function CategoryFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    date: '',
    country: '',
    city: ''
  });
  
  // Whether filters are currently active
  const hasActiveFilters = filters.date || filters.country || filters.city;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      date: '',
      country: '',
      city: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <aside className={`category-filter ${hasActiveFilters ? 'has-active-filters' : ''}`}>
      <div className="filter-header">
        <span className="filter-icon"><FilterIcon /></span>
        <span className="filter-title">Filters</span>
      </div>
      
      <fieldset className="filters-container">
        <legend className="visually-hidden">Filter Events</legend>
        
        <div className="filter-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
          >
            <option value="">All Countries</option>
            <option value="NO">Norway</option>
            <option value="SE">Sweden</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city name"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </div>
        
        {hasActiveFilters && (
          <div className="filter-group">
            <button 
              id="reset"
              className="reset-button"
              onClick={handleReset}
              type="button"
              aria-label="Reset all filters"
            >
              Clear All
            </button>
          </div>
        )}
      </fieldset>
    </aside>
  );
}
