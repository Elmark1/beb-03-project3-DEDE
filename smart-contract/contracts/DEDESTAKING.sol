// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

import "./DEDEKIP7.sol";
import "./Ownable.sol";

contract DEDESTAKING is Ownable {
  DEDEKIP7 token;
  uint256 private _period;

  mapping(address => uint256) balances;
  mapping(address => uint256) stakingPeriods;

  constructor() public {
	_period = 60;
  }

  /*
  * set staking period in seconds
  */
  function setPeriod(uint256 period) public onlyOwner {
	_period = period;
  }

  function stake(address from, uint256 amount) public onlyOwner {
	token.delegatedTransferForStaking(from, address(this), amount);
	balances[from] = balances[from] + amount;
	stakingPeriods[from] = block.timestamp + _period;
  }

  function unstake(address to, uint256 amount) public onlyOwner {
	require(stakingPeriods[to] <= block.timestamp, "DEDESTAKING: cannot unstake before staking period");
	require(balances[to] >= amount, "DEDESTAKING: cannot unstake more than staked tokens");
	token.delegatedTransferForStaking(address(this), to, amount);
	balances[to] = balances[to] - amount;
  }

  function getStakedTokens(address from) public view returns(uint256) {
	return balances[from];
  }

  function getTotalStakedTokens() public view returns(uint256) {
	return token.balanceOf(address(this));
  }

  function setToken(address tokenAddress) public onlyOwner returns(bool) {
	require(tokenAddress != address(0x0));
	token = DEDEKIP7(tokenAddress);
	return true;
  }
}
