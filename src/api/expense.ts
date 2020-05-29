import Express from "express";
const router = Express.Router();
import { Expense } from "../models/expense";

// POST 経費の入力
router.post(
  "/",
  (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void => {
    Expense.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  }
);

export default router;
