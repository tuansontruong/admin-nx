import { AxiosError } from 'axios';

import { axiosClient } from '@axios';

export const validateToken = async () => {
  try {
    const { data } = await axiosClient.get('/validate-token');
    return data.roles;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }
  }
};
