import { describe, expect, it } from 'vitest';

import { parseJSON } from './parser';

describe('parseJSON', () => {
  it('should return parsed JSON when input is a valid JSON string', () => {
    const jsonString = '{"name":"John","age":30}';
    const expectedResult = { name: 'John', age: 30 };

    const result = parseJSON(jsonString);

    expect(result).toEqual(expectedResult);
  });

  it('should return undefined when input is "undefined"', () => {
    const input = 'undefined';

    const result = parseJSON(input);

    expect(result).toBeUndefined();
  });

  it('should return undefined when input is null', () => {
    const input = null;

    const result = parseJSON(input);

    expect(result).toBeUndefined();
  });

  it('should return undefined when input is not a valid JSON string', () => {
    const invalidJsonString = 'invalid json';

    const result = parseJSON(invalidJsonString);

    expect(result).toBeUndefined();
  });
});
