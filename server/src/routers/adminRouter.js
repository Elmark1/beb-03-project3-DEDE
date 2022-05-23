import express from 'express';
import {createAdmin, deployContracts, buyNft, stake, unstake} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/admins', createAdmin);
adminRouter.post('/deploy', deployContracts);
adminRouter.post('/nfts', buyNft);
adminRouter.post('/stake', stake);
adminRouter.post('/unstake', unstake);

export default adminRouter;
