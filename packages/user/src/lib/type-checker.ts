import { last } from "lodash-es";

export const isVideoURL = (rawUrl?: string): boolean => {
  if (!rawUrl) {
    return false;
  }
  const videos = ["mp4", "3gp", "ogg"];
  const url = new URL(rawUrl);
  const extension = last<string>(url.pathname.split("."));

  return !!extension && videos.includes(extension);
};
