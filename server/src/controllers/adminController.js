import Admin from '../models/Admin.js';
import Contract from '../models/Contract.js';
import CustomMadeNft from '../models/CustomMadeNft.js';
import User from '../models/User.js';
import Caver from "caver-js";
import {create} from 'ipfs-http-client';
import {kip7Abi, kip7ByteCode} from '../abi/kip7ABI.js';
import {kip17Abi, kip17ByteCode} from '../abi/kip17ABI.js';
import {dexAbi, dexByteCode} from '../abi/dexABI.js';
import {stakingAbi, stakingByteCode} from '../abi/stakingABI.js';

const caver = new Caver("https://api.baobab.klaytn.net:8651/");

export const deployContracts = async (req, res) => {
  const adminExists = await Admin.findOne({adminType: 'Server'});

  if(adminExists.length === 0) {
	return res.status(400).json({message: "Admin not exists"});
  }

  try {
	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const kip7 = caver.contract.create(kip7Abi);
	const kip17 = caver.contract.create(kip17Abi);
	const dex = caver.contract.create(dexAbi);
	const staking = caver.contract.create(stakingAbi);

	const kip7Instance = await kip7.deploy({from: adminExists.address, gas: 15000000}, kip7ByteCode);
	const kip17Instance = await kip17.deploy({from: adminExists.address, gas: 15000000}, kip17ByteCode);
	const dexInstance = await dex.deploy({from: adminExists.address, gas: 15000000}, dexByteCode);
	const stakingInstance = await staking.deploy({from: adminExists.address, gas: 15000000}, stakingByteCode);

	await Contract.create({
	  contractType: 'KIP7',
	  address: kip7Instance.options.address
	});
	await Contract.create({
	  contractType: 'KIP17',
	  address: kip17Instance.options.address
	});
	await Contract.create({
	  contractType: 'DEX',
	  address: dexInstance.options.address
	});
	await Contract.create({
	  contractType: 'Staking',
	  address: stakingInstance.options.address
	});

	kip7Instance.options.from = adminExists.address;
	kip17Instance.options.from = adminExists.address;
	dexInstance.options.from = adminExists.address;
	stakingInstance.options.from = adminExists.address;
	kip7Instance.options.gas = 15000000;
	kip17Instance.options.gas = 15000000;
	dexInstance.options.gas = 15000000;
	stakingInstance.options.gas = 15000000;

	await kip17Instance.methods.setToken(kip7Instance.options.address).send();
	await dexInstance.methods.setToken(kip7Instance.options.address).send();
	await stakingInstance.methods.setToken(kip7Instance.options.address).send();
	await kip7Instance.methods.setKip17(kip17Instance.options.address).send();
	await kip7Instance.methods.setDedeDex(dexInstance.options.address).send();
	await kip7Instance.methods.setDedeStaking(stakingInstance.options.address).send();
	await dexInstance.methods.addLiquidity(caver.utils.toBN(caver.utils.toWei('300000000'))).send();

	caver.wallet.remove(adminExists.address);
	res.status(201).json({message: 'Contracts deployed.'});
  } catch(err) {
	caver.wallet.remove(adminExists.address);
	res.status(401).json({message: err.message});
  }
} 

export const createAdmin = async (req, res) => {
  const adminExists = await Admin.find({adminType: 'Server'});

  if(adminExists.length !== 0) {
	return res.status(400).json({message: "Admin already existed."});
  }

  try {
	const keyring = caver.wallet.keyring.generate();

	await Admin.create({
	  adminType: 'Server',
	  address: keyring.address,
	  privateKey: keyring.key.privateKey
	});

	res.status(201).json({message: 'Admin created.'});
  } catch(err) {
	res.status(401).json({message: err.message});
  }
}

export const buyNft = async (req, res) => {
  const body = req.body;
  const adminExists = await Admin.findOne({adminType: 'Server'});

  try {
	const nftExists = await CustomMadeNft.findOneAndDelete({...body});

	const ipfs = create('https://ipfs.infura.io:5001/api/v0');

	const metadataJson = JSON.stringify({...body, expired: Date.now() + 2629800000});

	const metadataAdded = await ipfs.add(metadataJson);
	const metadataUrl = `https://ipfs.infura.io/ipfs/${metadataAdded.path}`;

	const kip17Exists = await Contract.findOne({contractType: 'KIP17'});
	const kip17 = caver.contract.create(kip17Abi, kip17Exists.address);
	const kip7Exists = await Contract.findOne({contractType: 'KIP7'});
	const kip7 = caver.contract.create(kip7Abi, kip7Exists.address);

	const customerExists = await User.findById(body.customerId);
	const restaurantExists = await User.findById(body.restaurantObjectId);
	const customerAddress = customerExists.encryptedKeystore.address;
	const restaurantAddress = restaurantExists.encryptedKeystore.address;

	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);
	kip17.options.from = adminExists.address;
	kip17.options.gas = 15000000;
	kip7.options.from = adminExists.address;
	kip7.options.gas = 15000000;

	await kip17.methods.mintNft(customerAddress, metadataUrl, caver.utils.toBN(caver.utils.toPeb(nftExists.nftPrice))).send();
	await kip7.methods.transfer(customerAddress, restaurantAddress, caver.utils.toBN(caver.utils.toPeb(nftExists.nftPrice))).send();
	customerExists.token -= Number(nftExists.nftPrice);
	restaurantExists.token += Number(nftExists.nftPrice);
	customerExists.collectedNft.push(metadataJson);
	await customerExists.save();
	await restaurantExists.save();
	caver.wallet.remove(adminExists.address);

	res.status(201).json({message: "Bought NFT"});
  } catch(err) {
	caver.wallet.remove(adminExists.address);
	res.status(401).json({message: err.message});
  }
}

export const stake = async (req, res) => {
  const body = req.body;
  const adminExists = await Admin.findOne({adminType: 'Server'});

  try {
	const stakingExists = await Contract.findOne({contractType: 'Staking'});
	const stakingInstance = caver.contract.create(stakingAbi, stakingExists.address);


	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);
	stakingInstance.options.from = adminExists.address;
	stakingInstance.options.gas = 15000000;

	const userExists = await User.findById(body.userObjectId);

	await stakingInstance.methods.stake(userExists.encryptedKeystore.address, caver.utils.toBN(caver.utils.toPeb(body.amount))).send();
	userExists.stakedToken += Number(body.amount);
	userExists.token -= Number(body.amount);
	await userExists.save();
	caver.wallet.remove(adminExists.address);

	res.status(201).json({message: 'staked'});
  } catch(err) {
	caver.wallet.remove(adminExists.address);
	res.status(401).json({message: err.message});
  }
}

export const unstake = async (req, res) => {
  const body = req.body;
  const adminExists = await Admin.findOne({adminType: 'Server'});

  try {
	const stakingExists = await Contract.findOne({contractType: 'Staking'});
	const stakingInstance = caver.contract.create(stakingAbi, stakingExists.address);


	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);
	stakingInstance.options.from = adminExists.address;
	stakingInstance.options.gas = 15000000;

	const userExists = await User.findById(body.userObjectId);

	await stakingInstance.methods.unstake(userExists.encryptedKeystore.address, caver.utils.toBN(caver.utils.toPeb(body.amount))).send();
	userExists.stakedToken -= Number(body.amount);
	userExists.token += Number(body.amount);
	await userExists.save();
	caver.wallet.remove(adminExists.address);

	res.status(201).json({message: 'unstaked'});
  } catch(err) {
	caver.wallet.remove(adminExists.address);
	res.status(401).json({message: err.message});
  }
}

export const transfer = async (req, res) => {
  const body = req.body;
  const adminExists = await Admin.findOne({adminType: 'Server'});

  try {
	const kip7Exists = await Contract.findOne({contractType: 'KIP7'});
	const sender = await User.findById(body.userId);
	const recipient = await User.findOne({userId: body.recipientUserId});

	if(!recipient) {
	  return res.status(401).json({message: 'recipient does not exist'});
	}

	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const kip7Instance = caver.contract.create(kip7Abi, kip7Exists.address);
	await kip7Instance.methods.transfer(sender.encryptedKeystore.address, recipient.encryptedKeystore.address, caver.utils.toBN(caver.utils.toPeb(body.amount))).send({from: adminExists.address, gas: 15000000});

	sender.token -= Number(body.amount);
	recipient.token += Number(body.amount);
	await sender.save();
	await recipient.save();

	caver.wallet.remove(adminExists.address);
	res.status(201).json({message: 'transferred'});
  } catch(err) {
	caver.wallet.remove(adminExists.address);
	res.status(401).json({message: err.message});
  }
}
