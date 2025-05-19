import { useState, useEffect } from 'react';
import { WishlistContext } from './createWishlistContext';


export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  
  const addToWishlist = (eventId) => {
    if (!wishlist.includes(eventId)) {
      setWishlist([...wishlist, eventId]);
    }
  };

  
  const removeFromWishlist = (eventId) => {
    setWishlist(wishlist.filter(id => id !== eventId));
  };

  
  const toggleWishlist = (eventId) => {
    if (wishlist.includes(eventId)) {
      removeFromWishlist(eventId);
    } else {
      addToWishlist(eventId);
    }
  };

  
  const isInWishlist = (eventId) => {
    return wishlist.includes(eventId);
  };

  
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
