import {Express} from 'express';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { userRoutes } from './user.route';
import { favoriteSongRoutes } from './favorite-song.route';
import { searchRoutes } from './search.route';

import { infoUser } from '../../middlewares/user.middleware';

const clientRoutes = (app: Express) => {
    app.use(infoUser);

    app.use('/topics', topicRoutes);

    app.use('/songs', songRoutes);

    app.use('/user', userRoutes);

    app.use('/favorite-songs', favoriteSongRoutes);

    app.use('/search', searchRoutes);
};

export default clientRoutes;