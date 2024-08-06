import {
  Connection,
  Keypair,
  PublicKey,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '../import';

export async function mintSPL(
  connection: Connection,
  walletKeyPair: Keypair
): Promise<(string | PublicKey)[]> {
  const mint = await createMint(
    connection,
    walletKeyPair,
    walletKeyPair.publicKey,
    null,
    9
  );
  console.log('mint =>', mint);

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    walletKeyPair,
    mint,
    walletKeyPair.publicKey
  );
  console.log('tokenAccount =>', tokenAccount);

  const transaction = await mintTo(
    connection,
    walletKeyPair,
    mint,
    tokenAccount.address,
    walletKeyPair.publicKey,
    1000000000000
  );
  console.log('transaction', transaction);

  return [mint, tokenAccount.address, transaction];
}
