import express from 'express';
import {createAdmin, deployContracts, buyNft} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/admins', createAdmin);
adminRouter.post('/deploy', deployContracts);
adminRouter.post('/nfts', buyNft);

export default adminRouter;
