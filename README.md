# 🗳️ Decentralized Voting Smart Contract

This project implements a decentralized voting system on the Ethereum blockchain using **Solidity** smart contracts and **Hardhat** for development, testing, and deployment. It tracks voters, prevents double voting, and resets state securely between election rounds.

## 📦 Tech Stack

- **[Solidity](https://docs.soliditylang.org)** — Smart contract language
- **[Hardhat](https://hardhat.org)** — Ethereum development environment
- **[Web3.js](https://web3js.readthedocs.io/)** — Web3 integration for testing
- **[Truffle5](https://trufflesuite.com/)** — Mocha-compatible assertions with Hardhat
- **[Solidity Coverage](https://github.com/sc-forks/solidity-coverage)** — Smart contract test coverage

---

## 🚀 Features

- ✅ Candidate registration  
- ✅ One vote per address (prevents double voting)  
- ✅ Tracks voters per candidate  
- ✅ Reset voting state by owner  
- ✅ Fully tested with Truffle + Web3  
- ✅ Code coverage reporting  

---

## 🛠️ Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install


🔧 Project Structure

.
├── contracts/           # Solidity smart contracts
├── test/                # JavaScript tests (Mocha + Chai)
├── scripts/             # Deployment scripts
├── coverage/            # Code coverage output (after running)
├── hardhat.config.js    # Hardhat configuration
└── README.md


📜 Available Scripts

1. Compile Contracts

npx hardhat compile

2. Run Tests

npx hardhat test

3. Run Coverage

npx hardhat coverage


🧪 Example Test (Truffle + Web3)

it('should prevent double voting', async () => {
  await contract.voteCandidate(1, { from: accounts[1] });
  await expect(contract.voteCandidate(1, { from: accounts[1] }))
    .to.be.rejectedWith("Already voted");
});


🔒 Security Features
Uses onlyOwner modifier to restrict reset functions

Prevents re-voting using mapping(address => bool) hasCastVote

Stores candidateVoters per candidate for traceability


✅ Requirements

Node.js v16+

Hardhat v2.25+

NPM or Yarn

🙌 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.