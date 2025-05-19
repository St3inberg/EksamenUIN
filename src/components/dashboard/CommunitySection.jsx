export default function CommunitySection({ 
  sanityUsers, 
  loading, 
  error 
}) {
  // Sort users by wishlist count to highlight most active users first
  const sortedUsers = sanityUsers ? [...sanityUsers].sort((a, b) => 
    (b.wishlistCount || 0) - (a.wishlistCount || 0)
  ) : [];
  
  const handleAddFriend = (userId) => {
    // In a real app, this would call an API to add friend
    console.log(`Adding friend with ID: ${userId}`);
    alert('Friend request sent!');
  };
  
  const handleViewProfile = (userId) => {
    // In a real app, this would navigate to user profile
    console.log(`Viewing profile of user with ID: ${userId}`);
    alert('Viewing user profile');
  };

  return (
    <section className="dashboard-section users-section">
      <h2>Community Members</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">Error loading users: {error}</p>
      ) : sortedUsers.length > 0 ? (
        <div className="users-grid">
          {sortedUsers.map(user => (
            <div key={user._id} className="user-card">
              <div className="user-card-avatar">
                {user.profileImage?.asset?.url ? (
                  <img 
                    src={user.profileImage.asset.url} 
                    alt={user.name}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">{user.name[0]}</div>
                )}
              </div>
              <div className="user-card-content">
                <h3>{user.name}</h3>
                <p>{user.wishlistCount || 0} events</p>
                <div className="user-card-actions">
                  <button 
                    onClick={() => handleViewProfile(user._id)} 
                    className="user-profile-button"
                    aria-label="View profile"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => handleAddFriend(user._id)} 
                    className="user-add-friend-button"
                    aria-label="Add friend"
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No other users available.</p>
      )}
    </section>
  );
}
