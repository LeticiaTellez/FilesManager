import baseApiClient, { baseBlobApiClient } from '../baseApiClient';

export const getFiles = () => {
  return baseApiClient.get('files');
};

export const saveFile = formData => {
  return baseApiClient.post('files/upload', formData);
};

export const downloadFile = id => {
  return baseBlobApiClient.get(`files/download/${id}`);
};