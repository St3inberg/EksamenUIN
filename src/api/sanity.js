import { client } from '../sanity';


export async function fetchAllSanityEvents() {
  try {
    return await client.fetch(`*[_type == "event"] {
      _id,
      name,
      ticketmasterId,
      isCmsManaged,
      description,
      date,
      venueName,
      city,
      country,
      eventType,
      image,
      artistLineup,
      priceRange,
      "attendees": *[_type == "user" && references(^._id)].name
    }`);
  } catch (error) {
    console.error("Error fetching Sanity events:", error);
    return [];
  }
}


export async function fetchSanityEventByTicketmasterId(tmEventId) {
  try {
    return await client.fetch(`*[_type == "event" && ticketmasterId == $tmEventId][0] {
      _id,
      name,
      ticketmasterId,
      isCmsManaged,
      description,
      date,
      venueName,
      city,
      country,
      eventType,
      image,
      artistLineup,
      priceRange,
      url,
      "attendees": *[_type == "user" && references(^._id)].name
    }`, { tmEventId });
  } catch (error) {
    console.error(`Error fetching Sanity event with ID ${tmEventId}:`, error);
    return null;
  }
}


export async function fetchAllSanityUsers() {
  try {
    return await client.fetch(`*[_type == "user"] {
      _id,
      name,
      email,
      gender,
      age,
      profileImage,
      "wishlistCount": count(wishlist),
      "previousPurchasesCount": count(previousPurchases),
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
  } catch (error) {
    console.error("Error fetching Sanity users:", error);
    return [];
  }
}


export async function findUserByEmail(email) {
  try {
    return await client.fetch(`*[_type == "user" && email == $email][0] {
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
  } catch (error) {
    console.error(`Error finding user with email ${email}:`, error);
    return null;
  }
}

export async function fetchUsersForSanityEvent(eventId) {
  try {
    return await client.fetch(`*[_type == "user" && references($eventId)] {
      _id,
      name,
      profileImage
    }`, { eventId });
  } catch (error) {
    console.error(`Error fetching users for event ${eventId}:`, error);
    return [];
  }
}


export async function createSanityUser(userData) {
  try {
    return await client.create({
      _type: 'user',
      ...userData
    });
  } catch (error) {
    console.error("Error creating Sanity user:", error);
    throw new Error("Failed to create user in Sanity CMS");
  }
}


export async function addEventToUserWishlist(userId, eventId) {
  try {
    return await client
      .patch(userId)
      .setIfMissing({ wishlist: [] })
      .append('wishlist', [{ _type: 'reference', _ref: eventId }])
      .commit();
  } catch (error) {
    console.error(`Error adding event ${eventId} to user ${userId} wishlist:`, error);
    throw new Error("Failed to add event to wishlist");
  }
}


export async function removeEventFromUserWishlist(userId, eventId) {
  try {
    const user = await client.getDocument(userId);
    
    if (!user || !user.wishlist) {
      throw new Error("User or wishlist not found");
    }
    
    const updatedWishlist = user.wishlist.filter(ref => ref._ref !== eventId);
    
    return await client
      .patch(userId)
      .set({ wishlist: updatedWishlist })
      .commit();
  } catch (error) {
    console.error(`Error removing event ${eventId} from user ${userId} wishlist:`, error);
    throw new Error("Failed to remove event from wishlist");
  }
}
