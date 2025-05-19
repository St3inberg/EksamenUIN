export default function UserProfile({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-section user-profile-section">
      <h2>My Profile</h2>
      <div className="user-profile">
        <div className="user-avatar-container">
          {user.profileImage?.asset?.url ? (
            <img 
              src={user.profileImage.asset.url} 
              alt={`${user.name}'s profile`} 
              className="user-avatar" 
            />
          ) : (
            <div className="user-avatar-placeholder">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          )}
        </div>
        <div className="user-info">
          <h3>{user.name || 'User'}</h3>
          <p>{user.email || ''}</p>
          
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-value">{user.wishlisted?.length || 0}</span>
              <span className="stat-label">Wishlisted</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.attended?.length || 0}</span>
              <span className="stat-label">Attended</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.followers?.length || 0}</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
