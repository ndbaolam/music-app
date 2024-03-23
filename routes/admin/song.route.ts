import { Router } from "express";
import multer from "multer";

const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.get('/create', controller.create);

router.post(
    '/create', 
    upload.fields(
        [
            { name: 'avatar', maxCount: 1 }, 
            { name: 'audio', maxCount: 1 }
        ]
    ),
    uploadCloud.uploadFields,
    controller.createPost
);

export const songRoute: Router = router;