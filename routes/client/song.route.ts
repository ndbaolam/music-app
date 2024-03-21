import { Router } from "express";

import * as controller from "../../controllers/client/song.controller";

const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get('/detail/:slugSong', controller.detail);

router.patch('/like/:type/:idSong', controller.like);

router.patch("/favorite/:type/:idSong", controller.favorite);

export const songRoutes: Router = router;