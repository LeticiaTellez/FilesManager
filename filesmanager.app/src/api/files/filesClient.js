import baseApiClient from '../baseApiClient';

export const getFiles = () => {
  return baseApiClient.get('files');
};