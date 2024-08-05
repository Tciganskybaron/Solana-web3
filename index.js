require('dotenv').config();

const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const { pack } = require('@solana/spl-token-metadata');
const bs58 = require('bs58').default;
const { programs } = require('@metaplex/js');

const {
	metadata: { Metadata },
} = programs;

const connection = new solanaWeb3.Connection('https://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150', {
	wsEndpoint: 'wss://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
});

const walletKeyPair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(bs58.decode(process.env.PRIVATE_KEY)));
const mintWallet = solanaWeb3.Keypair.generate();

// Функция для проверки баланса на кошельке
async function getBalance() {
	// Получение баланса в лампортах (малая единица SOL)
	let balance = await connection.getBalance(walletKeyPair.publicKey);
	// Конвертация баланса в SOL и вывод в консоль
	console.log(balance / solanaWeb3.LAMPORTS_PER_SOL);
}

// Функция для создания токена с метаданными
async function mintSPLMetadata() {
	const metadata = {
		mint: walletKeyPair.publicKey,
		name: 'Boss on solanaWeb3',
		symbol: 'BOSS',
		uri: 'https://tomato-occupational-ape-835.mypinata.cloud/ipfs/QmPh1MdtWVMPwuEDCi9ibpRkrbnwU6zNZujf4XQe3n6kjF',
		additionalMetadata: [['key', 'value']],
	};

	// Вычисление необходимого пространства для токена и метаданных
	const mintSpace = splToken.getMintLen([splToken.ExtensionType.MetadataPointer]);
	const metadataSpace = splToken.TYPE_SIZE + splToken.LENGTH_SIZE + pack(metadata).length;
	const lamports = await connection.getMinimumBalanceForRentExemption(mintSpace + metadataSpace);

	// Создание аккаунта для токена
	const createAccountIx = solanaWeb3.SystemProgram.createAccount({
		fromPubkey: walletKeyPair.publicKey,
		newAccountPubkey: mintWallet.publicKey,
		space: mintSpace,
		lamports,
		programId: splToken.TOKEN_2022_PROGRAM_ID,
	});

	// Инициализация указателя на метаданные
	const initializeMetadataPointerIx = splToken.createInitializeMetadataPointerInstruction(
		mintWallet.publicKey,
		walletKeyPair.publicKey,
		mintWallet.publicKey,
		splToken.TOKEN_2022_PROGRAM_ID
	);

	// Инициализация токена
	const initializeMintIx = splToken.createInitializeMintInstruction(mintWallet.publicKey, 2, walletKeyPair.publicKey, null, splToken.TOKEN_2022_PROGRAM_ID);

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
	const transaction = new solanaWeb3.Transaction().add(createAccountIx, initializeMetadataPointerIx, initializeMintIx, initializeMetadataIx, updateMetadataField);
	console.log('transaction', transaction);
	const sig = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [walletKeyPair, mintWallet]);
	console.log('sig:', sig);

	// Получение метаданных токена из блокчейна
	const chainMetadata = await splToken.getTokenMetadata(connection, mintWallet.publicKey);
	console.log('chainMetadata:', chainMetadata);
}

// Функция для создания токена
async function mintSPL() {
	const mint = await splToken.createMint(connection, walletKeyPair, walletKeyPair.publicKey, null, 9, undefined, {}, splToken.TOKEN_PROGRAM_ID);

	const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(connection, walletKeyPair, mint, walletKeyPair.publicKey);

	await splToken.mintTo(connection, walletKeyPair, mint, tokenAccount.address, walletKeyPair.publicKey, 1000000000000);

	return mint;
}

// Функция для перевода токенов на другой кошелек
async function transactionToken() {
	const secondWalletPublicKey = new solanaWeb3.PublicKey(process.env.SECOND_WALLET_PUBLIC_KEY);

	const transaction = new solanaWeb3.Transaction().add(
		solanaWeb3.SystemProgram.transfer({
			fromPubkey: walletKeyPair.publicKey,
			toPubkey: secondWalletPublicKey,
			lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.001,
		})
	);
	console.log('transaction', transaction);

	const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [walletKeyPair]);
	console.log('signature', signature);
}

// Функция для получения метаданных
async function getTokenMetadata(publicKey) {
	let mintPubkey = new solanaWeb3.PublicKey(publicKey);
	let token = await Metadata.getPDA(mintPubkey);
	const tokenMeta = await Metadata.load(connection, token);
	console.log('tokenMeta =>', tokenMeta.data.data);
}

// Главная функция для выполнения различных операций
async function main() {
	try {
		// await getBalance(); // Проверка баланса на кошельке
		// await mintSPL(); // Создание токена
		// await mintSPLMetadata(); // Создание токена с метаданными
		// await transactionToken(); // Перевод токенов на другой кошелек
		await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');
	} catch (error) {
		console.error(error);
	}
}

main();
