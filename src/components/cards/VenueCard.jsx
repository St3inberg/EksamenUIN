export default function VenueCard({ name, image, city, country, address }) {
  return (
    <article className="venue-card">      <div className="aspect-container">
        <img
          src={image}
          alt={`Venue ${name}`}
          className="venue-image"
          loading="lazy"
        />
      </div><div className="venue-content">
        <h3 className="venue-title">{name}</h3>
        <address className="venue-location">
          <span className="visually-hidden">Location: </span>
          {address && <span className="venue-address">{address}<br /></span>}
          {city}, {country}
        </address>
      </div>
    </article>
  );
}


