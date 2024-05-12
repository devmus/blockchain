import { checkEntry, createFiles } from '../services/fileHandler.mjs';

export const errorHandler = (err, req, res, next) => {
  const time = new Date().toLocaleTimeString('sv-SE');

  const message = `Method: ${req.method} Url: ${
    req.originalUrl
  } Date: ${new Date().toLocaleDateString(
    'sv-SE'
  )} Time: ${new Date().toLocaleTimeString('sv-SE')} Success: ${
    err.success
  } - Message: ${err.message}\n`;

  const errorFile = 'error.log';
  const folder = 'logs';

  const shouldSkipLogging = checkEntry(message, folder, errorFile, time);

  if (!shouldSkipLogging) {
    createFiles(message, folder, errorFile);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';

  res
    .status(err.statusCode)
    .json({ success: err.success, message: err.message });
};
