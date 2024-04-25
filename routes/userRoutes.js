import express from "express";
import { addUserController, getAllUserController } from "../controller/userController.js";
const router = express.Router();

router.post("/add-user",  addUserController);
router.get("/get-all-user",  getAllUserController);

export default router;