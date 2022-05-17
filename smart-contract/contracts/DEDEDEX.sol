// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

import "./DEDEKIP7.sol";
import "./Ownable.sol";

contract DEDEDEX is Ownable {
  DEDEKIP7 token;
  uint16 ratio;

  constructor() public {
	ratio = 1000;
  }

  function klayToDede() public payable returns(bool) {
	uint256 dedeBalance = getDedeBalance();
	uint256 dedeToSend = msg.value * ratio;
	require(dedeBalance >= dedeToSend, "DEDEDEX: Contract does not contain sufficient amounts to send dede token.");
	token.delegatedTransferForDex(address(this), msg.sender, dedeToSend);
	return true;
  }

  function dedeToKlay(uint256 amount) public returns(bool) {
	uint256 klayBalance = getKlayBalance();
	uint256 klayToSend = amount / ratio / 10 * 9;
	require(klayBalance >= klayToSend, "DEDEDEX: Contract does not contain sufficient amounts to send Klay.");
	token.delegatedTransferForDex(msg.sender, address(this), amount);
	msg.sender.transfer(klayToSend);
	return true;
  }

  function getKlayBalance() public view returns(uint256) {
	return address(this).balance;
  }

  function getDedeBalance() public view returns(uint256) {
	return token.balanceOf(address(this));
  }

  function addLiquidity(uint256 amount) public onlyOwner returns(bool) {
	token.delegatedAddLiquidity(amount);
	return true;
  }

  function removeLiquidity(uint256 amount) public onlyOwner returns(bool) {
	token.delegatedRemoveLiquidity(amount);
	return true;
  }

  function setToken(address tokenAddress) public onlyOwner returns(bool) {
	require(tokenAddress != address(0x0));
	token = DEDEKIP7(tokenAddress);
	return true;
  }
}
