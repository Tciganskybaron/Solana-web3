/* eslint-disable n/no-unpublished-import */
import {describe, test, expect} from '@jest/globals';
import {
  HTTPS_ENDPOINT,
  PRIVATE_KEY,
  SECOND_WALLET_PUBLIC_KEY,
  WSS_ENDPOINT,
} from '../src/config';
import bs58 from 'bs58';

describe('Correct env file', () => {
  test('Сorrect HTTPS_ENDPOINT', () => {
    expect(HTTPS_ENDPOINT).not.toBe('');
    expect(HTTPS_ENDPOINT).toMatch(/^https?:\/\//); // Проверка, что это URL
  });

  test('Сorrect PRIVATE_KEY', () => {
    expect(PRIVATE_KEY).not.toBe('');
    expect(() => bs58.decode(PRIVATE_KEY)).not.toThrow(); // Проверка, что это Base58
    expect(bs58.decode(PRIVATE_KEY)).toHaveLength(64); // Проверка длины приватного ключа
  });

  test('Сorrect SECOND_WALLET_PUBLIC_KEY', () => {
    expect(SECOND_WALLET_PUBLIC_KEY).not.toBe('');
    expect(() => bs58.decode(SECOND_WALLET_PUBLIC_KEY)).not.toThrow(); // Проверка, что это Base58
    expect(bs58.decode(SECOND_WALLET_PUBLIC_KEY)).toHaveLength(32); // Проверка длины публичного ключа
  });

  test('Сorrect WSS_ENDPOINT', () => {
    expect(WSS_ENDPOINT).not.toBe('');
    expect(WSS_ENDPOINT).toMatch(/^wss?:\/\//); // Проверка, что это WebSocket URL
  });

  // Проверка, что все значения являются строками
  test('All environment variables are strings', () => {
    expect(typeof HTTPS_ENDPOINT).toBe('string');
    expect(typeof PRIVATE_KEY).toBe('string');
    expect(typeof SECOND_WALLET_PUBLIC_KEY).toBe('string');
    expect(typeof WSS_ENDPOINT).toBe('string');
  });

  // Проверка, что значения не содержат пробелов
  test('No environment variables contain spaces', () => {
    expect(HTTPS_ENDPOINT).not.toMatch(/\s/);
    expect(PRIVATE_KEY).not.toMatch(/\s/);
    expect(SECOND_WALLET_PUBLIC_KEY).not.toMatch(/\s/);
    expect(WSS_ENDPOINT).not.toMatch(/\s/);
  });
});
