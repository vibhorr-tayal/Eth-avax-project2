import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm && depositAmount > 0) {
      let tx = await atm.deposit(depositAmount);
      await tx.wait();
      setDepositAmount(0);
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount > 0) {
      let tx = await atm.withdraw(withdrawAmount);
      await tx.wait();
      setWithdrawAmount(0);
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has MetaMask
    if (!ethWallet) {
      return (
        <div className="message">
          <p>Please install MetaMask to use this ATM.</p>
        </div>
      );
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <div className="connect">
          <button className="connect-button" onClick={connectAccount}>
            Connect MetaMask
          </button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="user">
        <p className="account">Your Account: {account}</p>
        <p className="balance">Your Balance: {balance} ETH</p>
        <div className="actions">
          <div className="action">
            <input
              type="number"
              placeholder="Deposit Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button className="deposit-button" onClick={deposit}>
              Deposit
            </button>
          </div>
          <hr className="divider" />
          <div className="action">
            <input
              type="number"
              placeholder="Withdraw Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button className="withdraw-button" onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Vibhor's ATM!</h1>
      </header>
      <div className="content">{initUser()}</div>
      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: #333;
          color: white;
          padding: 50px;
        }

        .divider {
          margin: 15px 0;
          border: 0;
          border-top: 1px solid #ccc;
        }

        .message {
          margin-top: 20px;
          color: #ff5555;
        }

        .connect-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }

        .connect-button:hover {
          background-color: #0056b3;
        }

        .user {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          background-color: #222;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .account,
        .balance {
          font-size: 18px;
          color: #ccc;
          margin: 10px 0;
        }

        .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .action {
          margin: 10px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .action input {
          width: 100px;
          padding: 5px;
          border: 1px solid #ccc;
          margin-bottom: 5px;
        }

        .deposit-button,
        .withdraw-button {
          padding: 5px 10px;
          color: white;
          border: none;
          cursor: pointer;
        }

        .deposit-button {
          background-color: #2ecc71;
        }

        .withdraw-button {
          background-color: #e74c3c;
        }

        .deposit-button:hover,
        .withdraw-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </main>
  );
}