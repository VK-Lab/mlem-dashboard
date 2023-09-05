import request from '@/utils/request';

export const deploy = async (signedDeploy: unknown) => {
  const data = await request.post<{ deployHash: string }>(
    '/proxies/deploy',
    signedDeploy
  );

  return (<{ deployHash: string }>(<unknown>data)).deployHash;
};
