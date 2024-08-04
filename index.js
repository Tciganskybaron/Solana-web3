require('dotenv').config();

const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const bs58 = require('bs58').default; 

async function main() {
	const connection = new solanaWeb3.Connection('https://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150', {
		wsEndpoint: 'wss://solana-mainnet.core.chainstack.com/b490b7141d006a5b9f894cdc113e6150',
	});

	const walletKeyPair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(bs58.decode(process.env.PRIVATE_KEY)));

	let balance = await connection.getBalance(walletKeyPair.publicKey);
	console.log(balance / solanaWeb3.LAMPORTS_PER_SOL);
}

main().catch(err => {
	console.error(err);
});
