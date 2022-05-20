import express from 'express';
import {createAdmin, deployContracts} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/admins', createAdmin);
adminRouter.post('/deploy', deployContracts);

export default adminRouter;
