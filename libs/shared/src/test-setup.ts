import { jest } from '@jest/globals';

// Mock Date return a fixed date for all tests
const mockDate = new Date('2025-04-14T20:46:51.695Z');

jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
