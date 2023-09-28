import { describe, expect, it, beforeEach, vi } from 'vitest';

import { readValue, setValue } from './localStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorageUtils', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('setValue dispatches a custom event', () => {
    const key = 'testKey';
    const value = { foo: 'bar' };
    const eventListenerMock = vi.fn();

    window.addEventListener('local-storage', eventListenerMock);

    setValue(key, value);

    expect(eventListenerMock).toHaveBeenCalledTimes(1);

    window.removeEventListener('local-storage', eventListenerMock);
  });

  it('readValue returns the stored value', () => {
    const key = 'testKey';
    const value = { foo: 'bar' };
    localStorageMock.setItem(key, JSON.stringify(value));

    const result = readValue<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('readValue returns the default value when no value is stored', () => {
    const key = 'testKey';
    const defaultValue = { default: true };

    const result = readValue<typeof defaultValue>(key, defaultValue);

    expect(result).toEqual(defaultValue);
  });

  it('readValue returns the default value when localStorage is not available', () => {
    // Clear the window.localStorage mock
    Object.defineProperty(window, 'localStorage', { value: undefined });

    const key = 'testKey';
    const defaultValue = 'default value';

    const result = readValue<string>(key, defaultValue);

    expect(result).toEqual(defaultValue);
  });

  it('setValue does not save the value when localStorage is not available', () => {
    // Clear the window.localStorage mock
    Object.defineProperty(window, 'localStorage', { value: undefined });

    const key = 'testKey';
    const value = { foo: 'bar' };

    setValue(key, value);

    const storedValue = localStorageMock.getItem(key);

    expect(storedValue).toBeNull();
  });
});
