import { createFiles } from '../utilities/createFiles.mjs';

export const logger = (req, res, next) => {
  writeToFile(req);

  printToTerminal(req);
  next();
};

const writeToFile = (req) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString(
    'sv-SE'
  )} - ${new Date().toLocaleTimeString('sv-SE')}\n`;

  const loggerFile = 'app.log';
  const folder = 'logs';
  createFiles(message, folder, loggerFile);
};

const printToTerminal = (req) => {
  console.log(
    `// User input //`,
    `${new Date().toLocaleDateString('sv-SE')}`,
    `${new Date().toLocaleTimeString('sv-SE')}`
  );

  const url = req.originalUrl;
  let endpoint = '';

  switch (url) {
    case '/api/v1/members':
      endpoint = '• Read node list:';
      break;
    case '/api/v1/members/register-node':
      endpoint = '• Register nodes:';
      break;
    case '/api/v1/blockchain':
      endpoint = '• Read blockchain:';
      break;
    case '/api/v1/blockchain/mine':
      endpoint = '• Create block:';
      break;
    case '/api/v1/blockchain/consensus':
      endpoint = '• Reach consensus:';
      break;
    default:
      endpoint = '>!< Endpoint not recognized. >!<';
  }

  console.log(`${endpoint}`);

  if (req.method === 'POST') {
    console.log(`[${req.method}]`, req.body, `\n`);
  } else {
    console.log(`[${req.method}]\n`);
  }
};
