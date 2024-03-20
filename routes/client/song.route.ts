import { Router } from "express";

import * as controller from "../../controllers/client/song.controller";

import { requireAuth as requireLogin} from "../../middlewares/auth.middleware";

const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get('/detail/:slugSong', controller.detail);

router.patch('/like/:type/:idSong', controller.like);

export const songRoutes: Router = router;