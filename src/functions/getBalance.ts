import {solanaWeb3} from '../import';

// Функция для проверки баланса на кошельке
export async function getBalance(
  connection: solanaWeb3.Connection,
  walletKeyPair: solanaWeb3.Keypair
): Promise<number> {
  // Получение баланса в лампортах (малая единица SOL)
  const balance = await connection.getBalance(walletKeyPair.publicKey);
  // Конвертация баланса в SOL и вывод в консоль
  return balance / solanaWeb3.LAMPORTS_PER_SOL;
}
