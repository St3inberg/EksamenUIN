export const user = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number',
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          {title: 'Female', value: 'female'},
          {title: 'Male', value: 'male'},
          {title: 'Non-binary', value: 'non-binary'},
          {title: 'Prefer not to say', value: 'not-specified'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'wishlist',
      title: 'Wishlist',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    },
    {
      name: 'previousPurchases',
      title: 'Previous Purchases',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    },
    {
      name: 'friends',
      title: 'Friends',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
    },
    
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'profileImage',
    },
  },
};
export default user;