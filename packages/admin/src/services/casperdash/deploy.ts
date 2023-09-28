import request from './request';

export const deploy = async (signedDeploy: unknown) => {
  const data = await request.post<{ deployHash: string }>(
    '/deploy',
    signedDeploy
  );

  return (<{ deployHash: string }>(<unknown>data)).deployHash;
};
