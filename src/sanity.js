import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '7sm8nni0',       
  dataset: 'production',       
  useCdn: false,               
  apiVersion: '2024-05-01',
  
});
