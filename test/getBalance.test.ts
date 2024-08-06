/* eslint-disable n/no-unpublished-import */
import bs58 from 'bs58';
import dotenv from 'dotenv';
import {describe, test, expect, jest} from '@jest/globals';
import {getBalance} from '../src/functions/getBalance';
import {Connection, Keypair} from '../src/import';
import {HTTPS_ENDPOINT, PRIVATE_KEY} from '../src/config';

dotenv.config();

const mockConnection = new Connection(HTTPS_ENDPOINT);
const mockKeypair = Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(PRIVATE_KEY))
);

describe('getBalance function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to the Solana network', async () => {
    const getBalanceSpy = jest.spyOn(mockConnection, 'getBalance');

    const balance = await getBalance(mockConnection, mockKeypair);
    expect(getBalanceSpy).toHaveBeenCalledWith(mockKeypair.publicKey);
    expect(balance).toBeGreaterThanOrEqual(0);
  });

  test('should handle connection errors gracefully', async () => {
    jest
      .spyOn(mockConnection, 'getBalance')
      .mockRejectedValue(new Error('Connection error'));

    await expect(getBalance(mockConnection, mockKeypair)).rejects.toThrow(
      'Connection error'
    );
  });

  test('should correctly transform lamports to SOL', async () => {
    jest.spyOn(mockConnection, 'getBalance').mockResolvedValue(1000000000);

    const balance = await getBalance(mockConnection, mockKeypair);
    expect(balance).toBe(1); // 1000000000 лампортов = 1 SOL
  });
});
