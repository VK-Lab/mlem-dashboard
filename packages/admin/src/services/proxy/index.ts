import request from '@mlem-admin/utils/request';

export const deploy = async (signedDeploy: unknown) => {
  const data = await request.post<{ deployHash: string }>(
    '/proxies/deploy',
    signedDeploy
  );

  return (<{ deployHash: string }>(<unknown>data)).deployHash;
};

export const getAccountBalance = async (publicKey: string) => {
  const data = await request.get<{ balance: string }>(
    `/proxies/accounts/${publicKey}/balance`
  );

  return <{ balance: string }>(<unknown>data);
};
