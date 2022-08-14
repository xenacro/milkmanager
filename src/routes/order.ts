import { Router } from "express";
import { getOrder, createOrder, updateOrder, updateOrderStatus, deleteOrder, checkCapacity } from "../controllers/order";

const router: Router = Router();

router.post("/add", createOrder);
router.put("/update/:id", updateOrder);
router.patch("/updateStatus/:id", updateOrderStatus);
router.delete("/delete/:id", deleteOrder);
router.get("/checkCapacity/:date", checkCapacity);
router.get("/:id", getOrder);


export default router;