import { Router } from "express";
import {
  getPersonals,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal,
} from "../Controllers/PersonalController";

const router = Router();

router.get("/personal", getPersonals);
router.get("/personal/:id", getPersonalById);
router.post("/personal", createPersonal);
router.put("/personal/:id", updatePersonal);
router.delete("/personal/:id", deletePersonal);

export default router;
