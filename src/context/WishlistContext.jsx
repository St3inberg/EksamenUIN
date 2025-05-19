import { useState, useEffect } from 'react';
import { WishlistContext } from './createWishlistContext';

// Provider component
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add an event to the wishlist
  const addToWishlist = (eventId) => {
    if (!wishlist.includes(eventId)) {
      setWishlist([...wishlist, eventId]);
    }
  };

  // Remove an event from the wishlist
  const removeFromWishlist = (eventId) => {
    setWishlist(wishlist.filter(id => id !== eventId));
  };

  // Toggle an event in the wishlist
  const toggleWishlist = (eventId) => {
    if (wishlist.includes(eventId)) {
      removeFromWishlist(eventId);
    } else {
      addToWishlist(eventId);
    }
  };

  // Check if an event is in the wishlist
  const isInWishlist = (eventId) => {
    return wishlist.includes(eventId);
  };

  // Context value
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
