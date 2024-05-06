import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import { DIFFICULTY, MINE_RATE } from '../utilities/settings.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];

    this.createBlock(Date.now(), '0', 'Genisis hash', [], 4);
  }

  createBlock(timestamp, previousBlockHash, currentBlockHash, data) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      DIFFICULTY
    );

    this.chain.push(block);

    return block;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(timestamp, previousBlockhash, currentBlockData, nonce) {
    const stringToHash =
      timestamp.toString() +
      previousBlockhash +
      JSON.stringify(currentBlockData) +
      nonce;
    const hash = createHash(stringToHash);
    return hash;
  }

  proofOfWork(timestamp, previousBlockHash, data) {
    let DIFFICULTY_LEVEL = DIFFICULTY;
    let nonce = 0;
    let hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);
    let currentTime;

    while (
      hash.substring(0, DIFFICULTY_LEVEL) !== '0'.repeat(DIFFICULTY_LEVEL)
    ) {
      nonce++;
      currentTime = Date.now();
      DIFFICULTY_LEVEL = this.changeDifficulty(currentTime);
      hash = this.hashBlock(currentTime, previousBlockHash, data, nonce);
    }

    return nonce;
  }

  changeDifficulty(currentTimestamp) {
    let { difficulty, timestamp } = this.getLastBlock();
    difficulty =
      timestamp + MINE_RATE > currentTimestamp
        ? difficulty + 1
        : difficulty - 1;

    return difficulty;
  }
}
