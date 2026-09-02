const Module = require('module');

// Intercept Jest's override by defining a dummy register function
Object.defineProperty(Module, 'register', {
  value: () => {},
  writable: true,
  configurable: true
});
import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(__dirname, true, { info: () => null, error: console.error });
