# Reapable Contract
ERC20 tokens can be sent to any address based on the ERC20 standard. So there are ERC20 tokens accidentally sent to smart contracts which can not handle these tokens and they're locked. This is described in detail in the ERC223 approval. 
- https://github.com/Dexaran/ERC223-token-standard
- https://github.com/ethereum/EIPs/issues/223

Anyway this proposal is not a solution to the main problem. But if somebody sends ERC20 tokens accidentally to your smart contract which implements `ReapableERC20.reapErc20Tokens(address _contract, address _to)` you are able to reap and transfer these tokens to whatever address you like. 

The solution is quiet simple:
```js
/**
* @dev Admin function
* @dev Transfers any kind of ERC20 tokens which are assigned/locked to this smart contract to an address.
* @param _contract The ERC20 contract address.
* @param _to The address to transfer all locked tokens to.
*/
function reapErc20Tokens(address _contract, address _to) public returns (bool) {
    require(msg.sender == owner);
    
    ERC20Basic erc20 = ERC20Basic(_contract);
    uint256 totalTokens = erc20.balanceOf(address(this));
    return erc20.transfer(_to, totalTokens);
}
```