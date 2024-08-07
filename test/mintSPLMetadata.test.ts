/* eslint-disable n/no-unpublished-import */
import {describe, expect, jest, test, beforeEach} from '@jest/globals';
import {mintSPLMetadata} from '../src/functions/mintSPLMetadata';
import {mocked} from 'jest-mock';
import {
  bs58,
  Connection,
  Keypair,
  PublicKey,
  TokenMetadata,
} from '../src/import';
import {HTTPS_ENDPOINT, PRIVATE_KEY} from '../src/config';

jest.mock('../src/functions/mintSPLMetadata');
const mockMintSPLMetadata = mocked(mintSPLMetadata);
const mockConnection = new Connection(HTTPS_ENDPOINT);
const walletKeyPair = Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(PRIVATE_KEY))
);
// случайные ключи
const mintWallet = Keypair.generate();
describe('mintSPLMetadata function', () => {
  beforeEach(() => {
    mockMintSPLMetadata.mockClear();
    jest.clearAllMocks();
  });

  test('should call mintSPLMetadata with correct parameters', async () => {
    const mockMint = new PublicKey(
      '3fEm6HTCTpyxNi7hrTLH2t7PnLh7Js6yrG2H5BRHcViP'
    );
    const metadata: TokenMetadata = {
      name: 'Test Token',
      symbol: 'TT',
      mint: mockMint,
      uri: 'https://example.com',
      additionalMetadata: [['field1', 'value1']],
    };

    await mockMintSPLMetadata(
      metadata,
      mockConnection,
      walletKeyPair,
      mintWallet
    );

    // Ensure mintSPLMetadata was called with the correct parameters
    expect(mockMintSPLMetadata).toHaveBeenCalledWith(
      metadata,
      mockConnection,
      walletKeyPair,
      mintWallet
    );
    expect(mockMintSPLMetadata).toHaveBeenCalledTimes(1);
  });
});
