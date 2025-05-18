import { useState } from 'react';

export default function CategoryFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    date: '',
    country: '',
    city: ''
  });

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
    <aside className="category-filter">
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
        
        <div className="filter-group">
          <label htmlFor="reset">&nbsp;</label>
          <button 
            id="reset"
            className="reset-button"
            onClick={handleReset}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </fieldset>
    </aside>
  );
}
