import { validateBody } from "../middlewares/validateBody";
import { SubscribeDto } from "../dto/subscribe.dto";
import {
  cancelSubscription,
  confirmSubscription,
  createSubscription,
} from "../controllers/subscription";

import { Router } from "express";

const router = Router();

router.post("/subscribe", validateBody(SubscribeDto), createSubscription);
router.get("/confirm/:token", confirmSubscription);
router.get("/unsubscribe/:token", cancelSubscription);

export default router;
