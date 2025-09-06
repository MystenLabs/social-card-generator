import { AuthServerUrl } from '@/utils/constant';

export default async function getAuthUrl(): Promise<string> {
  try {
    const response = await fetch(`${AuthServerUrl}/auth/twitter`);
    if (!response.ok) {
      throw new Error('Failed to get auth URL');
    }
    const data = (await response.json()) as { authUrl: string };
    return data.authUrl;
  } catch (error) {
    console.error('Error getting auth URL:', error);
    throw error;
  }
}
