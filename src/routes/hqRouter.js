import { Router } from "express";
const router = Router();
import authenticateToken from "../middleware/authenticateToken.js";
import {
    getCountForPeriodsController
} from "../controllers/hqController.js";

router.use(authenticateToken);


router.get("/:dateRange", getCountForPeriodsController)

export default router;