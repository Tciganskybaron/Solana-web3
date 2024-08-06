import { solanaWeb3 } from '../import';

export async function transactionToken(
  connection: solanaWeb3.Connection,
  sourceWallet: solanaWeb3.Keypair,
  destinationWallet: solanaWeb3.PublicKey
) {

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: sourceWallet.publicKey,
      toPubkey: destinationWallet,
      lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.001,
    })
  );

  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [sourceWallet]
  );
  
  return [transaction, signature];
}
