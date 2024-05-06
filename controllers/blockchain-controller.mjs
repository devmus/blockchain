import { ResponseModel } from '../utilities/ResponseModel.mjs';
import { blockchain } from '../startup.mjs';

export const getBlockchain = (req, res, next) => {
  res
    .status(200)
    .json(new ResponseModel({ statusCode: 200, data: blockchain }));
};

export const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = req.body;
  const timestamp = Date.now();
  const nonce = blockchain.proofOfWork(timestamp, lastBlock.hash, data);

  const currentBlockHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentBlockHash,
    data,
    nonce
  );

  const block = blockchain.createBlock(
    timestamp,
    lastBlock.currentBlockHash,
    currentBlockHash,
    data
  );

  res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
};
