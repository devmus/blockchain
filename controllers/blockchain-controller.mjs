import { ResponseModel } from '../utilities/ResponseModel.mjs';
import { blockchain } from '../startup.mjs';
import { ErrorResponse } from '../utilities/ErrorResponseModel.mjs';
import { readFile, writeFileAsync } from '../services/fileHandler.mjs';

export async function initializeBlockchain() {
  const chain = readFile('data', 'blockchain.json');
  if (chain) {
    blockchain.chain = chain;
  }
}

export const getBlockchain = (req, res, next) => {
  res
    .status(200)
    .json(new ResponseModel({ statusCode: 200, data: blockchain }));
};

export const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = { coin: 'Bitcoin', transfer: req.body };

  const { nonce, difficulty, timestamp } = blockchain.proofOfWork(
    lastBlock.currentBlockHash,
    data
  );

  const currentBlockHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentBlockHash,
    data,
    difficulty,
    nonce
  );

  const block = blockchain.createBlock(
    timestamp,
    lastBlock.currentBlockHash,
    currentBlockHash,
    data,
    difficulty,
    nonce
  );

  writeFileAsync('data', 'blockchain.json', JSON.stringify(blockchain.chain));

  blockchain.memberNodes.forEach(async (url) => {
    console.log('broadcast');

    const body = block;
    await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
};

export const broadcast = (req, res, next) => {
  const block = req.body;
  const lastBlock = blockchain.getLastBlock();

  const hash = lastBlock.currentBlockHash === block.previousBlockHash;

  const index = lastBlock.blockIndex + 1 === block.blockIndex;

  if (hash && index) {
    blockchain.chain.push(block);
    res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
  } else {
    return next(new ErrorResponse(`Internal server error`, 500));
  }
};

export const synchronizeChain = (req, res, next) => {
  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  blockchain.memberNodes.forEach(async (member) => {
    const response = await fetch(`${member}/api/v1/blockchain`);
    if (response.ok) {
      const result = await response.json();

      if (result.data.chain.length > maxLength) {
        maxLength = result.data.chain.length;
        longestChain = result.data.chain;
      }

      if (
        !longestChain ||
        (longestChain && !blockchain.validateChain(longestChain))
      ) {
        return;
      } else {
        blockchain.chain = longestChain;
      }
    }
  });
  res.status(200).json(
    new ResponseModel({
      statusCode: 200,
      data: { message: 'Synkroniseringen är klar' },
    })
  );
};
