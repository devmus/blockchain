import { describe, it, expect, beforeEach } from 'vitest';
import Block from '../models/Block.mjs';

describe('Block', () => {
  const timestamp = Date.now();
  const blockIndex = 5;
  const previousBlockHash = 'previous-hash';
  const currentBlockHash = 'current-hash';
  const data = {
    coin: 'Bitcoin',
    transfer: { amount: 3, recipient: 'Saylor' },
  };
  const difficulty = 3;
  const nonce = 1024;

  const block = new Block(
    timestamp,
    blockIndex,
    previousBlockHash,
    currentBlockHash,
    data,
    difficulty,
    nonce
  );

  describe('Block data properties', () => {
    it('should have a coin property', () => {
      expect(block.data).toHaveProperty('coin');
    });
    it('should have a transfer property', () => {
      expect(block.data).toHaveProperty('transfer');
    });

    describe('Property values', () => {
      it('should set coin to Bitcoin', () => {
        expect(block.data.coin).toBe('Bitcoin');
      });
    });
  });
});
