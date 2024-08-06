// tests/setup.js
import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock window.alert
beforeAll(() => {
  global.alert = vi.fn(); // Using vi.fn() to mock alert
});

afterEach(() => {
  vi.clearAllMocks();
});
