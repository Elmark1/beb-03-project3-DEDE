import express from 'express';
import {getDedeBalance, getKlayBalance, dedeToKlay, klayToDede} from '../controllers/dexController.js';

const dexRouter = express.Router();

dexRouter.get('/dede', getDedeBalance);
dexRouter.get('/klay', getKlayBalance);
dexRouter.post('/dedetoklay', dedeToKlay);
dexRouter.post('/klaytodede', klayToDede);

export default dexRouter;
