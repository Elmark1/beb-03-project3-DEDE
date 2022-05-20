import Admin from '../models/Admin.js';
import Contract from '../models/Contract.js';
import Caver from "caver-js";
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
