import {Connection, Keypair, PublicKey, TokenMetadata} from './import';
import {
  HTTPS_ENDPOINT,
  PRIVATE_KEY,
  SECOND_WALLET_PUBLIC_KEY,
  WSS_ENDPOINT,
} from './config';
const bs58 = require('bs58').default;

//импорт функций
//import { subscribeToEvents } from './functions/subscribeToEvents';
//import {transactionToken} from './functions/transactionToken';
import {getBalance} from './functions/getBalance';
//import {mintSPLMetadata} from './functions/mintSPLMetadata';

// подключение к сети
const connection = new Connection(HTTPS_ENDPOINT, {
  wsEndpoint: WSS_ENDPOINT,
});

// ключ для полаты
const walletKeyPair = Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(PRIVATE_KEY))
);

// ключ для получения переводов
const secondWalletPublicKey = new PublicKey(SECOND_WALLET_PUBLIC_KEY);

// случайные ключи
const mintWallet = Keypair.generate();

// метаданные для токена
const metadata: TokenMetadata = {
  mint: walletKeyPair.publicKey,
  name: 'Boss on solanaWeb3',
  symbol: 'BOSS',
  uri: 'https://tomato-occupational-ape-835.mypinata.cloud/ipfs/QmPh1MdtWVMPwuEDCi9ibpRkrbnwU6zNZujf4XQe3n6kjF',
  additionalMetadata: [['key', 'value']],
};

// Главная функция для выполнения различных операций
async function main() {
  try {
    const balance = await getBalance(connection, walletKeyPair); // Проверка баланса на кошельке
    console.log('balance', balance);
    // await mintSPL(); // Создание токена
    // await mintSPLMetadata(metadata, connection, walletKeyPair, mintWallet); // Создание токена с метаданными
    // let data = await transactionToken(connection,walletKeyPair,secondWalletPublicKey); // Перевод токенов на другой кошелек
    // console.log("data =>", data)
    // await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Получение метаданных
    // subscribeToEvents(
    //   'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    //   WSS_ENDPOINT
    // ); // Подписка на события
  } catch (error) {
    console.error(error);
  }
}

main();
