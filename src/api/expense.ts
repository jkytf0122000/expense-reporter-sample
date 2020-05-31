import Express from "express";
const router = Express.Router();
import { Request, Response, NextFunction } from "express";
import { Expense } from "../models/expense";

// POST 経費の入力
router.post("/", (req: Request, res: Response, next: NextFunction): void => {
  Expense.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ id: 20002, message: err });
    });
});

export default router;
