import {Connection, Keypair, LAMPORTS_PER_SOL} from '../import';

// Функция для проверки баланса на кошельке
export async function getBalance(
  connection: Connection,
  walletKeyPair: Keypair
): Promise<number> {
  // Получение баланса в лампортах (малая единица SOL)
  const balance = await connection.getBalance(walletKeyPair.publicKey);
  // Конвертация баланса в SOL и вывод в консоль
  return balance / LAMPORTS_PER_SOL;
}
