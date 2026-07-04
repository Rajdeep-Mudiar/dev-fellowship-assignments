export const UserDetails = ({
  name,
  isOnline,
  hideOffline,
  isPremium,
  isNewUser,
  role,
}) => {
  if (hideOffline && !isOnline) {
    return null; // Don't render anything if the user is offline and hideOffline is true
  }

  let roleBadge = null;
  if (role === "admin") {
    roleBadge = <span>Admin</span>;
  } else if (role === "moderator") {
    roleBadge = <span>Moderator</span>;
  } else if (role === "user") {
    roleBadge = <span>User</span>;
  } else if (role == "VIP") {
    roleBadge = <span>VIP</span>;
  }
  return (
    <div>
      <h3>
        {name}

        {isPremium && <span>⭐</span>}
        {isNewUser && <span>🍕</span>}
      </h3>
      <p>Role: {roleBadge} </p>
      <span>Status: {isOnline ? "Online" : "Offline"}</span>

      <p>{isOnline ? "Available for chat" : "Not Available"}</p>

      {isOnline ? (
        <button>Send Message</button>
      ) : (
        <small>Check back later</small>
      )}
    </div>
  );
};
