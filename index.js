const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
  } = require("@solana/web3.js");
  
   const log = (a) =>{
       console.log(a);
   }  
  const newPair = new Keypair();
  log(newPair)
  
  
  const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
  const secretKey = newPair._keypair.secretKey;
  
  
  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const myWallet = await Keypair.fromSecretKey(secretKey);
      const walletBalance = await connection.getBalance(
        new PublicKey(myWallet.publicKey)
      );
      log(`=> For wallet address ${publicKey}`);
      log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
      log(err);
    }
  };
  
  
  const airDropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletKeyPair = await Keypair.fromSecretKey(secretKey);
      log(`-- Airdropping 2 SOL --`)
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey),
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      log(err);
    }
  };
  
  
  const driverFunction = async () => {
      await getWalletBalance();
      await airDropSol();
      await getWalletBalance();
  }
  driverFunction();