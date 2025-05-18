import { createClient } from '@sanity/client';


const SANITY_API_TOKEN = import.meta.env.VITE_SANITY_API_TOKEN;


export const client = createClient({
  projectId: '7sm8nni0',       
  dataset: 'production',       
  useCdn: false,               
  apiVersion: '2024-05-01',
  token: SANITY_API_TOKEN
});
