"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const user_route_1 = require("./user.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const user_middleware_1 = require("../../middlewares/client/user.middleware");
const clientRoutes = (app) => {
    app.use(user_middleware_1.infoUser);
    app.use('/topics', topic_route_1.topicRoutes);
    app.use('/songs', song_route_1.songRoutes);
    app.use('/user', user_route_1.userRoutes);
    app.use('/favorite-songs', favorite_song_route_1.favoriteSongRoutes);
    app.use('/search', search_route_1.searchRoutes);
};
exports.default = clientRoutes;
