import express, {Request, Response, Express} from 'express';
import dotenv from 'dotenv';
import { connect as connectDatabase } from './config/database';
import clientRoutes from './routes/client/index.route';

import Topic from './models/topic.model';

dotenv.config();
connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});