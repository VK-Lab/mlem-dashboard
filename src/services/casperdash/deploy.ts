import axios from 'axios';

import { Config } from '@/config';

export const deploy = async (signedDeploy: unknown) => {
  const {
    data: { deployHash },
  } = await axios.post(Config.deployUrl, signedDeploy);

  return deployHash;
};
