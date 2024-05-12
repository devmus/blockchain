import { checkEntry, createFiles } from '../services/fileHandler.mjs';

export const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString('sv-SE');

  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString(
    'sv-SE'
  )} - ${new Date().toLocaleTimeString('sv-SE')}\n`;

  const loggerFile = 'app.log';
  const folder = 'logs';

  const shouldSkipLogging = checkEntry(message, folder, loggerFile, time);

  if (!shouldSkipLogging) {
    createFiles(message, folder, loggerFile);
    printToTerminal(req);
  }

  next();
};

const printToTerminal = (req) => {
  console.log(
    `// // // Input // // //
----------------------
${process.argv[3]}
${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
      'sv-SE'
    )}
----------------------`
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
    case '/api/v1/blockchain/block/broadcast':
      endpoint = '• Blockchain updated:';
      break;
    default:
      endpoint = '>!< Endpoint not recognized. >!<';
  }

  console.log(`${endpoint}`);

  if (req.method === 'POST' && endpoint !== '• Blockchain updated:') {
    console.log(`[${req.method}]`, req.body);
  } else {
    console.log(`[${req.method}]`);
  }
  console.log(
    `----------------------
\\\\ \\\\ \\\\ \\\\ \\\\ \\\\ \\\\ \\\\`
  );
};
