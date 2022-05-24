import Admin from '../models/Admin.js';
import Contract from '../models/Contract.js';
import User from '../models/User.js';
import Caver from "caver-js";
import {dexAbi} from '../abi/dexABI.js';

const caver = new Caver("https://api.baobab.klaytn.net:8651/");

const decryptKeystore = (encryptedKeystore, password) => {
  return caver.wallet.keyring.decrypt(encryptedKeystore, password);
};

export const dedeToKlay = async (req, res) => {
  const {userId, password, amount} = req.body;

  try {
	const adminExists = await Admin.findOne({adminType: 'Server'});
	const userExists = await User.findById(userId);

	const keyring = decryptKeystore(userExists.encryptedKeystore, password);

	caver.wallet.add(keyring);
	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const dexExists = await Contract.findOne({contractType: 'DEX'});

	const dexInstance = caver.contract.create(dexAbi, dexExists.address);

	await dexInstance.methods.dedeToKlay(caver.utils.toBN(caver.utils.toWei(amount))).send({
	  from: keyring.address,
	  gas: 15000000,
	  feeDelegation: true,
	  feePayer: adminExists.address
	});
	userExists.klay += Number(amount);
	userExists.token -= Number(amount);
	await userExists.save();

	caver.wallet.remove(keyring.address);
	caver.wallet.remove(adminExists.address);

	res.status(201).json({message: 'dedeToKlay'});
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

export const klayToDede = async (req, res) => {
  const {userId, password, amount} = req.body;

  try {
	const adminExists = await Admin.findOne({adminType: 'Server'});
	const userExists = await User.findById(userId);

	const keyring = decryptKeystore(userExists.encryptedKeystore, password);

	caver.wallet.add(keyring);
	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const dexExists = await Contract.findOne({contractType: 'DEX'});

	const dexInstance = caver.contract.create(dexAbi, dexExists.address);

	await dexInstance.methods.klayToDede().send({
	  from: keyring.address,
	  gas: 15000000,
	  value: caver.utils.toWei(amount),
	  feeDelegation: true,
	  feePayer: adminExists.address
	});

	userExists.klay -= Number(amount);
	userExists.token += Number(amount) * 1000;
	await userExists.save();

	caver.wallet.remove(keyring.address);
	caver.wallet.remove(adminExists.address);

	res.status(201).json({message: 'klayToDede'});
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

export const getDedeBalance = async (req, res) => {
  try {
	const adminExists = await Admin.findOne({adminType: 'Server'});

	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const dexExists = await Contract.findOne({contractType: 'DEX'});

	const dexInstance = caver.contract.create(dexAbi, dexExists.address);

	const dedeBalance = await dexInstance.methods.getDedeBalance().call();

	caver.wallet.remove(adminExists.address);

	res.status(200).json({dedeBalance: caver.utils.fromWei(dedeBalance)});
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

export const getKlayBalance = async (req, res) => {
  try {
	const adminExists = await Admin.findOne({adminType: 'Server'});

	caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

	const dexExists = await Contract.findOne({contractType: 'DEX'});

	const dexInstance = caver.contract.create(dexAbi, dexExists.address);

	const klayBalance = await dexInstance.methods.getKlayBalance().call();

	caver.wallet.remove(adminExists.address);

	res.status(200).json({klayBalance: caver.utils.fromWei(klayBalance)});
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}
