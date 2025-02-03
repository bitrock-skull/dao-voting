import { useState } from 'react';
import { ethers } from 'ethers';

console.log("Ethers library:", ethers); // Verify ethers is imported correctly

// ABI of the deployed contract
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "ProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      }
    ],
    "name": "ProposerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      }
    ],
    "name": "ProposerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum DAOVoting.VoteOption",
        "name": "option",
        "type": "uint8"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_proposer",
        "type": "address"
      }
    ],
    "name": "addProposer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "authorizedProposers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voted_For",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voted_Against",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voted_Abstain",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proposalsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_proposer",
        "type": "address"
      }
    ],
    "name": "removeProposer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      },
      {
        "internalType": "enum DAOVoting.VoteOption",
        "name": "_option",
        "type": "uint8"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "internalType": "enum DAOVoting.VoteOption",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Address of the deployed contract
const contractAddress = "0xA2125EB05ED60C6D03ef346f883111eD42d52aA3";
const provider = new ethers.JsonRpcProvider("https://connect.bit-rock.io");
const contractInstance = new ethers.Contract(contractAddress, abi, provider);

function App() {
  const [account, setAccount] = useState(null); // Store the connected account
  const [contract, setContract] = useState(null); // Store the contract instance
  const [proposals, setProposals] = useState([]); // Store the fetched proposals
  const [proposalDescription, setProposalDescription] = useState(""); // Store the proposal description input
  const [selectedProposalId, setSelectedProposalId] = useState(""); // Store the selected proposal ID
  const [voteOption, setVoteOption] = useState(""); // Store the selected vote option

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this dApp.");
      return;
    }
    
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      console.log("providerInstance:", providerInstance);
      const signerInstance = await providerInstance.getSigner();
      console.log("signerInstance:", signerInstance);
      const accounts = await signerInstance.getAddress();
      console.log("accounts:", accounts);
  
      setAccount(accounts);
  
      // Log the connected network
      const network = await providerInstance.getNetwork();
      console.log("Connected Network:", network);
  
      const contractInstance = new ethers.Contract(contractAddress, abi, signerInstance);
      console.log("contractInstance:", contractInstance);
      setContract(contractInstance);
      //console.log("1:", contractInstance);
      //setTimeout(() => {}, 2000);
      await fetchProposals(contractInstance);
      //console.log("2:", contractInstance);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to fetch proposals from the contract
  const fetchProposals = async (contractInstance) => {
    try {
        const count = await contractInstance.proposalsCount();
        let totalCount;
        totalCount = Number(count);
        console.log("Proposal Count:", totalCount); // Check the count
        const fetchedProposals = [];
        for (let i = 1; i-1 < totalCount; i++) {
            const proposal = await contractInstance.getProposal(i);
            console.log("Proposal", i, ":", proposal);
            fetchedProposals.push({
              id: Number(proposal[0]),
              description: proposal[1],
              votedFor: Number(proposal[2]),
              votedAgainst: Number(proposal[3]),
              votedAbstain: Number(proposal[4]),
            });
        }
        setProposals(fetchedProposals);
        console.log("Fetched Proposals:", JSON.stringify(fetchedProposals, null, 2));
        } catch (error) {
            console.error("Error in fetchProposals:", error);
            alert("Error fetching proposals. Check the console."); // Alert user
        }
};

  // Function to create a proposal
  const handleCreateProposal = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet and ensure the contract is initialized.");
      return;
    }
    
    try {
      // Validate input
      if (proposalDescription.trim() === "") {
        alert("Proposal description cannot be empty.");
        return;
      }

      console.log("Creating proposal with description:", proposalDescription);

      // Call the `createProposal` method on the contract
      const tx = await contract.createProposal(proposalDescription);
      console.log("Transaction sent:", tx.hash);

      // Wait for the transaction to be mined
      await tx.wait();
      console.log("Transaction confirmed.");

      // Clear the input field
      setProposalDescription("");

      // Refresh the list of proposals
      setTimeout(() => {}, 2000);
      await fetchProposals(contractInstance);
      alert("Proposal created successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Failed to create proposal. Check the console.");
    }
  };

  // Function to vote on a proposal
  const handleVote = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet and ensure the contract is initialized.");
      return;
    }
    console.log(`Voting on proposal ${selectedProposalId} with option ${voteOption}`);
    try {
      // Validate inputs
      if (selectedProposalId === "" || voteOption === "") {
          alert("Please select a proposal and vote option.");
        return;
      }

      console.log(`Voting on proposal ${selectedProposalId} with option ${voteOption}`);

      // Call the `vote` method on the contract
      const tx = await contract.vote(selectedProposalId, voteOption);
      console.log("Transaction sent:", tx.hash);

      // Wait for the transaction to be confirmed
      await tx.wait();
      console.log("Transaction confirmed.");

      // Refresh the list of proposals
      await fetchProposals(contractInstance);
      alert("Vote submitted successfully!");
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit vote. Already Voted.");
    }
  };

  return (
    <div className="main-container">
      <h1>BitRock DAO Voting</h1>

      {/* Wallet Connection */}
      <div>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>

      {/* Only show the rest of the UI if the wallet is connected */}
      {account && (
        <div>
          {/* View Proposals */}
          <div>
          <br />
            <h2>Proposals</h2>
            {proposals.length > 0 ? (
              <ul>
                {proposals.map((proposal) => (
                  <li key={proposal.id}>
                    <strong>{proposal.description}</strong>
                    <br />
                    For: {proposal.votedFor}, Against: {proposal.votedAgainst}, Abstain: {proposal.votedAbstain}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No proposals available.</p>
            )}
          </div>
          <br />
          {/* Vote on Proposal */}
          <div>
            <h2>Vote on Proposal</h2>
            {proposals.length > 0 ? (
              <select value={selectedProposalId} onChange={(e) => {
                  setSelectedProposalId((e.target.value));
                  //console.log("Selected Proposal ID:", (e.target.value));
                }}>
                <option value="" disabled hidden> Select a proposal</option>
                {proposals.map((proposal) => (
                  <option key={proposal.id} value={proposal.id}>
                    {proposal.description}
                  </option>
                ))}
              </select>
            ) : (
              <p>No proposals to vote on.</p>
            )}
            <br />
            <label>
              Vote Option:
              <br />
              {proposals.length > 0 ? (
              <select value={voteOption} onChange={(e) => {
                  setVoteOption(e.target.value);
                  //console.log("Selected Vote Option:", e.target.value);
                }}>
                <option value="" disabled hidden> {/* Default placeholder */}
                  Select an option</option>
                <option value={0}>For</option>
                <option value={1}>Against</option>
                <option value={2}>Abstain</option>
              </select>
              ) : (
                <p>No options to vote on.</p>
              )}
            </label>  
            <br />
            {proposals.length > 0 ? (
              <button onClick={handleVote}>Submit Vote</button>
            ) : (
              <p></p>
            )}
            <br />
            <br />
            {/* Create Proposal */}
              <div>
              <h2>Create Proposal (Admins Only)</h2>
              <input type="text" value={proposalDescription} onChange={(e) => setProposalDescription(e.target.value)}
                placeholder="Enter proposal description"/>
              <button onClick={handleCreateProposal}>Create Proposal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
