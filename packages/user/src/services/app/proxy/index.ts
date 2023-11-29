import { GetAccountBalanceResponse, GetDeployStatusResponse } from "./types";
import request from "../request";

export const deploy = async (signedDeploy: unknown) => {
  const data = await request.post<{ deployHash: string }>(
    "/proxies/deploy",
    signedDeploy
  );

  return (<{ deployHash: string }>(<unknown>data)).deployHash;
};

export const getDeployStatus = async (
  deployHash: string
): Promise<GetDeployStatusResponse> => {
  return request.get(`/proxies/deploys/${deployHash}/status`);
};

export const getAccountBalance = async (
  publicKey: string
): Promise<GetAccountBalanceResponse> => {
  return request.get(`/proxies/accounts/${publicKey}/balance`);
};
