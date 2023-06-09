import _last from 'lodash/last';

export const isVideo = (rawUrl?: string): boolean => {
  if (!rawUrl) {
    return false;
  }
  const videos = ['mp4', '3gp', 'ogg'];
  const url = new URL(rawUrl);
  const extension = _last<string>(url.pathname.split('.'));

  return !!extension && videos.includes(extension);
};
