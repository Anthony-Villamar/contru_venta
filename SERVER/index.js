import express from 'express';
import path from 'path';
import router from './routes/index.js';
import { Puerto, PuertoFrontend, PuertoSERVER2 } from './config.js';
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: ["http://localhost:3001"] }));
app.use(express.json());
app.use('/', router);

app.listen(Puerto, () => {
    console.log("Server is running on http://localhost:" + Puerto);
});
