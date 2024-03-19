import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";
import { requireAuth as requireLogin} from "../../middlewares/auth.middleware";

const router: Router = Router();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get(
    "/profile",
    requireLogin,
    controller.profile
);

export const userRoutes: Router = router;