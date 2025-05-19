import { useState } from 'react';

export default function UsersList({ users }) {
  const [showAll, setShowAll] = useState(false);
  
  
  const displayedUsers = showAll ? users : users.slice(0, 4);
  
  const handleToggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return (
    <div className="interested-users">
      <h2>Friends Going</h2>
      <p className="social-description">
        Join {users.length} {users.length === 1 ? 'person' : 'people'} at this event
      </p>
      
      <ul className="users-list">
        {displayedUsers.map((user, index) => (
          <li 
            key={user._id} 
            className="user-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {user.profileImage?.asset?.url ? (
              <img 
                src={user.profileImage.asset.url} 
                alt={user.name} 
                className="user-image"
                loading="lazy"
              />
            ) : (
              <div className="user-image-placeholder">{user.name[0].toUpperCase()}</div>
            )}
            <span className="user-name" title={user.name}>{user.name}</span>
          </li>
        ))}
      </ul>
      
      {users.length > 4 && (
        <button className="see-all-attendees" onClick={handleToggleShowAll}>
          {showAll ? 'Show less' : `See all ${users.length} attendees`}
        </button>
      )}
    </div>
  );
}
