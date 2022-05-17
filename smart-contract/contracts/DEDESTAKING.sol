// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

import "./DEDEKIP7.sol";
import "./Ownable.sol";

contract DEDESTAKING is Ownable {
  DEDEKIP7 token;

  mapping(address => uint256) balances;
  mapping(address => uint256) stakingPeriods;

  constructor() public {}

  function stake(address from, uint256 amount) public onlyOwner {
	token.delegatedTransferForStaking(from, address(this), amount);
	balances[from] = balances[from] + amount;
	stakingPeriods[from] = block.timestamp + 60;
  }

  function unstake(address to, uint256 amount) public onlyOwner {
	if(stakingPeriods[to] <= block.timestamp) {
	  token.delegatedTransferForStaking(address(this), to, amount);
	  balances[to] = balances[to] - amount;
	} else {
	  require(false, "DEDESTAKING: cannot unstake");
	}
  }

  function setToken(address tokenAddress) public onlyOwner returns(bool) {
	require(tokenAddress != address(0x0));
	token = DEDEKIP7(tokenAddress);
	return true;
  }
}
