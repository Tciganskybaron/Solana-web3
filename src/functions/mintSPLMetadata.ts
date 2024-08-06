import {solanaWeb3, splToken, pack, TokenMetadata} from '../import';

export async function mintSPLMetadata(
  metadata: TokenMetadata,
  connection: solanaWeb3.Connection,
  walletKeyPair: solanaWeb3.Keypair,
  mintWallet: solanaWeb3.Keypair
): Promise<(string | TokenMetadata | solanaWeb3.Transaction | null)[]> {
  // Вычисление необходимого пространства для токена и метаданных
  const mintSpace = splToken.getMintLen([
    splToken.ExtensionType.MetadataPointer,
  ]);
  const metadataSpace =
    splToken.TYPE_SIZE + splToken.LENGTH_SIZE + pack(metadata).length;
  const lamports = await connection.getMinimumBalanceForRentExemption(
    mintSpace + metadataSpace
  );

  // Создание аккаунта для токена
  const createAccountIx = solanaWeb3.SystemProgram.createAccount({
    fromPubkey: walletKeyPair.publicKey,
    newAccountPubkey: mintWallet.publicKey,
    space: mintSpace,
    lamports,
    programId: splToken.TOKEN_2022_PROGRAM_ID,
  });

  // Инициализация указателя на метаданные
  const initializeMetadataPointerIx =
    splToken.createInitializeMetadataPointerInstruction(
      mintWallet.publicKey,
      walletKeyPair.publicKey,
      mintWallet.publicKey,
      splToken.TOKEN_2022_PROGRAM_ID
    );

  // Инициализация токена
  const initializeMintIx = splToken.createInitializeMintInstruction(
    mintWallet.publicKey,
    2,
    walletKeyPair.publicKey,
    null,
    splToken.TOKEN_2022_PROGRAM_ID
  );

  // Инициализация метаданных
  const initializeMetadataIx = splToken.createInitializeInstruction({
    mint: mintWallet.publicKey,
    metadata: mintWallet.publicKey,
    mintAuthority: walletKeyPair.publicKey,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    programId: splToken.TOKEN_2022_PROGRAM_ID,
    updateAuthority: walletKeyPair.publicKey,
  });

  // Обновление поля метаданных
  const updateMetadataField = splToken.createUpdateFieldInstruction({
    metadata: mintWallet.publicKey,
    programId: splToken.TOKEN_2022_PROGRAM_ID,
    updateAuthority: walletKeyPair.publicKey,
    field: metadata.additionalMetadata[0][0],
    value: metadata.additionalMetadata[0][1],
  });

  // Создание и отправка транзакции
  const transaction = new solanaWeb3.Transaction().add(
    createAccountIx,
    initializeMetadataPointerIx,
    initializeMintIx,
    initializeMetadataIx,
    updateMetadataField
  );

  const sig = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [walletKeyPair, mintWallet]
  );

  // Получение метаданных токена из блокчейна
  const chainMetadata = await splToken.getTokenMetadata(
    connection,
    mintWallet.publicKey
  );

  return [transaction, sig, chainMetadata];
}
