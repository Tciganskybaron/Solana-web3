import {
  Connection,
  Keypair,
  Transaction,
  PublicKey,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '../import';

export async function transactionToken(
  connection: Connection,
  sourceWallet: Keypair,
  destinationWallet: PublicKey
) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sourceWallet.publicKey,
      toPubkey: destinationWallet,
      lamports: LAMPORTS_PER_SOL * 0.001,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sourceWallet,
  ]);

  return [transaction, signature];
}
