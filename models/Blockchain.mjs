import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];

    this.memberNodes = [];

    this.nodeUrl = process.argv[3];

    this.createBlock(
      Date.now(),
      '0',
      'Genisis hash',
      [],
      process.env.DIFFICULTY,
      1024
    );
  }

  createBlock(
    timestamp,
    previousBlockHash,
    currentBlockHash,
    data,
    difficulty,
    nonce
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      difficulty,
      nonce
    );

    this.chain.push(block);

    return block;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(timestamp, previousBlockhash, currentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockhash +
      JSON.stringify(currentBlockData) +
      nonce +
      difficulty;
    const hash = createHash(stringToHash);
    return hash;
  }

  proofOfWork(previousBlockHash, data) {
    const lastBlock = this.getLastBlock();
    let difficulty, hash, timestamp;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficultyAdjustment(lastBlock, timestamp);
      hash = this.hashBlock(
        timestamp,
        previousBlockHash,
        data,
        difficulty,
        nonce
      );
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }

  difficultyAdjustment(lastBlock, currentTimestamp) {
    const mineRate = process.env.MINE_RATE;

    let { difficulty, timestamp } = lastBlock;

    if (difficulty < 1) return 1;

    const timestampDiff = currentTimestamp - lastBlock.timestamp;

    return timestampDiff > mineRate ? +difficulty - 1 : +difficulty + 1;
  }

  validateChain(blockchain) {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];

      const previousBlock = blockchain[i - 1];

      const hash = this.hashBlock(
        block.timestamp,
        previousBlock.currentBlockHash,
        block.data,
        block.difficulty,
        block.nonce
      );

      if (hash !== block.currentBlockHash) isValid = false;

      if (block.previousBlockHash !== previousBlock.currentBlockHash)
        isValid = false;
    }
    return isValid;
  }
}
