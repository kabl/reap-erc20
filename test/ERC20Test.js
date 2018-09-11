const token = artifacts.require("ExampleToken");
const reapableERC20 = artifacts.require("ReapableERC20");

contract('ReapableERC20 test', async (accounts) => {

  it("transfer tokens to a smart contract. Reap them to Bob", async () => {
    let erc20 = await token.deployed();
    let reap = await reapableERC20.deployed();

    let bob = accounts[1];
    await reap.transferOwnership(bob);
    let owner = await reap.owner();
    assert.equal(owner, bob);

    await erc20.transfer(reap.address, 100);
    let balance = await erc20.balanceOf(reap.address);
    assert.equal(balance, 100);

    balance = await erc20.balanceOf(bob);
    assert.equal(balance, 0);

    await reap.reapErc20Tokens(erc20.address, bob, {from: bob});
    balance = await erc20.balanceOf(bob);
    assert.equal(balance, 100);

    balance = await erc20.balanceOf(reap.address);
    assert.equal(balance, 0);
 })
});