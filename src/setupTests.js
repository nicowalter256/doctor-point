// src/setupTests.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for jsdom
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;