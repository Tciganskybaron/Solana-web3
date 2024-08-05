require('dotenv').config();
import * as solanaWeb3 from '@solana/web3.js';

const bs58 = require('bs58').default;

const connection = new solanaWeb3.Connection(
  'https://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
  {
    wsEndpoint:
      'wss://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
  }
);

const walletKeyPair = solanaWeb3.Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(process.env.PRIVATE_KEY))
);

// Функция для проверки баланса на кошельке
async function getBalance() {
  // Получение баланса в лампортах (малая единица SOL)
  const balance = await connection.getBalance(walletKeyPair.publicKey);
  // Конвертация баланса в SOL и вывод в консоль
  return balance / solanaWeb3.LAMPORTS_PER_SOL;
}

// Главная функция для выполнения различных операций
async function main() {
  try {
    const balance = await getBalance(); // Проверка баланса на кошельке
    console.log('balance', balance);
    // await mintSPL(); // Создание токена
    // await mintSPLMetadata(); // Создание токена с метаданными
    // await transactionToken(); // Перевод токенов на другой кошелек
    // await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Получение метаданных
    // subscribeToEvents(); // Подписка на события
  } catch (error) {
    console.error(error);
  }
}

main();
