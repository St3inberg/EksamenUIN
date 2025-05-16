export default function UserProfile({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        {user.profileImage && (
          <div className="profile-image">
            <img 
              src={user.profileImage.asset.url} 
              alt={`${user.name}'s profile`} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
