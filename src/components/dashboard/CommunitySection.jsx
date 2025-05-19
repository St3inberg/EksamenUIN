export default function CommunitySection({ 
  sanityUsers, 
  loading, 
  error 
}) {
  return (
    <section className="dashboard-section users-section">
      <h2>Community</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">Error loading users: {error}</p>
      ) : sanityUsers.length > 0 ? (
        <div className="users-grid">
          {sanityUsers.map(user => (
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
                <p>Wishlisted: {user.wishlistCount || 0} events</p>
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
