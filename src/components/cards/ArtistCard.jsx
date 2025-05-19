import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ArtistCard({ name, image, genre, social = [], attractionId, clickable = false }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (clickable && attractionId) {
            navigate(`/attraction/${attractionId}`);
        }
    };

    return (
        <article 
            className="artist-card" 
            style={{ cursor: clickable ? 'pointer' : 'default' }}
            onClick={clickable ? handleClick : undefined}
            tabIndex={clickable ? 0 : undefined}
            role={clickable ? 'button' : undefined}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && clickable) {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <img 
                src={image || 'https://placehold.co/300x300'} 
                alt={`Artist ${name}`} 
                className="artist-image"
                loading="lazy"
            />
            <div className="artist-content">
                <h3 className="artist-name">{name}</h3>
                {genre && <p className="artist-genre">{genre}</p>}
                
                {social.length > 0 && (
                    <div className="artist-social">
                        {social.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label={link.name}
                                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking on social link
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

ArtistCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    genre: PropTypes.string,
    social: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ),
    attractionId: PropTypes.string,
    clickable: PropTypes.bool
};