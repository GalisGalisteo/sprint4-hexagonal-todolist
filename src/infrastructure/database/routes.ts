import express from "express";
import { 
    addTask, 
    deleteTask, 
    completeTask, 
    updateTask, 
    findAll, 
    findById 
} from "../../application/controllers/taskController.js";

const router = express.Router();

router.post("/new", addTask);
router.delete("/delete/:_id", deleteTask);
router.post("/complete/:_id", completeTask);
router.post("/update/:_id", updateTask);
router.get("/", findAll);
router.get("/:_id", findById);

export default router;