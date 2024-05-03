import express from 'express';
import { startup } from './utilities/blockchain-boot.mjs';

const app = express();

app.use(express.json());

const PORT = process.argv[2];

app.listen(PORT, () => console.log(startup(PORT)));
