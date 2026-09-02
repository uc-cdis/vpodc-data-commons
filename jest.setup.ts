import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';
import module from 'module';
if (typeof module.register === 'undefined' || process.env.JEST_WORKER_ID) {
  module.register = () => {};
}
loadEnvConfig(__dirname, true, { info: () => null, error: console.error });
