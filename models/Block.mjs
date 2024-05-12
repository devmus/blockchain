export default class Block {
  constructor(
    timestamp,
    blockIndex,
    previousBlockHash,
    currentBlockHash,
    data,
    difficulty,
    nonce
  ) {
    this.timestamp = timestamp;
    this.blockIndex = blockIndex;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = currentBlockHash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}
