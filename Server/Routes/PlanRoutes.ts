import { Router } from "express";
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../Controllers/PlanController";

const router = Router();

router.get("/plan", getPlans);
router.get("/plan/:id", getPlanById);
router.post("/plan", createPlan);
router.put("/plan/:id", updatePlan);
router.delete("/plan/:id", deletePlan);

export default router;
