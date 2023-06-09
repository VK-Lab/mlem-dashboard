import { describe, expect, it } from 'vitest';

import { formatAddress, hexToNumber, toCSPR } from './format';

describe('formatAddress', () => {
  it('should return a formatted address', () => {
    const address = '0x1234567890abcdef';

    const result = formatAddress(address);

    expect(result).toBe('0x1234...cdef');
  });

  it('should return an empty string for undefined address', () => {
    const address = undefined;

    const result = formatAddress(address);

    expect(result).toBe('');
  });
});

describe('toCSPR', () => {
  it('should convert a raw amount to CSPR', () => {
    const rawAmount = 1500000000; // 1.5 CSPR

    const result = toCSPR(rawAmount);

    expect(result).toBe(1); // Rounded down to the nearest integer
  });

  it('should handle zero raw amount', () => {
    const rawAmount = 0;

    const result = toCSPR(rawAmount);

    expect(result).toBe(0);
  });

  it('should handle negative raw amount', () => {
    const rawAmount = -1000000000;

    const result = toCSPR(rawAmount);

    expect(result).toBe(-1);
  });
});

describe('hexToNumber', () => {
  it.only('should convert a hexadecimal balance to a number in CSPR', () => {
    const balanceHex = '0xFFAB1234'; // Random balance hex

    const result = hexToNumber(balanceHex);

    expect(result).toBe(4);
  });

  it('should handle zero balance', () => {
    const balanceHex = '0x0';

    const result = hexToNumber(balanceHex);

    expect(result).toBe(0);
  });

  it('should handle invalid balance hex', () => {
    const balanceHex = 'invalid';

    const result = hexToNumber(balanceHex);

    expect(result).toBe(0);
  });
});
