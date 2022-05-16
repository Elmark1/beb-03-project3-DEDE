// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

import "@klaytn/contracts/token/KIP7/KIP7Token.sol";
import "./Ownable.sol";

contract DEDEKIP7 is KIP7Token, Ownable {
  constructor() public KIP7Token("DEDE FT", "DEDE", 18, 10000000000e18) {}

  function delegatedTransferFrom(address sender, address recipient, uint256 amount) public onlyKip17 returns (bool) {
	_transfer(sender, recipient, amount);
	return true;
  }

  function klayToDedeToken() public payable returns(bool) {
	owner().transfer(msg.value);
	_transfer(owner(), msg.sender, msg.value * 1000);
	return true;
  }

  function dedeTokenToKlay(address payable receiver, uint256 amount) public payable onlyOwner returns(bool) {
	_transfer(receiver, msg.sender, amount);
	receiver.transfer(5e18);
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
