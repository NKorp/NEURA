import { Router } from "express";
import {
  getLaunches,
  saveLaunch,
  getSavedLaunches,
  deleteLaunch,
} from "../controllers/launchController";

const router: Router = Router();

router.get("/launches/latest", getLaunches);
router.get("/launches/saved", getSavedLaunches);
router.post("/launches/save", saveLaunch);
router.delete("/launches/remove/:id", deleteLaunch);

export default router;
