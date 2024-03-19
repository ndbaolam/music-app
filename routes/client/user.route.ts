import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";

const router: Router = Router();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

export const userRoutes: Router = router;