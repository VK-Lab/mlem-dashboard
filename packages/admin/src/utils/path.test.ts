import { describe, expect, it } from 'vitest';

import { generatePath } from './path';

describe('generatePath', () => {
  it('should generate the correct path with provided params', () => {
    const pathStr = '/users/[userId]/posts/[postId]/comments/*';
    const params = {
      userId: '123',
      postId: '456',
      '*': 'extra',
    };
    const expectedResult = '/users/123/posts/456/comments/extra';

    const result = generatePath(pathStr, params);

    expect(result).toBe(expectedResult);
  });

  it('should generate the correct path when params are empty', () => {
    const pathStr = '/users/[userId]/posts/[postId]/comments/*';
    const params = {};
    const expectedResult = '/users//posts//comments';

    const result = generatePath(pathStr, params);

    expect(result).toBe(expectedResult);
  });

  it('should handle undefined values in params', () => {
    const pathStr = '/users/[userId]/posts/[postId]/comments/*';
    const params = {
      userId: '123',
      postId: undefined,
      '*': 'extra',
    };
    const expectedResult = '/users/123/posts//comments/extra';

    const result = generatePath(pathStr, params);

    expect(result).toBe(expectedResult);
  });
});
