import React from 'react';

export default function Footer() {
  return (
    <footer className="background_footer">
      <div className="footer_container">
        <p className="footer-text-small">
          Data provided by <a href="https://developer.ticketmaster.com" target="_blank" className="footer">Ticketmaster</a>.
        </p>
        <p className="footer_text">
          &copy; {new Date().getFullYear()} Billettlyst. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
