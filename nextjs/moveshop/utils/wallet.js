export const getAptosWallet = () => {
  if ("aptos" in window) {
    return window.aptos;
  } else {
    window.open("https://petra.app/", `_blank`);
  }
};

export const connectWallet = async () => {
  const wallet = getAptosWallet();
  try {
    const response = await wallet.connect();
    console.log(response); // { address: string, publicKey: string }
    localStorage.setItem('publicKey', response.publicKey)
    localStorage.setItem('address', response.address)
    return response
  } catch (error) {
    // { code: 4001, message: "User rejected the request."}
    throw error
  }
};

export const disconnectWallet = async () => {
  try {
    const wallet = getAptosWallet();
    await wallet.disconnect();
    localStorage.clear()
  } catch (err) {
    throw error
  }
};
