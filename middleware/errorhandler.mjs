import { createFiles } from '../utilities/createFiles.mjs';

export const errorHandler = (err, req, res, next) => {
  const message = `Method: ${req.method} Url: ${
    req.originalUrl
  } Date: ${new Date().toLocaleDateString(
    'sv-SE'
  )} Time: ${new Date().toLocaleTimeString('sv-SE')} Success: ${
    err.success
  } - Message: ${err.message}\n`;

  const errorFile = 'error.log';
  const folder = 'logs';
  createFiles(message, folder, errorFile);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';

  res
    .status(err.statusCode)
    .json({ success: err.success, message: err.message });
};
