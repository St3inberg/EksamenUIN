import { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
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
  };

  return (
    <button
      className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
      onClick={handleToggleWishlist}
      aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist`}
    >
      <span className="heart-icon" aria-hidden="true">
        {isWishlisted ? '♥' : '♡'}
      </span>
    </button>
  );
}

WishlistButton.propTypes = {
  eventId: PropTypes.string.isRequired
};
