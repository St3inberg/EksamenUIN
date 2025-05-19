import { useState, useEffect } from 'react';

export default function ActivitySection({ sanityUsers, sanityEvents }) {
  const [activities, setActivities] = useState([]);
  
  // Generate mock activity data based on users and events
  useEffect(() => {
    if (sanityUsers && sanityUsers.length > 0 && sanityEvents && sanityEvents.length > 0) {
      // Create sample activities for demonstration
      const mockActivities = [];
      
      // Use real user and event data to create realistic activities
      for (let i = 0; i < Math.min(10, sanityUsers.length * 2); i++) {
        const randomUser = sanityUsers[Math.floor(Math.random() * sanityUsers.length)];
        const randomEvent = sanityEvents[Math.floor(Math.random() * sanityEvents.length)];
        const activityTypes = [
          'wishlisted',
          'attending',
          'commented on',
          'shared'
        ];
        const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        
        // Random time within the last 7 days
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 7));
        
        mockActivities.push({
          id: `activity-${i}`,
          userId: randomUser._id,
          userName: randomUser.name,
          userImage: randomUser.profileImage?.asset?.url,
          eventId: randomEvent._id,
          eventName: randomEvent.title || randomEvent.name,
          eventImage: randomEvent.mainImage?.asset?.url || 
                      randomEvent.images?.[0]?.asset?.url || 
                      null,
          activityType: randomType,
          timestamp
        });
      }
      
      // Sort by timestamp (newest first)
      mockActivities.sort((a, b) => b.timestamp - a.timestamp);
      setActivities(mockActivities);
    }
  }, [sanityUsers, sanityEvents]);
  
  // Format relative time like "2 hours ago", "3 days ago", etc.
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <section className="dashboard-section activity-section">
      <h2>Recent Activity</h2>
      
      {activities.length > 0 ? (
        <div className="activity-feed">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-user">
                {activity.userImage ? (
                  <img 
                    src={activity.userImage} 
                    alt={activity.userName}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">{activity.userName[0]}</div>
                )}
              </div>
              
              <div className="activity-content">
                <p className="activity-text">
                  <span className="highlight">{activity.userName}</span> {activity.activityType}{' '}
                  <span className="highlight">{activity.eventName}</span>
                </p>
                <span className="activity-time">{formatRelativeTime(activity.timestamp)}</span>
              </div>
              
              {activity.eventImage && (
                <div className="activity-event">
                  <img src={activity.eventImage} alt={activity.eventName} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No recent activity to show.</p>
      )}
    </section>
  );
}
