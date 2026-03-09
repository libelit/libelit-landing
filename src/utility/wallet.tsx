export const autoConnectWallet = async (sdk: any, provider: any) => {
  try {
    if (!provider) return [];
    // if (connected && accounts.length) return;

    let accounts = await sdk?.connect();
    accounts = accounts?.map((address: String) => ({
      address: address,
      balance: 0x0,
    }));

    return accounts;
  } catch (err) {
    console.log(err);
  }
};
