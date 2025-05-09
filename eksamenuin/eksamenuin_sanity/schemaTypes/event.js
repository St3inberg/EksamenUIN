export const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Event Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'ticketmasterId',
        title: 'Ticketmaster ID',
        type: 'string',
        description: 'The ID of the event from the Ticketmaster API, if applicable.',
        
      },
      {
        name: 'sanityEventId',
        title: 'Sanity Event ID',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        description: 'A unique slug for CMS-managed events, generated from the event name.',
        hidden: ({document}) => !document?.isCmsManaged, 
      },
      {
        name: 'isCmsManaged',
        title: 'CMS Managed Event',
        type: 'boolean',
        description: 'Indicates if this event is primarily managed within Sanity (true) or sourced from Ticketmaster (false).',
        initialValue: false,
      },
      {
        name: 'date',
        title: 'Date and Time',
        type: 'datetime',
      },
      {
        name: 'venueName',
        title: 'Venue Name',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'country',
        title: 'Country',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Event Image',
        type: 'image',
        options: {
          hotspot: true, 
        },
      },
      {
        name: 'eventType',
        title: 'Event Type',
        type: 'string',
        options: {
          list: [
            {title: 'Concert', value: 'concert'},
            {title: 'Festival', value: 'festival'},
            {title: 'Sports', value: 'sports'},
            {title: 'Theatre', value: 'theatre'},
            {title: 'Family', value: 'family'},
            {title: 'Other', value: 'other'},
          ],
        },
      },
      {
        name: 'artistLineup',
        title: 'Artist Lineup',
        type: 'array',
        of: [{type: 'string'}], 
        description: 'List of performing artists. For more complex scenarios, this could be a reference to an Artist schema.',
      },
      {
        name: 'url',
        title: 'Event URL',
        type: 'url',
        description: 'Link to the official event page or Ticketmaster page.',
      },
      {
        name: 'priceRange',
        title: 'Price Range',
        type: 'string', 
        description: 'A textual representation of the ticket price range.',
      },
      
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'venueName',
        media: 'image',
        date: 'date',
        isCms: 'isCmsManaged',
        tmId: 'ticketmasterId'
      },
      prepare(selection) {
        const {title, subtitle, media, date, isCms, tmId} = selection;
        const eventDate = date ? new Date(date).toLocaleDateString() : 'No date';
        const source = isCms ? 'CMS' : (tmId ? 'Ticketmaster' : 'Event');
        return {
          title: title,
          subtitle: `${subtitle || 'Unknown Venue'} on ${eventDate} (${source})`,
          media: media,
        };
      },
    },
  };
  
  export default event;