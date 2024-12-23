import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log(
    provider,
    signer,
    transactionsContract
  );

  return transactionsContract;
};


export const TransactionProvider = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    if(!ethereum) return alert("Please install metamask");

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if(accounts.length) {
      setConnectedAccount(accounts[0]);

      //get all transactions
    }
    else{
      console.log("No accounts found");
    }

    console.log(accounts);
  }

  const connectWallet = async () =>{
    try {
      if(!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0]);

    } catch (error) {
      console.error();
      throw new Error("No etherium object");
    }
  }


  const sendTransaction = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");

      // get the data from the form....
      const { addressTo, amount, keyword, message } = formData;
      getEthereumContract();
      
    } catch (error) {
      console.error();
      throw new Error("No etherium object");
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return(
    <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}