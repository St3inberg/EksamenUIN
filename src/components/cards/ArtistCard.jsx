// Artist card component displaying artist information with image, name, genre and social links
import { useNavigate } from 'react-router-dom';

// Props include: name, image, genre, attractionId
// Optional props: social (array of social media links), clickable (defaults to false)
export default function ArtistCard({ 
    name, 
    image, 
    genre, 
    social = [], 
    attractionId, 
    clickable = false 
}) {
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
            }}        >            <div className="aspect-container">
                <img 
                    src={image || 'https://placehold.co/300x300'} 
                    alt={`Artist ${name}`} 
                    className="artist-image"
                    loading="lazy"
                />
            </div>
            
            <div className="artist-content">
                <h3 className="artist-name">{name}</h3>
                {genre && <p className="artist-genre">{genre}</p>}
                {social.length > 0 && (
                    <footer className="artist-social">
                        {social.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label={`${name}'s ${link.name} page`} // Better accessibility
                                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                            >
                                {link.name}
                            </a>
                        ))}
                    </footer>
                )}
            </div>
        </article>
    );
}

