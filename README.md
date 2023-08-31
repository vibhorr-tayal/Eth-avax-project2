# Eth-avax-project2
# Solidity Smart Contract: Assessment

The "Assessment" Solidity smart contract is a simple financial system that allows users to deposit and withdraw funds. It is built on the Ethereum blockchain platform and utilizes Solidity, a programming language specifically designed for writing smart contracts.

## Contract Overview

The "Assessment" contract maintains a balance of funds and provides methods for users to deposit and withdraw ether. It includes features to emit events for tracking deposits and withdrawals. Additionally, the contract introduces a custom error to handle cases of insufficient balance during withdrawals.

## Usage

### Deployment

* Create a new file and Copy the provided Solidity code from this Github Repository.

* Confirm that your Solidity compiler version is compatible (at least 0.8.0) and compile the code.

* Deploy the contract on the Ethereum blockchain using a compatible development environment or Ethereum wallet.

### Interacting with the Contract

1. **getBalance()**: Call this function to retrieve the current balance of the contract.

2. **deposit(uint256 _amount)**: Use this function to deposit a specified amount of ether into the contract. The `_amount` parameter should be provided as the amount of ether in wei to deposit.

3. **withdraw(uint256 _withdrawAmount)**: Call this function to withdraw a specified amount of ether from the contract. The `_withdrawAmount` parameter should be provided as the amount of ether in wei to withdraw. The contract will check if the withdrawal amount is available in the balance before processing.

## Functions

- **getBalance()**: View function to retrieve the current contract balance in wei.

- **deposit(uint256 _amount)**: Payable function that allows users to deposit a specified amount of ether into the contract. Emits a `Deposit` event upon successful deposit.

- **withdraw(uint256 _withdrawAmount)**: Function to withdraw a specified amount of ether from the contract. Emits a `Withdraw` event upon successful withdrawal. If the withdrawal amount exceeds the contract's balance, it will revert with an `InsufficientBalance` error.

## Events

- **Deposit(uint256 amount)**: Emitted when a deposit is made, indicating the amount deposited.

- **Withdraw(uint256 amount)**: Emitted when a withdrawal is made, indicating the amount withdrawn.

## Author

This project is authored by Vibhor Tayal.


## License

The SimpleContract project is licensed under the MIT License, granting you the flexibility to modify and distribute the code as needed.
