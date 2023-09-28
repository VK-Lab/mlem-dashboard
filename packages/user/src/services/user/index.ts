import { GetMyProfileResponse } from "./types";
import request from "../request";

export const getMyProfile = (): Promise<GetMyProfileResponse> => {
  return request.get("/users/me/profile");
};
