import express, {Request, Response, Express} from 'express';
import { connect as connectDatabase } from './config/database';

import dotenv from 'dotenv';

dotenv.config();
connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get('/topics', (req: Request, res: Response) => {
  res.render('client/pages/topics/index');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});