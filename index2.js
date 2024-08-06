// require('dotenv').config();

// const solanaWeb3 = require('@solana/web3.js');
// const splToken = require('@solana/spl-token');
// const {pack} = require('@solana/spl-token-metadata');
// const bs58 = require('bs58').default;

// const connection = new solanaWeb3.Connection(
//   'https://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
//   {
//     wsEndpoint:
//       'wss://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
//   }
// );

// const walletKeyPair = solanaWeb3.Keypair.fromSecretKey(
//   new Uint8Array(bs58.decode(process.env.PRIVATE_KEY))
// );
// const mintWallet = solanaWeb3.Keypair.generate();

// // Функция для получения метаданных
// // async function getTokenMetadata(publicKey) {
// //   const mintPubkey = new solanaWeb3.PublicKey(publicKey);
// //   const token = await Metadata.getPDA(mintPubkey);
// //   const tokenMeta = await Metadata.load(connection, token);
// //   console.log('tokenMeta =>', tokenMeta.data.data);
// // }

// // Функция для подписки на события
// function subscribeToEvents() {
//   // Публичный ключ программы токена USDC
//   const usdcProgramId = new solanaWeb3.PublicKey(
//     'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
//   );

//   // Подписка на изменения аккаунтов токена USDC
//   connection.onProgramAccountChange(
//     usdcProgramId,
//     (keyedAccountInfo, context) => {
//       console.log('Account changed:', keyedAccountInfo.accountId.toBase58());
//       console.log('Account info:', keyedAccountInfo.accountInfo);
//       console.log('Context:', context);
//     },
//     'singleGossip'
//   );

//   // Подписка на логи транзакций токена USDC
//   connection.onLogs(
//     'all',
//     (logs, context) => {
//       console.log('Log:', logs);
//       console.log('Context:', context);
//     },
//     'confirmed'
//   );
// }

// // Главная функция для выполнения различных операций
// async function main() {
//   try {
//     // await getBalance(); // Проверка баланса на кошельке
//     // await mintSPL(); // Создание токена
//     // await mintSPLMetadata(); // Создание токена с метаданными
//     // await transactionToken(); // Перевод токенов на другой кошелек
//     // await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Получение метаданных
//     subscribeToEvents(); // Подписка на события
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();
