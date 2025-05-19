// Category Utilities - Maps category names to Ticketmaster API parameters

export const SEGMENT_IDS = {
  MUSIC: 'KZFzniwnSyZfZ7v7nJ',
  SPORTS: 'KZFzniwnSyZfZ7v7nE',
  ARTS_THEATRE: 'KZFzniwnSyZfZ7v7na',
  FAMILY: 'KZFzniwnSyZfZ7v7n1'
};


export function getCategoryClassification(categoryName) {

  const lowerCaseName = categoryName.toLowerCase();
  
  switch(lowerCaseName) {
    case 'music':
      return { 
        classificationName: 'Music',
        segmentId: SEGMENT_IDS.MUSIC
      };
    case 'sports':
      return { 
        classificationName: 'Sports',
        segmentId: SEGMENT_IDS.SPORTS 
      };
    case 'arts':
    case 'theatre':
      return { 
        classificationName: 'Arts & Theatre',
        segmentId: SEGMENT_IDS.ARTS_THEATRE
      };
    case 'family':
      return { 
        classificationName: 'Family',
        segmentId: SEGMENT_IDS.FAMILY
      };
    default:
      
      return { segmentName: categoryName };
  }
}


export function buildSearchParams(categoryName, filters, keyword, size = 10) {
  
  const classificationParams = getCategoryClassification(categoryName);
  
  
  const params = {
    ...classificationParams,
    size: size
  };
  
  
  if (keyword) {
    params.keyword = keyword;
  }
  
 
  if (filters.city) {
    params.city = filters.city;
  }
  
  if (filters.country) {
    params.countryCode = filters.country;
  }
  
  if (filters.date) {
    params.startDateTime = `${filters.date}T00:00:00Z`;
  }
  
  return params;
}
