import { User } from '@mlem-admin/types/user';

export type LoginParams = {
  signature?: string;
  message?: string;
  address?: string | null;
};

export type LoginResponse = {
  accessToken: string;
  isVerifyPhone?: boolean;
};

export type GetNonceResponse = {
  nonce: string;
};

export type VerifyPhoneNumberOtpParams = {
  otpCode: string;
};

export type RegisterPhoneNumberParams = {
  phoneNumber: string;
};

export type UserIdResponse = {
  userId: string;
  accessToken: string;
};

export type CheckUserResponse = User;

export type CheckPhoneVerfiedResponse = {
  isPhoneVerfied: boolean;
};
