import { Router } from "express";
import {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../Controllers/SubscriptionController";

const router = Router();

router.get("/subscription", getSubscriptions);
router.get("/subscription/:id", getSubscriptionById);
router.post("/subscription", createSubscription);
router.put("/subscription/:id", updateSubscription);
router.delete("/subscription/:id", deleteSubscription);

export default router;
