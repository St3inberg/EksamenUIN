// Toggle button for adding/removing events from the wishlist
import { useEffect, useState } from 'react';
import useWishlist from '../../hooks/useWishlist';

export default function WishlistButton({ eventId }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(eventId));
  }, [eventId, isInWishlist]);

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(eventId);
    setIsWishlisted(prev => !prev);
  };  return (
    <button 
      className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
      onClick={handleToggleWishlist}
      aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist`}
    >
      <span className="heart-icon" aria-hidden="true">
        {isWishlisted ? '♥' : '♡'}
      </span>
    </button>
  );
}


