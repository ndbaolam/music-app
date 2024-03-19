import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";

const router: Router = Router();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

export const userRoutes: Router = router;