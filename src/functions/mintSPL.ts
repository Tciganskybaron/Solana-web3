import * as splToken from '@solana/spl-token';
import * as solanaWeb3 from '@solana/web3.js';

export async function mintSPL(connection: solanaWeb3.Connection, walletKeyPair: solanaWeb3.Keypair):  Promise<(string | solanaWeb3.PublicKey | splToken.Account)[]> {
	  const mint = await splToken.createMint(
    connection,
    walletKeyPair,
    walletKeyPair.publicKey,
    null,
    9
  );
  console.log('mint =>', mint);

  const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    walletKeyPair,
    mint,
    walletKeyPair.publicKey
  );
  console.log('tokenAccount =>', tokenAccount);

  let transaction = await splToken.mintTo(
    connection,
    walletKeyPair,
    mint,
    tokenAccount.address,
    walletKeyPair.publicKey,
    1000000000000
  );
  console.log('transaction', transaction);

  return [mint, tokenAccount, transaction];
}
