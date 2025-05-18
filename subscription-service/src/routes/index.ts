import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { SubscribeDto } from "../dto/subscribe.dto";
import { createSubscription } from "../controllers/subscription";

const router = Router();

router.post("/subscribe", validateBody(SubscribeDto), createSubscription);

export default router;
