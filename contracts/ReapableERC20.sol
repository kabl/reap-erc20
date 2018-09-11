pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ReapableERC20 is Ownable {


    constructor() public {

    }

    function reapErc20Tokens(address _contract, address _to) public returns (bool) {
        require(msg.sender == owner);
        
        ERC20Basic erc20 = ERC20Basic(_contract);
        uint256 totalTokens = erc20.balanceOf(address(this));
        return erc20.transfer(_to, totalTokens);
    }
}