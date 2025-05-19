import React, { useState } from 'react';


export default function SanityUserCard({ user }) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  
  const userInitial = user.name ? user.name[0].toUpperCase() : '?';
  
  return (
    <div className="user-card">
      <div className="user-card-avatar">
        {user.profileImage?.asset?.url ? (
          <img 
            src={user.profileImage.asset.url} 
            alt={user.name}
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-placeholder">{userInitial}</div>
        )}
        <div className="user-status-indicator active"></div>
      </div>
      
      <div className="user-card-content">
        <h3>{user.name}</h3>
        <p>{user.wishlistCount || 0} events</p>
        
        {expanded && (
          <div className="user-expanded-content">
            {user.bio && (
              <p className="user-bio">{user.bio}</p>
            )}
            
            <div className="user-detailed-stats">
              <div className="stat-item">
                <span className="stat-value">{user.wishlistCount || 0}</span>
                <span className="stat-label">Wishlisted</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.previousPurchasesCount || 0}</span>
                <span className="stat-label">Attended</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>
            
            {user.interests && user.interests.length > 0 && (
              <div className="user-interests">
                <h4>Interests</h4>
                <div className="interest-tags">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            )}
            
            <button className="follow-button">Follow User</button>
          </div>
        )}
        
        <button 
          onClick={toggleExpanded}
          className="expand-toggle"
          aria-expanded={expanded}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}
