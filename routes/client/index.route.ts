import {Express} from 'express';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { userRoutes } from './user.route';

import { infoUser } from '../../middlewares/user.middleware';

const clientRoutes = (app: Express) => {
    app.use(infoUser);

    app.use('/topics', topicRoutes);

    app.use('/songs', songRoutes);

    app.use('/user', userRoutes);
};

export default clientRoutes;