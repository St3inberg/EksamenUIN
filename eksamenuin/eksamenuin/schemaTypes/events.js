export const events = {
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'date', type: 'datetime', title: 'Date' },
      { name: 'venue', type: 'string', title: 'Venue' },
      { name: 'description', type: 'text', title: 'Description' },
      { name: 'ticketLink', type: 'url', title: 'Ticket Link' },
      { name: 'image', type: 'image', title: 'Image'},
      { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
      { name: 'category', type: 'string', title: 'Category' },
      
      {name: 'user',
      type: 'reference',
      to: [{type: 'user'}],
      }

      
    ]
  }
  