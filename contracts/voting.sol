//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    uint256 public id = 0;
    struct Candidate {
        string name;
        string sign;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) public candidate;
    mapping(address => bool) public hasCastVote;
    address public owner = msg.sender;
    uint256 public endTime;
    uint256 public duration;
    bool public start;
    address[] public allVoters;

    modifier onlyOwner() {
        require(owner == msg.sender, "Only Admin have permission this action");
        _;
    }

    function addCandidate(
        string memory name,
        string memory sign
    ) public onlyOwner {
        id++;
        candidate[id] = Candidate(name, sign, 0);
    }
    
    function deleteCandidate(uint256 _id) public onlyOwner {
        require(id >= _id, "The candidate doesn't exist ");

        candidate[_id] = candidate[id];
        delete candidate[id];
        id--;
    }

    function startVoting(uint256 End_Time) public onlyOwner {
        start = true;
        duration = End_Time;
        endTime = End_Time * 1 minutes + block.timestamp;
    }

    function voteCandidate(uint256 _id) public {
        require(start, "Vote hasn't started yet");
        require(endTime >= block.timestamp, "The voting has closed!");
        require(!hasCastVote[msg.sender], "You've already vote someone");
        candidate[_id].voteCount += 1;
       hasCastVote[msg.sender] = true;
        allVoters.push(msg.sender);
    }

    function resetVoteCount() public onlyOwner {
        for (uint256 i = 1; i <= id; i++) {
            candidate[i].voteCount = 0;
        }
    }

    function resetAddress() public onlyOwner {
        for (uint256 i = 0; i < allVoters.length; i++) {
           hasCastVote[allVoters[i]] = false;
        }
        delete allVoters;
    }

    function rmvAllCandidates() public onlyOwner {

        for (uint256 i = 1; i <= id; i++) {
        delete candidate[i];
        }
        id = 0;
    }

    function endVote() public onlyOwner {
        start = false;
        endTime = 0;
    }
}
