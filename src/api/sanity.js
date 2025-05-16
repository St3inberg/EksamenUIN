import { client } from '../sanity';


export async function fetchAllSanityEvents() {
  return client.fetch(`*[_type == "event"] {
    _id,
    name,
    ticketmasterId,
    isCmsManaged,
    description,
    startDate,
    endDate,
    image,
    location,
    ticketType,
    price,
    "attendees": *[_type == "user" && references(^._id)].name
  }`);
}


export async function fetchSanityEventByTicketmasterId(tmEventId) {
  return client.fetch(`*[_type == "event" && ticketmasterId == $tmEventId][0] {
    _id,
    name,
    ticketmasterId,
    isCmsManaged,
    description,
    startDate,
    endDate,
    image,
    location,
    ticketType,
    price,
    "attendees": *[_type == "user" && references(^._id)].name
  }`, { tmEventId });
}


export async function fetchAllSanityUsers() {
  return client.fetch(`*[_type == "user"] {
    _id,
    name,
    email,
    profileImage,
    "wishlistCount": count(wishlist),
    "wishlist": wishlist[] -> {
      _id,
      name,
      ticketmasterId,
      image
    },
    "friends": friends[] -> {
      _id, 
      name,
      profileImage
    }
  }`);
}


export async function findUserByEmail(email) {
  return client.fetch(`*[_type == "user" && email == $email][0] {
    _id,
    name,
    email,
    profileImage,
    "wishlistCount": count(wishlist),
    "wishlist": wishlist[] -> {
      _id,
      name,
      ticketmasterId,
      image
    }
  }`, { email });
}

export async function fetchUsersForSanityEvent(eventId) {
  return client.fetch(`*[_type == "user" && references($eventId)] {
    _id,
    name,
    profileImage
  }`, { eventId });
}


export async function createSanityUser(userData) {
  return client.create({
    _type: 'user',
    ...userData
  });
}


export async function addEventToUserWishlist(userId, eventId) {
  return client
    .patch(userId)
    .setIfMissing({ wishlist: [] })
    .append('wishlist', [{ _type: 'reference', _ref: eventId }])
    .commit();
}


export async function removeEventFromUserWishlist(userId, eventId) {
  const user = await client.getDocument(userId);
  const updatedWishlist = user.wishlist.filter(ref => ref._ref !== eventId);
  
  return client
    .patch(userId)
    .set({ wishlist: updatedWishlist })
    .commit();
}
