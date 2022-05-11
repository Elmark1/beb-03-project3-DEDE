import express from 'express';
import Caver from 'caver-js';
import dotenv from 'dotenv';

dotenv.config();

import {abi, byteCode} from './abi.js';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const router = express.Router();

router.get('/', (req, res) => {
  const keyring = caver.wallet.keyring.generate();

  console.log(keyring.address);
  console.log('...');
  console.log(keyring.key.privateKey);
  res.status(200).json(keyring);
});

router.get('/deploy', (req, res) => {
  const contract = caver.contract.create(abi);
  const keyring = caver.wallet.keyring.create(process.env.TEST_ADDRESS, process.env.TEST_PRIVATE_KEY);
  caver.wallet.add(keyring);
  contract.deploy({
	from: '0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2',
	gas: 15000000
  }, byteCode)
	.then(contractInstance => {
	  console.log(contractInstance.options.address);
	  res.status(200).json(contractInstance);
	});
});

router.get('/mintnft', (req, res) => {
  const contract = caver.contract.create(abi, '0xfEffe74cD75bdf3383B1F5852e986EE09800D269');
  const keyring = caver.wallet.keyring.create(process.env.TEST_ADDRESS, process.env.TEST_PRIVATE_KEY);
  caver.wallet.add(keyring);
  contract.methods.mintNFT('http://adfsjkl').send({
	from: '0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2',
	gas: 1500000
  })
	.then(receipt => {
	  console.log(receipt);
	  caver.wallet.remove('0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2');
	  res.status(200).json(receipt);
	});
});

router.get('/getbalance', (req, res) => {
  const contract = caver.contract.create(abi, '0xfEffe74cD75bdf3383B1F5852e986EE09800D269');
  const keyring = caver.wallet.keyring.create(process.env.TEST_ADDRESS, process.env.TEST_PRIVATE_KEY);
  caver.wallet.add(keyring);
  contract.methods.balanceOf('0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2').call({
	from: '0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2'
  })
	.then(result => {
	  console.log(result);
	  caver.wallet.remove('0xc968Aba0e7fF51742Ec44630c82b4E7E866E7da2');
	  res.status(200).json(result);
	});
});

router.get('/getclientversion', async (req, res) => {
  const version = await caver.rpc.klay.getClientVersion();
  console.log(version);
  res.status(200).json(version);
});

export default router;
