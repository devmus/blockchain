import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';
import memberRouter from './routes/member-routes.mjs';
import { startup } from './services/blockchain-boot.mjs';
import { logger } from './middleware/logger.mjs';

import path from 'path';
import { fileURLToPath } from 'url';
import { ErrorResponse } from './utilities/ErrorResponseModel.mjs';
import { errorHandler } from './middleware/errorhandler.mjs';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(express.json());
app.use(logger);
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/members', memberRouter);

app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Kunde inte hitta resursen ${req.originalUrl}`, 404));
});

app.use(errorHandler);

const PORT = process.argv[2];

app.listen(PORT, () => console.log(startup(PORT)));
