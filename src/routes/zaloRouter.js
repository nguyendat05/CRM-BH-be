import { Router } from "express";
const router = Router();
import authenticateToken from "../middleware/authenticateToken.js";
import {
    getsZaloDataController
} from "../controllers/zaloController.js";

router.use(authenticateToken);


router.get("/", getsZaloDataController)

export default router;