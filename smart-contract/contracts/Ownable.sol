// SPDX-License-Identifier: MIT
pragma solidity 0.5.6;

contract Ownable {
    address payable private _owner;
	address private _kip17;
	address private _dedeDex;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Throws if called by any account other than the KIP-17 or DEDE DEX smart contract account.
     */
	modifier onlyKip17OrDedeDex() {
	  require(isDedeDex() || isKip17(), "Ownable: caller is nor the kip17 neither dede dex");
	  _;
	}

	modifier onlyKip17() {
	  require(isKip17(), "Ownable: caller is not the kip17");
	  _;
	}

	modifier onlyDedeDex() {
	  require(isDedeDex(), "Ownable: caller is not the dede dex");
	  _;
	}

    /**
     * @dev Returns true if the caller is the current KIP-17 smart contract account.
     */
	function isKip17() public view returns(bool) {
	  return msg.sender == _kip17;
	}

	/**
	  * @dev Set KIP-7 smart contract account by owner.
	  */
	function setKip17(address kip17) public onlyOwner {
	  _kip17 = kip17;
	}

    /**
     * @dev Returns true if the caller is the current DEDE DEX smart contract account.
     */
	function isDedeDex() public view returns(bool) {
	  return msg.sender == _dedeDex;
	}

	/**
	  * @dev Set DEDE DEX smart contract account by owner.
	  */
	function setDedeDex(address dedeDex) public onlyOwner {
	  _dedeDex = dedeDex;
	}

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address payable) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * > Note: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address payable newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address payable newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
