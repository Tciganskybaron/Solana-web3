import * as solanaWeb3 from '@solana/web3.js';
import {HTTPS_ENDPOINT, PRIVATE_KEY, SECOND_WALLET_PUBLIC_KEY, WSS_ENDPOINT} from './config';
import { transactionToken } from './functions/transactionToken';
import { getBalance } from './functions/getBalance';

const bs58 = require('bs58').default;

const connection = new solanaWeb3.Connection(HTTPS_ENDPOINT,
  {
    wsEndpoint:
      WSS_ENDPOINT,
  });

const walletKeyPair = solanaWeb3.Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(PRIVATE_KEY))
);

 const secondWalletPublicKey = new solanaWeb3.PublicKey(
    SECOND_WALLET_PUBLIC_KEY
  );

// Главная функция для выполнения различных операций
async function main() {
  try {
    const balance = await getBalance(connection,walletKeyPair); // Проверка баланса на кошельке
    console.log('balance', balance);
    // await mintSPL(); // Создание токена
    // await mintSPLMetadata(); // Создание токена с метаданными
    // let data = await transactionToken(connection,walletKeyPair,secondWalletPublicKey); // Перевод токенов на другой кошелек
		// console.log("data =>", data)
    // await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Получение метаданных
    // subscribeToEvents(); // Подписка на события
  } catch (error) {
    console.error(error);
  }
}

main();
