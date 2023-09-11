import urlJoin from 'url-join';
import { describe, expect, it, vitest } from 'vitest';

import { generateMetadataUrl } from './metadata';

vitest.mock('url-join');

describe('generateMetadataUrl', () => {
  it('should generate the correct metadata URL', () => {
    const tokenId = '456';

    // Mock the urlJoin function to return a fixed URL
    (urlJoin as jest.Mock).mockReturnValueOnce('https://example.com/metadata');

    const expectedUrl = 'https://example.com/metadata';

    // Call the function being tested
    const result = generateMetadataUrl(tokenId);

    // Verify the result
    expect(result).toBe(expectedUrl);
    expect(urlJoin).toHaveBeenCalledWith(
      expect.any(String),
      tokenId,
      'metadata'
    );
  });
});
