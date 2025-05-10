import React from "react";


export default function EventCard ({name,image,city,country,date,clickable = true}) {
  return (
    <article
      className="event-card"
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      <img
        src={image}
        alt={name}
        className="event-image"
      />
      <h2 className="event-title">{name}</h2>
      <p className="event-location">
        {city}, {country}
      </p>
      <p className="event-date">{date}</p>
    </article>
  );
};



