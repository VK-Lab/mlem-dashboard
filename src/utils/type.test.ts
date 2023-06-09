import { describe, expect, it } from 'vitest';

import { isVideo } from './type';

describe('isVideo', () => {
  it('should return false if the rawUrl is undefined', () => {
    const rawUrl = undefined;

    const result = isVideo(rawUrl);

    expect(result).toBe(false);
  });

  it('should return false if the extension is not a video format', () => {
    const rawUrl = 'https://example.com/file.jpg';

    const result = isVideo(rawUrl);

    expect(result).toBe(false);
  });

  it('should return true if the extension is a video format', () => {
    const rawUrl = 'https://example.com/file.mp4';

    const result = isVideo(rawUrl);

    expect(result).toBe(true);
  });

  it('should handle URLs with query parameters', () => {
    const rawUrl = 'https://example.com/file.mp4?param=value';

    const result = isVideo(rawUrl);

    expect(result).toBe(true);
  });

  it('should handle URLs with paths containing multiple dots', () => {
    const rawUrl = 'https://example.com/file.name.with.dots.mp4';

    const result = isVideo(rawUrl);

    expect(result).toBe(true);
  });
});
