import axiosClient from '../axiosClient';
import { ShareResponse } from './types';

export const getShareLink = async (file: File): Promise<ShareResponse> => {
  // Create FormData for upload
  const formData = new FormData();
  formData.append('image', file);

  // Upload image to server using axiosClient with auth interceptors
  const data = await axiosClient.post('/api/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data as any;
};
