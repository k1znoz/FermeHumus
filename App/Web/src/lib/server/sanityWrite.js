import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/private';

export function getWriteClient() {
  const projectId = env.VITE_SANITY_PROJECT_ID || env.SANITY_PROJECT_ID;
  const dataset = env.VITE_SANITY_DATASET || env.SANITY_DATASET || 'production';

  if (!projectId) {
    throw new Error('Sanity projectId manquant (VITE_SANITY_PROJECT_ID ou SANITY_PROJECT_ID).');
  }

  if (!env.SANITY_API_WRITE_TOKEN) {
    throw new Error('SANITY_API_WRITE_TOKEN manquant.');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: env.SANITY_API_WRITE_TOKEN,
  });
}
