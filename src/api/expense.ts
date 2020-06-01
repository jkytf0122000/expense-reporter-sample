import { Request, Response, NextFunction } from "express";
import Express from "express";
import { Expense } from "../models/expense";
const router = Express.Router();

// POST 経費の入力
router.post("/", (req: Request, res: Response, next: NextFunction) => {
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
