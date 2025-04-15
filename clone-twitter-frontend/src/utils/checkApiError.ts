'use cliente';

import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const checkApiError = (response: AxiosResponse<any, any>) => {
  if (response.data.error) {
    console.error(response.data.error);
    toast.error(response.data.error);
    return;
  }
};
