import UserProfile from './UserProfile';
import WishlistSection from './WishlistSection';
import CuratedEventsSection from './CuratedEventsSection';
import CommunitySection from './CommunitySection';

export default function DashboardLayout({
  user,
  handleLogout,
  wishlistEvents,
  wishlistLoading,
  wishlistError,
  removeFromWishlist,
  sanityEvents,
  eventsLoading,
  eventsError,
  sanityUsers,
  usersLoading,
  usersError
}) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <UserProfile user={user} />

      <WishlistSection 
        wishlistEvents={wishlistEvents}
        loading={wishlistLoading}
        error={wishlistError}
        removeFromWishlist={removeFromWishlist}
      />

      <CuratedEventsSection 
        sanityEvents={sanityEvents}
        loading={eventsLoading}
        error={eventsError}
      />

      <CommunitySection 
        sanityUsers={sanityUsers}
        loading={usersLoading}
        error={usersError}
      />
    </div>
  );
}
