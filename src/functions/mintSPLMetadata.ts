import {
  Connection,
  Keypair,
  Transaction,
  ExtensionType,
  pack,
  TokenMetadata,
  getMintLen,
  TYPE_SIZE,
  LENGTH_SIZE,
  SystemProgram,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createInitializeInstruction,
  createUpdateFieldInstruction,
  sendAndConfirmTransaction,
  getTokenMetadata,
} from '../import';

export async function mintSPLMetadata(
  metadata: TokenMetadata,
  connection: Connection,
  walletKeyPair: Keypair,
  mintWallet: Keypair
): Promise<(string | Transaction | Promise<TokenMetadata | null>)[]> {
  // Вычисление необходимого пространства для токена и метаданных
  const mintSpace = getMintLen([ExtensionType.MetadataPointer]);
  const metadataSpace = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
  const lamports = await connection.getMinimumBalanceForRentExemption(
    mintSpace + metadataSpace
  );

  // Создание аккаунта для токена
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: walletKeyPair.publicKey,
    newAccountPubkey: mintWallet.publicKey,
    space: mintSpace,
    lamports,
    programId: TOKEN_2022_PROGRAM_ID,
  });

  // Инициализация указателя на метаданные
  const initializeMetadataPointerIx =
    createInitializeMetadataPointerInstruction(
      mintWallet.publicKey,
      walletKeyPair.publicKey,
      mintWallet.publicKey,
      TOKEN_2022_PROGRAM_ID
    );

  // Инициализация токена
  const initializeMintIx = createInitializeMintInstruction(
    mintWallet.publicKey,
    2,
    walletKeyPair.publicKey,
    null,
    TOKEN_2022_PROGRAM_ID
  );

  // Инициализация метаданных
  const initializeMetadataIx = createInitializeInstruction({
    mint: mintWallet.publicKey,
    metadata: mintWallet.publicKey,
    mintAuthority: walletKeyPair.publicKey,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: walletKeyPair.publicKey,
  });

  // Обновление поля метаданных
  const updateMetadataField = createUpdateFieldInstruction({
    metadata: mintWallet.publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: walletKeyPair.publicKey,
    field: metadata.additionalMetadata[0][0],
    value: metadata.additionalMetadata[0][1],
  });

  // Создание и отправка транзакции
  const transaction = new Transaction().add(
    createAccountIx,
    initializeMetadataPointerIx,
    initializeMintIx,
    initializeMetadataIx,
    updateMetadataField
  );

  const sig = await sendAndConfirmTransaction(connection, transaction, [
    walletKeyPair,
    mintWallet,
  ]);

  // Получение метаданных токена из блокчейна
  const chainMetadata = getTokenMetadata(connection, mintWallet.publicKey);

  return [transaction, sig, chainMetadata];
}
