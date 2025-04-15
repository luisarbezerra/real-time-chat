import { mockUser } from '@real-time-chat/shared';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { expect, jest, test } from '@jest/globals';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock crypto.randomUUID
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => mockUser.id,
  },
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();
