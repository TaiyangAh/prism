const { default: Web3 } = require("web3");

const PrismSale = artifacts.require("PrismSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PrismSale", function (accounts) {
  it("should assert true", async function () {
    await PrismSale.deployed();
    return assert.isTrue(true);
  });

  it("should get the right accounts", async function () {
    const contract = await PrismSale.deployed();
    const owner = await contract.owner.call();
    const charity = await contract.charity.call();

    assert.isTrue(owner == 0x27f1946898b1b4ad4b42e05ec8e02ac9e9f67248);
    assert.isTrue(charity == 0x4d13fae8098f2f40c5840e3ccdd5b1ba64c09c55);
  });

  it("should split the payment to the owner", async function () {
    const contract = await PrismSale.deployed();
    const initBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    const purchase = await contract.buy.sendTransaction({
      from: accounts[5],
      value: web3.utils.toWei("0.01", "ether"),
    });

    const commission = web3.utils.toBN(web3.utils.toWei("0.008", "ether"));
    const finalBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[1])
    );

    assert.equal(
      initBalance.add(commission).toString(),
      finalBalance.toString()
    );
  });

  it("should split the payment to the charity", async function () {
    const contract = await PrismSale.deployed();
    const initBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[2]));
    const purchase = await contract.buy.sendTransaction({
      from: accounts[0],
      value: web3.utils.toWei("0.01", "ether"),
    });

    const commission = web3.utils.toBN(web3.utils.toWei("0.002", "ether"));
    const finalBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[2])
    );

    assert.equal(
      initBalance.add(commission).toString(),
      finalBalance.toString()
    );
  });
});
