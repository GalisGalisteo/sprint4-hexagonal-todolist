import express from "express";
import { 
    addTask, 
    deleteTask, 
    completeTask, 
    findAll, 
    findById 
} from "../application/controllers/taskController.js";
import {  basicAuth } from "./auth.js";

const router = express.Router();

// router.use(addAuthHeader);
router.use(basicAuth);

router.post("/new", addTask);
router.delete("/delete/:_id", deleteTask);
router.put("/complete/:_id", completeTask);
router.get("/", findAll);
router.get("/:_id", findById);

export default router;