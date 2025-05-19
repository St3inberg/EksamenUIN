import React from 'react';

export default function EventInfo({ date, location, description, eventType, priceRange, artistLineup }) {
  // Function to format the description with proper paragraph breaks
  const formatDescription = (desc) => {
    if (!desc) return null;
    
    // Split by paragraphs and filter out empty ones
    const paragraphs = desc.split(/\n\n|\r\n\r\n|\r\r/).filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="description-paragraph">{paragraph}</p>
    ));
  };

  return (
    <div className="event-info">
      <div className="event-date-location">
        <h2>Event Details</h2>
        {date && (
          <p className="event-date">
            <span className="info-label">Date:</span> {date}
          </p>
        )}
        {location && (
          <p className="event-location">
            <span className="info-label">Location:</span> {location}
          </p>
        )}
      </div>
      
      {description && (
        <div className="event-description">
          <h2>Description</h2>
          <div className="description-content">
            {formatDescription(description)}
          </div>
        </div>
      )}

      {eventType && (
        <div className="ticket-info">
          <h2>Event Information</h2>
          <p><span className="info-label">Type:</span> {eventType}</p>
          {priceRange && (
            <p><span className="info-label">Price Range:</span> {priceRange}</p>
          )}
          {artistLineup && artistLineup.length > 0 && (
            <div className="lineup-section">
              <p><span className="info-label">Featured Artists:</span></p>
              <ul className="artist-lineup">
                {artistLineup.map((artist, index) => (
                  <li key={index}>{artist}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}    </div>
  );
}
