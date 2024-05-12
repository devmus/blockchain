import express from 'express';
import {
  broadcast,
  createBlock,
  getBlockchain,
  synchronizeChain,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').post(createBlock);
router.route('/consensus').get(synchronizeChain);
router.route('/block/broadcast').post(broadcast);

export default router;
