const { artifacts, contract, assert } = require("hardhat");
const { expect } = require("chai");
const voting = artifacts.require("Voting");

contract('Voting', accounts => {
  let contractInstance;

  before(async () => {
    contractInstance = await voting.new();
    console.log('Owner', await contractInstance.owner())
  })


  it('should add a candidate', async () => {
    await contractInstance.addCandidate('Raju', 'RajuSign');

    const candidate = await contractInstance.candidate(1);

    assert.equal(candidate.name, 'Raju');
    assert.equal(candidate.sign, 'RajuSign');
  });


  it('should delete a candidate', async () => {
    await contractInstance.addCandidate('Rakib', 'RakibSign')
    await contractInstance.deleteCandidate(2)
    const count = await contractInstance.id()
    // console.log(count.toNumber())
    assert(count.toNumber() === 1)

  })


  it("should revert when voting hasn't started", async () => {
    await expect(contractInstance.voteCandidate(1))
      .to.be.rejectedWith("Vote hasn't started yet");
    assert.equal(await contractInstance.start(), false)
  });

  // it('should revert "The voting has closed!"', async () => {
  // })

  it('should start vote, set end time and duration', async () => {
    const block = await web3.eth.getBlock('latest');
    const _endtime = block.timestamp + 60 * 5; // Correctly add 5 minutes

    await contractInstance.startVoting(5); // 5 minutes

    const duration = await contractInstance.duration();
    const endtime = await contractInstance.endTime();

    assert.equal(duration.toNumber(), 5);
    assert.closeTo(endtime.toNumber(), _endtime, 2);
  });


  it('should add vote for a candidate', async () => {
    await contractInstance.addCandidate('Sakib', 'SakibSign')
    await contractInstance.voteCandidate(2, { from: accounts[1] })

    const candidate = await contractInstance.candidate(2);

    assert.equal(candidate.voteCount.toNumber(), 1)
    assert.equal(candidate.name, 'Sakib');
    assert.equal(candidate.sign, 'SakibSign');
  })


  it('should reset vote count', async () => {

    let candidate = await contractInstance.candidate(2);
    assert.equal(candidate.voteCount.toNumber(), 1)

    await contractInstance.resetVoteCount()

    candidate = await contractInstance.candidate(2);
    assert.equal(candidate.voteCount.toNumber(), 0)

  })


  it('should resets all voters address', async () => {
    assert.equal(await contractInstance.hasCastVote(accounts[1]), true)
    await contractInstance.resetAddress()
    assert.equal(await contractInstance.hasCastVote(accounts[1]), false)

  })


  it('should return start = false', async () => {
    await contractInstance.endVote()
    assert.equal(await contractInstance.start(), false)
    assert.equal(await contractInstance.endTime(), 0)
  })







})
