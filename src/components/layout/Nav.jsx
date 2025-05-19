import { useState } from "react";
import { Link } from "react-router-dom";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { isLoggedIn, logout } = useAuth();
  
  const categories = [
    { id: 1, name: "Music", slug: "music" },
    { id: 2, name: "Sport", slug: "sport" },
    { id: 3, name: "Theatre", slug: "theatre" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

return (
    <div className="nav-wrapper">
      <nav className="main-nav">
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <h1>Billettlyst</h1>
          </Link>
          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
          </button>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/category/${category.slug}`} onClick={() => setIsMenuOpen(false)}>
                {category.name}
              </Link>
            </li>          ))}
          <li>
            {isLoggedIn ? (
              <div className="dashboard-nav-links">
                <Link to="/dashboard" className="dashboard-link" onClick={() => setIsMenuOpen(false)}>
                  My Page
                  {wishlist.length > 0 && (
                    <span className="wishlist-count">{wishlist.length}</span>
                  )}
                </Link>
                <button onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }} className="logout-nav-button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/dashboard" className="dashboard-link" onClick={() => setIsMenuOpen(false)}>
                Login
                {wishlist.length > 0 && (
                  <span className="wishlist-count">{wishlist.length}</span>
                )}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}


