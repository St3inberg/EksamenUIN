import PropTypes from 'prop-types';

export default function VenueCard({ name, image, city, country, address }) {
  return (
    <article className="venue-card">
      <img
        src={image}
        alt={`Venue ${name}`}
        className="venue-image"
        loading="lazy"
      />
      <div className="venue-content">
        <h3 className="venue-title">{name}</h3>
        <p className="venue-location">
          <span className="visually-hidden">Location: </span>
          {address && <span className="venue-address">{address}<br /></span>}
          {city}, {country}
        </p>
      </div>
    </article>
  );
}

VenueCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  address: PropTypes.string,
};
