import { Express } from "express";
import { systemConfig } from "../../config/system";

import { dashboardRoute } from "./dashboard.route";

const adminRoutes = (app: Express) => {
    const prefixAdmin = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoute);

};

export default adminRoutes; 