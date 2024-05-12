import {
  initializeBlockchain,
  synchronizeChain,
} from '../controllers/blockchain-controller.mjs';
import { readFile } from './fileHandler.mjs';

const serverUrl = process.argv[3];

export const startup = (PORT) => {
  const totalTime = 25 * 1000;
  const increment = 100;
  let elapsedTime = 0;
  let progress = 0;

  const progressBarWidth = 30;

  const interval = setInterval(() => {
    elapsedTime += 1000;
    progress = (elapsedTime / totalTime) * 100;

    console.clear();

    console.log('Server is booting up...');

    const numBars = Math.floor((progress / 100) * progressBarWidth);
    const progressBar = '#'.repeat(numBars).padEnd(progressBarWidth, '-');

    console.log(`[${progressBar}] ${Math.floor(progress)}%`);

    if (elapsedTime >= totalTime) {
      clearInterval(interval);
      console.clear();
      console.log(`[Blockchain node is running on port: ${PORT}]`);
      console.log(
        `
// Postman commands //

• Read node list:
[GET] ${serverUrl}/api/v1/members

• Register nodes:
[POST] ${serverUrl}/api/v1/members/register-node
{ "nodeUrl": "${serverUrl}" }

• Read blockchain:
[GET] ${serverUrl}/api/v1/blockchain

• Create block:
[POST] ${serverUrl}/api/v1/blockchain/mine
{ "amount": 5, "recipient": "Saylor" }

• Reach consensus:
[GET] ${serverUrl}/api/v1/blockchain/consensus

Waiting for input...
`
      );
    }
  }, increment);
  initializeBlockchain();
};
