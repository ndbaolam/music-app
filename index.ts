import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from "path";
import methodOverride from "method-override";

import { systemConfig } from "./config/system";
import { connect as connectDatabase } from './config/database';
import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';

dotenv.config();
connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json())

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});