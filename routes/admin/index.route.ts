import { Express } from "express";
import { systemConfig } from "../../config/system";

import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";

const adminRoutes = (app: Express) => {
    const prefixAdmin = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoute);

    app.use(`/${prefixAdmin}/topics`, topicRoute);

    app.use(`/${prefixAdmin}/songs`, songRoute);

};

export default adminRoutes; 