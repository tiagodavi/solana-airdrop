import {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL
} from "@solana/web3.js";

const wallet = new Keypair();
const publicKey = new PublicKey(wallet._keypair.publicKey);
const privateKey = wallet._keypair.secretKey;

// console.log(publicKey);
// console.log(privateKey);

const getWalletBalance = async() => {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const walletBalance = await connection.getBalance(publicKey);
		console.log(`Balance is ${walletBalance / LAMPORTS_PER_SOL}`);
	}catch(err){
		console.log(err);
	}
} 

const airDropSol = async() => {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
		await connection.confirmTransaction(fromAirDropSignature);
	}catch(err){
		console.log(err);
	}
}

await airDropSol();
await getWalletBalance();
