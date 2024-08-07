/* eslint-disable n/no-unsupported-features/es-builtins */
/* eslint-disable n/no-unpublished-import */
import {describe, expect, jest, test, beforeEach} from '@jest/globals';
import {mintSPL} from '../src/functions/mintSPL';
import {mocked} from 'jest-mock';
import {Connection, Keypair, PublicKey} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  Account,
} from '@solana/spl-token';

jest.mock('@solana/web3.js', () => {
  return {
    Connection: jest.fn(),
    Keypair: {
      generate: jest.fn(() => ({
        publicKey: {
          toBase58: jest.fn(),
        },
      })),
    },
    PublicKey: jest.fn().mockImplementation(() => ({
      toBase58: jest.fn(),
    })),
  };
});
jest.mock('@solana/spl-token', () => {
  return {
    createMint: jest.fn(),
    getOrCreateAssociatedTokenAccount: jest.fn(),
    mintTo: jest.fn(),
  };
});

const mockCreateMint = mocked(createMint);
const mockGetOrCreateAssociatedTokenAccount = mocked(
  getOrCreateAssociatedTokenAccount
);
const mockMintTo = mocked(mintTo);

describe('mintSPL function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call mintSPL with correct parameters', async () => {
    const connection = new Connection('https://api.devnet.solana.com');
    const walletKeyPair = Keypair.generate();

    const mockMint = new PublicKey(
      '3fEm6HTCTpyxNi7hrTLH2t7PnLh7Js6yrG2H5BRHcViP'
    );
    const mockTokenAccount: Account = {
      address: new PublicKey('4k3Dyjzvzp8e3czKqYsAJ4KgysXtPQwHiijFusSHC3V9'),
      mint: mockMint,
      owner: walletKeyPair.publicKey,
      amount: BigInt(1000000000000),
      delegate: null,
      isNative: false,
      delegatedAmount: BigInt(0),
      closeAuthority: null,
      isFrozen: false,
      isInitialized: true,
      rentExemptReserve: null,
      tlvData: Buffer.from(''),
    };
    const mockTransaction = 'mockTransaction';

    mockCreateMint.mockResolvedValue(mockMint);
    mockGetOrCreateAssociatedTokenAccount.mockResolvedValue(mockTokenAccount);
    mockMintTo.mockResolvedValue(mockTransaction);

    const result = await mintSPL(connection, walletKeyPair);

    // Ensure mintSPL was called with the correct parameters
    expect(createMint).toHaveBeenCalledWith(
      connection,
      walletKeyPair,
      walletKeyPair.publicKey,
      null,
      9
    );
    expect(getOrCreateAssociatedTokenAccount).toHaveBeenCalledWith(
      connection,
      walletKeyPair,
      mockMint,
      walletKeyPair.publicKey
    );
    expect(mintTo).toHaveBeenCalledWith(
      connection,
      walletKeyPair,
      mockMint,
      mockTokenAccount.address,
      walletKeyPair.publicKey,
      1000000000000
    );
    expect(result).toEqual([
      mockMint,
      mockTokenAccount.address,
      mockTransaction,
    ]);
  });
});
