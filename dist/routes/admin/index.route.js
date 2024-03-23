"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const adminRoutes = (app) => {
    const prefixAdmin = system_1.systemConfig.prefixAdmin;
    app.use(`/${prefixAdmin}/dashboard`, dashboard_route_1.dashboardRoute);
    app.use(`/${prefixAdmin}/topics`, topic_route_1.topicRoute);
    app.use(`/${prefixAdmin}/songs`, song_route_1.songRoute);
};
exports.default = adminRoutes;
