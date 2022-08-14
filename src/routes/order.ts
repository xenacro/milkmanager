import { Router } from "express";
import {
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  checkCapacity,
} from "../controllers/order";

const router: Router = Router();

/**
 * @openapi
 * /add:
 *   post:
 *     tags:
 *         - Orders
 *     description: Create a new order if milk is available for the day
 *     parameters:
 *      - in: body
 *        name: name
 *        description: Name of the customer
 *        required: true
 *      - in: body
 *        name: email
 *        description: Email of the customer
 *        required: true
 *      - in: body
 *        name: date
 *        description: Date of the order
 *        required: true
 *      - in: body
 *        name: amount
 *        description: Amount of milk to be ordered
 *        required: true
 *        type: float
 *     responses:
 *       200:
 *          description: Order Created Successfully
 *       400:
 *         description: Not Enough Milk
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.post("/add", createOrder);

/**
 * @openapi
 * /update/:id:
 *   put:
 *     tags:
 *         - Update an Order
 *     description: Update an order by id.
 *     parameters:
 *      - in: body
 *        name: name
 *        description: Name of the customer
 *        required: true
 *      - in: body
 *        name: email
 *        description: Email of the customer
 *        required: true
 *      - in: body
 *        name: date
 *        description: Date of the order
 *        required: true
 *      - in: body
 *        name: amount
 *        description: Amount of milk to be ordered
 *        required: true
 *        type: float
 *     responses:
 *       200:
 *         description: Order Updated Successfully
 *       400:
 *         description: Not Enough Milk
 *       404:
 *        description: Order Not Found
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.put("/update/:id", updateOrder);

/**
 * @openapi
 * /updateStatus/:id:
 *   patch:
 *     tags:
 *         - Update Status of an Order
 *     description: Update status of an order by id.
 *     parameters:
 *      - in: body
 *        name: status
 *        description: Name of the customer
 *        required: true
 *        type: enum
 *        example: ["placed", "packed", "dispatched", "delivered"]
 *     responses:
 *       200:
 *         description: Status of the Order Updated Successfully
 *       404:
 *        description: Order Not Found
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.patch("/updateStatus/:id", updateOrderStatus);

/**
 * @openapi
 * /delete/:id:
 *   delete:
 *     tags:
 *         - Delete an Order
 *     description: Delete an order by id.
 *     responses:
 *       200:
 *         description: Order Deleted Successfully
 *       404:
 *        description: Order Not Found
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.delete("/delete/:id", deleteOrder);

/**
 * @openapi
 * /checkCapacity/:date:
 *   get:
 *     tags:
 *         - Check Capacity of a date
 *     description: Get how much milk is available on a particular date. Maximum capacity is set to be 500.
 *     responses:
 *       200:
 *         description: Capacity is avaiable
 *       404:
 *        description: Capacity for the date is not available
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.get("/checkCapacity/:date", checkCapacity);

/**
 * @openapi
 * /:id:
 *   get:
 *     tags:
 *         - Get Order Details
 *     description: Get order Details by id.
 *     responses:
 *       200:
 *         description: order Found Sucessfully
 *       404:
 *        description: Order Not Found
 *       500:
 *         description: Internal Server Error(Check Response) or BAD Request
 */
router.get("/:id", getOrder);

export default router;
