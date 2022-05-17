// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

import "@klaytn/contracts/token/KIP7/KIP7Token.sol";
import "./Ownable.sol";

contract DEDEKIP7 is KIP7Token, Ownable {
  constructor() public KIP7Token("DEDE FT", "DEDE", 18, 10000000000e18) {}

  function delegatedTransferForStaking(address sender, address recipient, uint256 amount) public returns(bool) {
	_transfer(sender, recipient, amount);
	return true;
  }

  function delegatedTransferForKip17(address sender, address recipient, uint256 amount) public onlyKip17 returns(bool) {
	_transfer(sender, recipient, amount);
	return true;
  }

  function delegatedTransferForDex(address sender, address recipient, uint256 amount) public onlyDedeDex returns(bool) {
	_transfer(sender, recipient, amount);
	return true;
  }

  function delegatedAddLiquidity(uint256 amount) public onlyDedeDex returns(bool) {
	_transfer(owner(), msg.sender, amount);
	return true;
  }

  function delegatedRemoveLiquidity(uint256 amount) public onlyDedeDex returns(bool) {
	_transfer(msg.sender, owner(), amount);
	return true;
  }

  function transferFrom(address sender, address recipient, uint256 amount) public onlyOwner returns (bool) {
	_transfer(sender, recipient, amount);
	_approve(sender, msg.sender, allowance(sender, msg.sender).sub(amount));
	return true;
  }

  function transfer(address recipient, uint256 amount) public onlyOwner returns (bool) {
	_transfer(msg.sender, recipient, amount);
	return true;
  }

  function approve(address spender, uint256 value) public onlyOwner returns (bool) {
	_approve(msg.sender, spender, value);
	return true;
  }

  function safeTransfer(address recipient, uint256 amount) public onlyOwner {
	safeTransfer(recipient, amount, "");
  }

  function safeTransfer(address recipient, uint256 amount, bytes memory data) public onlyOwner {
	transfer(recipient, amount);
	require(_checkOnKIP7Received(msg.sender, recipient, amount, data), "KIP7: transfer to non KIP7Receiver implementer");
  }

  function safeTransferFrom(address sender, address recipient, uint256 amount) public onlyOwner {
	safeTransferFrom(sender, recipient, amount, "");
  }

  function safeTransferFrom(address sender, address recipient, uint256 amount, bytes memory data) public onlyOwner {
	transferFrom(sender, recipient, amount);
	require(_checkOnKIP7Received(sender, recipient, amount, data), "KIP7: transfer to non KIP7Receiver implementer");
  }
}
