const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

if (!API_KEY) {
  throw new Error('Ticketmaster API key is not defined in environment variables.');
}

export async function fetchJson(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    locale: '*',
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`API Error: ${response.status} ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch from Ticketmaster:', error);
    throw error;
  }
}

export async function searchEvents(params) {
  return fetchJson('/events.json', params);
}

export async function searchAttractions(params) {
  return fetchJson('/attractions.json', params);
}

export async function searchVenues(params) {
  return fetchJson('/venues.json', params);
}

export async function getEventDetails(eventId) {
  return fetchJson(`/events/${eventId}.json`);
}

export async function getAttractionDetails(attractionId) {
  return fetchJson(`/attractions/${attractionId}.json`);
}

export function getEventDetailsUrl(eventId) {
  return `/event/${encodeURIComponent(eventId)}`;
}

export function getAttractionDetailsUrl(attractionId) {
  return `/attraction/${encodeURIComponent(attractionId)}`;
}




export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};