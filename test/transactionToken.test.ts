// eslint-disable-next-line n/no-unpublished-import
import {describe, expect, jest, test, beforeEach} from '@jest/globals';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import {transactionToken} from '../src/functions/transactionToken';
import {bs58} from '../src/import';

import {
  HTTPS_ENDPOINT,
  PRIVATE_KEY,
  SECOND_WALLET_PUBLIC_KEY,
} from '../src/config';

jest.mock('@solana/web3.js', () => {
  const originalModule = jest.requireActual('@solana/web3.js');
  return {
    ...(originalModule as object),
    sendAndConfirmTransaction: jest.fn(),
  };
});

const mockSendAndConfirmTransaction = jest.mocked(sendAndConfirmTransaction);

describe('transactionToken function', () => {
  let mockConnection: Connection;
  let mockSourceWallet: Keypair;
  let mockDestinationWallet: PublicKey;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConnection = new Connection(HTTPS_ENDPOINT);
    mockSourceWallet = Keypair.fromSecretKey(
      new Uint8Array(bs58.decode(PRIVATE_KEY))
    );
    mockDestinationWallet = new PublicKey(SECOND_WALLET_PUBLIC_KEY);
  });

  test('should create a transaction and get a signature', async () => {
    const mockSignature = 'mockSignature';
    mockSendAndConfirmTransaction.mockResolvedValue(mockSignature);

    const [transaction, signature] = await transactionToken(
      mockConnection,
      mockSourceWallet,
      mockDestinationWallet
    );

    // Уточняем типы
    if (transaction instanceof Transaction) {
      expect(transaction).toBeInstanceOf(Transaction);
      expect(signature).toBe(mockSignature);
      expect(sendAndConfirmTransaction).toHaveBeenCalledWith(
        mockConnection,
        expect.any(Transaction),
        [mockSourceWallet]
      );

      const instruction = transaction.instructions[0];
      expect(instruction.programId).toEqual(SystemProgram.programId);
      expect(instruction.keys[0].pubkey).toEqual(mockSourceWallet.publicKey);
      expect(instruction.keys[1].pubkey).toEqual(mockDestinationWallet);
      expect(instruction.data).toBeDefined();
    } else {
      throw new Error('Transaction is not an instance of Transaction');
    }
  });

  test('should handle transaction errors gracefully', async () => {
    const errorMessage = 'Transaction error';
    mockSendAndConfirmTransaction.mockRejectedValue(new Error(errorMessage));

    await expect(
      transactionToken(mockConnection, mockSourceWallet, mockDestinationWallet)
    ).rejects.toThrow(errorMessage);
  });
});
