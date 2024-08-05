# Solana Web3 Project

## Описание

Этот проект демонстрирует, как использовать библиотеку @solana/web3.js для взаимодействия с блокчейном Solana. В проекте реализованы функции для проверки баланса, создания токенов, перевода токенов на другой кошелек, получения метаданных токенов и подписки на события изменения аккаунтов и логов транзакций.

## Требования
 - Node.js
 - npm

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/TciganskybaronSolana-web3.git
cd solana-web3
```
2. Установите зависимости:
```bash
npm install
```

## Настройка
Создайте файл .env в корневом каталоге проекта и добавьте в него следующие переменные:
```makefile
PRIVATE_KEY=YOUR_PRIVATE_KEY
SECOND_WALLET_PUBLIC_KEY=YOUR_SECOND_WALLET_PUBLIC_KEY
```
- PRIVATE_KEY: Приватный ключ вашего основного кошелька.
- SECOND_WALLET_PUBLIC_KEY: Публичный ключ второго кошелька, на который будут переводиться токены.


## Запуск
Для запуска проекта используйте команду:
```bash
npm start
```

### Основные функции

1. Проверка баланса
```javascript
async function getBalance() {}
```

2. Создание токена с метаданными
```javascript
async function mintSPLMetadata() {}
```

3. Создание токена
```javascript
async function mintSPL() {}
```

4. Перевод токенов на другой кошелек
```javascript
async function transactionToken()  {}
```

5. Получение метаданных токенов
```javascript
async function getTokenMetadata()  {}
```

6. Подписка на события
```javascript
async function subscribeToEvents()  {}
```

7. Главная функция для вызова всех остальных
```javascript

Копировать код
async function main() {
	try {
		 await getBalance(); // Проверка баланса на кошельке
		 await mintSPL(); // Создание токена
		 await mintSPLMetadata(); // Создание токена с метаданными
		 await transactionToken(); // Перевод токенов на другой кошелек
		 await getTokenMetadata('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Получение метаданных
	   subscribeToEvents(); // Подписка на события
	} catch (error) {
		console.error(error);
	
```

### Используемые технологии
1. **Менеджер пакетов**: [npm](https://www.npmjs.com/)
2. **Solana Web3**: [solana/web3.js](https://www.npmjs.com/package/@solana/web3.js)
3. **Metaplex JS SDK**: [@metaplex/js](https://www.npmjs.com/package/@metaplex/js)
4. **Solana SPL Token**: [@solana/spl-token](https://www.npmjs.com/package/@solana/spl-token)
5. **Solana SPL Token Metadata**: [@solana/spl-token-metadata](https://www.npmjs.com/package/@solana/spl-token-metadata)
6. **Base58 encoding/decoding**: [bs58](https://www.npmjs.com/package/bs58)
7. **Dotenv**: [dotenv](https://www.npmjs.com/package/dotenv)
